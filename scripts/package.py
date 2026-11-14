"""Create an installable ZIP using only the distributable extension directory."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

root = Path(__file__).resolve().parent.parent
source = root / 'extension'
version = json.loads((source / 'manifest.json').read_text())['version']
output = root / 'dist' / f'bili-ip-lens-{version}.zip'
output.parent.mkdir(exist_ok=True)
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(source.rglob('*')):
        if path.is_file() and not any(part.startswith('.') for part in path.relative_to(source).parts):
            archive.write(path, path.relative_to(source))
    archive.write(root / 'LICENSE', 'LICENSE')
    archive.write(root / 'PRIVACY.md', 'PRIVACY.md')
print(output)
