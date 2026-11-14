# Browser verification

Use this after the files are prepared and the extension is actually loaded. The helper never installs into a browser profile.

1. In the extension UI, confirm the installed name/version and pin the toolbar icon. If an approved project store listing was used, record that listing rather than treating the ZIP route as necessary.
2. Refresh an already-open Bilibili video page. Scroll to the modern comment section and use recent comments when an old pinned comment has no region field.
3. Confirm a region-bearing main comment and a nested reply show the supplied region next to the timestamp. Missing region fields must remain blank; do not infer a region from an author's name or content.
4. Open the **actual toolbar popup**. A full-page preview of popup.html does not establish popup sizing. Check horizontal labels, the complete switch/footer, and no unnecessary long scrollbar.
5. Turn OFF: this extension's labels should disappear without refreshing. Turn ON: they should return. Close and reopen the popup to check persistence. Leave the user's chosen final preference in place.
6. Record browser/version, extension version, tested page types, observed result, and any remaining manual step. A few comments are a local sample, not user count or a universal compatibility benchmark.

The MV3 toolbar popup is different from a Tampermonkey script-manager menu. Do not install both distributions just to satisfy an extension request. A real userscript-manager installation/injection test is separate from Node VM tests.

## Failure routing

- **No labels:** first check the saved switch, page refresh after installation, modern component, and available region data. A missing field is not an installation failure.
- **Unsupported browser or page:** report the actual compatibility boundary. Historical Vue components and live-chat region lookup are unsupported.
- **Browser confirmation/login:** use the normal browser flow and let the user complete a required browser-owned security confirmation. Do not change profile files or bypass the prompt.
- **Checksum, archive, wider permissions or unowned folder:** keep the previous installation unchanged. Explain the helper error; do not use an unverified fallback.

## Installation-helper validation

Tests for this helper should use a temporary installation root, verify the live public release and checksum, then exercise repeat replacement and refusal of an unmarked existing extension directory. A dry run must leave the chosen installation root absent or unchanged. Include hostile archive fixtures for traversal and symlink entries before releasing a changed extractor.

The helper is for macOS/Linux, not Windows. The default file location is `~/.local/share/bili-ip-lens/extension`. An `extension/` directory is managed only when its manifest, marker identity/version/digest and exact file-hash/directory inventory match. Unknown or modified files inside it stop an update; files beside that child directory are preserved. Staged files are renamed into place after verification; a failed replacement attempts to restore the previous managed directory and preserves any backup if rollback fails.

## Recorded helper checks · 2026-11-15

- Official Skills documentation and the current CLI help confirmed the owner/repository install syntax and `--skill` selector. `npx skills add . --list` discovered this local skill without installing it to an agent.
- Skill Creator's `quick_validate.py` and `bash -n` passed.
- A real public release check used v0.1.1 and SHA-256 `175e2b2455a4b02c6a2329b7ab3291225c01ca27dc7c99840843b0ec7b16342f` for the ZIP. Temporary-root checks covered dry run, preparation, repeat replacement, sibling-file preservation, and refusal of an unmarked target.
- Temporary release fixtures exercised checksum mismatch, traversal/absolute/parent paths, symbolic-link ZIP entries, required/optional permission drift, mismatched versions, missing resources, unsafe destination roots, forged/partial ownership markers, changed or extra files, and unsafe lock types.
- Independent review retested the revised ownership/permission checks and confirmed ordinary locking, FIFO refusal without blocking, hard-link/symbolic-link refusal, and writable-root refusal.
- These are **file-preparation tests**, not proof that a browser accepted or loaded the extension. No browser profile, Preferences file, cookies, or real browser installation directory was changed by these helper tests.
