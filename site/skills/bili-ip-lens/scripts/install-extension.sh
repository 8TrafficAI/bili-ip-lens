#!/usr/bin/env bash
# Prepare a verified release; browser installation stays in the browser UI.
set -euo pipefail
command -v python3 >/dev/null 2>&1 || { printf '%s\n' 'Error: Python 3.8+ is required.' >&2; exit 1; }
command -v curl >/dev/null 2>&1 || { printf '%s\n' 'Error: curl is required.' >&2; exit 1; }
exec python3 - "$@" <<'PY'
import argparse
from contextlib import contextmanager
import fcntl
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import subprocess
import sys
import tempfile
from urllib.parse import quote
import uuid
import zipfile

REPOSITORY = '8TrafficAI/bili-ip-lens'
API = 'https://api.github.com/repos/' + REPOSITORY + '/releases/latest'
MARKER = '.bili-ip-lens-managed.json'
MAX_ARCHIVE = 8 * 1024 * 1024
MAX_EXPANDED = 32 * 1024 * 1024
DOMAINS = {'https://www.bilibili.com/*', 'https://t.bilibili.com/*', 'https://space.bilibili.com/*'}


def fail(message):
    raise ValueError(message)


def download(url, destination, limit):
    # -q is first: ignore curlrc, including any user authentication defaults.
    # No auth headers, token environment lookup, netrc, or remote shell execution.
    command = [
        'curl', '-q', '--fail', '--silent', '--show-error', '--location',
        '--proto', '=https', '--proto-redir', '=https', '--tlsv1.2',
        '--connect-timeout', '15', '--max-time', '90', '--retry', '2',
        '--max-filesize', str(limit),
        '-H', 'Accept: application/vnd.github+json',
        '-H', 'User-Agent: bili-ip-lens-installer',
        '--output', str(destination), url,
    ]
    subprocess.run(command, check=True)
    if destination.stat().st_size > limit:
        fail('Downloaded file exceeds its size limit.')


def release_asset(release, name, tag):
    matches = [asset for asset in release.get('assets', []) if asset.get('name') == name]
    if len(matches) != 1:
        fail('Release must contain exactly one asset named ' + name)
    url = matches[0].get('browser_download_url')
    expected = 'https://github.com/' + REPOSITORY + '/releases/download/' + quote(tag, safe='') + '/' + quote(name, safe='')
    if url != expected:
        fail('Unexpected release asset origin or path: ' + name)
    return url


def expected_digest(checksums, filename):
    matches = []
    for line in checksums.read_text(encoding='utf-8').splitlines():
        match = re.fullmatch(r'([a-fA-F0-9]{64})\s+\*?(.+)', line.strip())
        if match and match.group(2) == filename:
            matches.append(match.group(1).lower())
    if len(matches) != 1:
        fail('Checksum file must contain exactly one SHA-256 for ' + filename)
    return matches[0]


def safe_entries(archive):
    entries = archive.infolist()
    if not entries or len(entries) > 250:
        fail('Archive has no entries or too many entries.')
    names = set()
    expanded = 0
    for info in entries:
        name = info.filename
        path = PurePosixPath(name)
        if (not name or '\\' in name or '\x00' in name or path.is_absolute()
                or any(part in ('', '.', '..') or ':' in part for part in name.rstrip('/').split('/'))):
            fail('Unsafe archive path.')
        normalized = str(path).rstrip('/')
        if normalized in names:
            fail('Archive contains duplicate paths.')
        names.add(normalized)
        kind = stat.S_IFMT(info.external_attr >> 16)
        if kind not in (0, stat.S_IFREG, stat.S_IFDIR):
            fail('Archive links and special files are not allowed.')
        if info.flag_bits & 1:
            fail('Encrypted archive entries are not allowed.')
        expanded += info.file_size
        if info.file_size > 8 * 1024 * 1024 or expanded > MAX_EXPANDED:
            fail('Archive exceeds expanded size limits.')
    if 'manifest.json' not in names:
        fail('Release ZIP must contain manifest.json at its root.')
    return entries


def extract_verified(archive_path, stage, version):
    with zipfile.ZipFile(archive_path) as archive:
        entries = safe_entries(archive)
        for info in entries:
            destination = stage.joinpath(*PurePosixPath(info.filename).parts)
            if info.is_dir():
                destination.mkdir(parents=True, exist_ok=True)
                continue
            destination.parent.mkdir(parents=True, exist_ok=True)
            with archive.open(info) as source, destination.open('xb') as output:
                shutil.copyfileobj(source, output)
    validate_manifest(stage, version)


def validate_manifest(stage, version):
    manifest = json.loads((stage / 'manifest.json').read_text(encoding='utf-8'))
    if manifest.get('manifest_version') != 3 or not str(manifest.get('name', '')).startswith('Bili IP Lens'):
        fail('Archive is not the expected Bili IP Lens MV3 extension.')
    if manifest.get('version') != version:
        fail('Manifest version does not match the release tag.')
    if (set(manifest.get('permissions', [])) != {'storage'} or manifest.get('optional_permissions')
            or manifest.get('host_permissions') or manifest.get('optional_host_permissions')):
        fail('Release requests a wider permission scope; review it manually.')
    scripts = manifest.get('content_scripts', [])
    matches = {pattern for script in scripts for pattern in script.get('matches', [])}
    if matches != DOMAINS:
        fail('Unexpected content-script domain scope; review the release manually.')
    resources = [name for script in scripts for name in script.get('js', []) + script.get('css', [])]
    background = manifest.get('background', {})
    resources.extend(background.get('scripts', []))
    if background.get('service_worker'):
        resources.append(background['service_worker'])
    resources.extend(manifest.get('icons', {}).values())
    action = manifest.get('action', {})
    if action.get('default_popup'):
        resources.append(action['default_popup'])
    icons = action.get('default_icon', {})
    resources.extend([icons] if isinstance(icons, str) else icons.values())
    for name in resources:
        if not isinstance(name, str) or '\\' in name or ':' in name:
            fail('Manifest contains an unsafe resource reference.')
        path = PurePosixPath(name)
        if path.is_absolute() or '..' in path.parts or not stage.joinpath(*path.parts).is_file():
            fail('Manifest references a missing or unsafe extension resource.')


def directory_inventory(directory):
    files = {}
    directories = []
    expanded = 0
    entries = 0
    for path in directory.rglob('*'):
        relative = path.relative_to(directory).as_posix()
        if relative == MARKER:
            continue
        entries += 1
        if entries > 250 or path.is_symlink():
            fail('Managed directory contains too many entries or an unexpected symbolic link.')
        if path.is_dir():
            directories.append(relative)
        elif path.is_file():
            size = path.stat().st_size
            expanded += size
            if size > 8 * 1024 * 1024 or expanded > MAX_EXPANDED:
                fail('Managed directory exceeds its expected size limits.')
            digest = hashlib.sha256()
            with path.open('rb') as source:
                for chunk in iter(lambda: source.read(1024 * 1024), b''):
                    digest.update(chunk)
            files[relative] = digest.hexdigest()
        else:
            fail('Managed directory contains an unexpected special file.')
    return {'files': files, 'directories': sorted(directories)}


def assert_owned_extension(target):
    if target.is_symlink() or not target.is_dir():
        fail('Existing extension path is not a regular managed directory; leaving it unchanged.')
    marker = target / MARKER
    if marker.is_symlink() or not marker.is_file():
        fail('Existing extension directory has no installer ownership marker; leaving it unchanged.')
    try:
        record = json.loads(marker.read_text(encoding='utf-8'))
    except (ValueError, OSError):
        fail('Existing installer ownership marker is unreadable; leaving it unchanged.')
    if not isinstance(record, dict) or record.get('repository') != REPOSITORY or record.get('schema') != 1:
        fail('Existing directory belongs to another installation; leaving it unchanged.')
    if hasattr(os, 'getuid') and target.stat().st_uid != os.getuid():
        fail('Existing installation is not owned by the current user.')
    version = record.get('version')
    if (not isinstance(version, str) or not re.fullmatch(r'\d+\.\d+\.\d+', version)
            or record.get('release') not in (version, 'v' + version)
            or not re.fullmatch(r'[0-9a-f]{64}', str(record.get('sha256', '')))):
        fail('Existing installer marker has invalid version or digest metadata; leaving it unchanged.')
    if not isinstance(record.get('files'), dict) or not isinstance(record.get('directories'), list):
        fail('Existing installer marker has no file inventory; leaving it unchanged.')
    validate_manifest(target, version)
    current = directory_inventory(target)
    if current['files'] != record['files'] or current['directories'] != record['directories']:
        fail('Existing extension directory was changed or contains unrelated files; leaving it unchanged.')


def inspect_root(root):
    if root.is_symlink():
        fail('Installation root must not be a symbolic link.')
    if root.exists():
        info = root.stat()
        if not stat.S_ISDIR(info.st_mode) or (hasattr(os, 'getuid') and info.st_uid != os.getuid()):
            fail('Installation root must be a directory owned by the current user.')
        if info.st_mode & 0o022:
            fail('Installation root must not be writable by another group or user.')


@contextmanager
def installation_lock(root):
    flags = os.O_CREAT | os.O_RDWR | os.O_NOFOLLOW | os.O_NONBLOCK
    descriptor = os.open(str(root / '.bili-ip-lens-install.lock'), flags, 0o600)
    try:
        info = os.fstat(descriptor)
        if (not stat.S_ISREG(info.st_mode) or info.st_nlink != 1 or info.st_size != 0
                or info.st_mode & 0o022
                or (hasattr(os, 'getuid') and info.st_uid != os.getuid())):
            fail('Installer lock must be an empty regular file owned by the current user.')
        try:
            fcntl.flock(descriptor, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            fail('Another installer is active; retry after it finishes.')
        yield
    finally:
        os.close(descriptor)


def commit_stage(stage, root, record):
    inspect_root(root)
    root.mkdir(parents=True, exist_ok=True, mode=0o700)
    inspect_root(root)
    target = root / 'extension'
    # The lock protects simultaneous installers; it contains no credentials.
    with installation_lock(root):
        if target.exists() or target.is_symlink():
            assert_owned_extension(target)
        stage_path = Path(tempfile.mkdtemp(prefix='.bili-ip-lens-stage-', dir=str(root)))
        backup = root / ('.bili-ip-lens-backup-' + uuid.uuid4().hex)
        moved_old = False
        installed = False
        try:
            shutil.copytree(stage, stage_path, dirs_exist_ok=True)
            (stage_path / MARKER).write_text(json.dumps(record, indent=2) + '\n', encoding='utf-8')
            if target.exists():
                os.replace(str(target), str(backup))
                moved_old = True
            try:
                # Extraction is finished before this same-filesystem atomic rename.
                os.replace(str(stage_path), str(target))
                installed = True
            except BaseException:
                if moved_old:
                    os.replace(str(backup), str(target))
                    moved_old = False
                raise
            if moved_old:
                shutil.rmtree(backup)
                moved_old = False
        finally:
            if stage_path.exists():
                shutil.rmtree(stage_path)
            # Never delete a backup if a rollback failed; preserve it for recovery.
        if not installed:
            fail('The managed extension directory was not replaced.')
    return target


def main():
    if sys.version_info < (3, 8):
        fail('Python 3.8 or later is required.')
    parser = argparse.ArgumentParser(description='Prepare verified Bili IP Lens files; load them through the normal browser UI.')
    parser.add_argument('--install-root', default=str(Path.home() / '.local/share/bili-ip-lens'),
                        help='Dedicated user directory; only its managed extension/ child is replaced.')
    parser.add_argument('--dry-run', action='store_true', help='Download and validate in temporary storage without changing the installation root.')
    args = parser.parse_args()
    root = Path(args.install_root).expanduser().absolute()
    inspect_root(root)
    # Resolve any existing parent aliases once; subsequent operations use this
    # canonical path rather than repeatedly following a mutable parent symlink.
    root = root.resolve(strict=False)
    if root == Path(root.anchor) or root.resolve() == Path.home().resolve():
        fail('Choose a dedicated application directory, not the filesystem root or home directory.')
    with tempfile.TemporaryDirectory(prefix='bili-ip-lens-verify-') as temporary:
        temporary = Path(temporary)
        metadata = temporary / 'release.json'
        download(API, metadata, 2 * 1024 * 1024)
        release = json.loads(metadata.read_text(encoding='utf-8'))
        tag = release.get('tag_name', '')
        if not re.fullmatch(r'v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?', tag) or release.get('draft') or release.get('prerelease'):
            fail('Latest endpoint did not return an expected stable release.')
        version = tag[1:] if tag.startswith('v') else tag
        filename = 'bili-ip-lens-' + version + '.zip'
        archive_path = temporary / filename
        checksums = temporary / 'SHA256SUMS.txt'
        download(release_asset(release, 'SHA256SUMS.txt', tag), checksums, 1024 * 1024)
        download(release_asset(release, filename, tag), archive_path, MAX_ARCHIVE)
        digest = hashlib.sha256(archive_path.read_bytes()).hexdigest()
        if digest != expected_digest(checksums, filename):
            fail('SHA-256 mismatch; installation was not changed.')
        stage = temporary / 'extension'
        stage.mkdir(mode=0o700)
        extract_verified(archive_path, stage, version)
        record = {'schema': 1, 'repository': REPOSITORY, 'release': tag,
                  'version': version, 'sha256': digest, **directory_inventory(stage)}
        target = root / 'extension'
        inspect_root(root)
        if target.exists() or target.is_symlink():
            assert_owned_extension(target)
        if not args.dry_run:
            target = commit_stage(stage, root, record)
        print(json.dumps({
            'status': 'verified_dry_run' if args.dry_run else 'files_ready',
            'repository': REPOSITORY, 'release': tag, 'version': version,
            'sha256': digest, 'install_path': str(target),
            'browser_installation': 'pending',
            'next_step': 'Load this directory through chrome://extensions, then refresh Bilibili and verify the toolbar toggle.',
        }, ensure_ascii=False, indent=2))


try:
    main()
except (ValueError, OSError, json.JSONDecodeError, zipfile.BadZipFile, subprocess.CalledProcessError) as error:
    print('Bili IP Lens preparation failed: ' + str(error), file=sys.stderr)
    sys.exit(1)
PY
