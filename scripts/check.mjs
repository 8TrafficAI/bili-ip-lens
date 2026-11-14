import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const extension = resolve(root, 'extension');
const manifest = JSON.parse(await readFile(resolve(extension, 'manifest.json'), 'utf8'));
assert.equal(manifest.manifest_version, 3);
assert.deepEqual(manifest.permissions, ['storage']);
assert.equal(manifest.host_permissions, undefined);
const paths = [manifest.action.default_popup, manifest.background.service_worker,
  ...Object.values(manifest.icons), ...manifest.content_scripts.flatMap(c => c.js)];
for (const path of paths) await access(resolve(extension, path));
for (const path of await readdir(extension)) {
  if (path.endsWith('.js')) execFileSync(process.execPath, ['--check', resolve(extension, path)]);
}
console.log('Manifest, packaged resources, minimal permissions, and JavaScript syntax passed.');
