---
name: bili-ip-lens
description: Install or update Bili IP Lens from its verified public release, load it through the browser's normal extension interface, and verify Bilibili comment IP-region labels and the saved toggle. Use for Bili IP Lens installation requests, not general IP lookup or live-chat location.
---

# Bili IP Lens

Help the user install the chosen Bili IP Lens distribution and verify it. A useful invocation is: **「安装 Bili IP Lens 并验证 IP 属地开关」**.

## Product facts

- Repository: <https://github.com/8TrafficAI/bili-ip-lens>.
- Install guide: <https://8trafficai.github.io/bili-ip-lens/install/>.
- It displays a region string Bilibili already supplies with a modern comment. It does not discover full IP addresses, infer missing regions, or show real-time live-chat regions.
- The MV3 extension has a toolbar popup and a locally saved ON/OFF switch. Its runtime only declares `storage`; content scripts match `www.bilibili.com`, `t.bilibili.com`, and `space.bilibili.com`.
- The separate Tampermonkey version toggles through the script manager's menu, not its own Chrome popup. Preserve an explicit userscript choice; use [the userscript guide](https://github.com/8TrafficAI/bili-ip-lens/tree/main/userscript) instead of the extension helper.
- Modern integration is adapted from [MaxChang3/BiliReveal](https://github.com/maxchang3/BiliReveal), with its MIT notice retained. This is an independent project, not a Bilibili product.

## Install the skill

The current official [Skills CLI](https://skills.sh/docs/cli) supports GitHub owner/repository sources:

```sh
npx skills add 8TrafficAI/bili-ip-lens --skill bili-ip-lens
```

This installs agent instructions, not a browser extension. The CLI selects the target agent and defaults to project scope; `-g` is optional for user-wide skill availability. The current upstream CLI requires Node.js 22.20+ and has its own telemetry policy; it is separate from Bili IP Lens's no-telemetry runtime. See [upstream CLI documentation](https://github.com/vercel-labs/skills).

## Choose the installation route

Read the current project installation page or README. If it links a **published project Chrome Web Store listing**, verify the listing's publisher/support repository and prefer its normal browser installation flow. Do not treat a pending submission, an unrelated search result, or a store URL without a published listing as approval. At this skill's creation, no approved store listing was available; the public GitHub release is the available extension route.

Installing this skill or preparing its files is not permission to bypass browser controls. Continue within the user's requested installation scope. Do not inspect cookies, scan browser profiles, edit Chrome Preferences, enable unsafe debugging, or modify unrelated extensions.

## Prepare the extension files

For an authorized GitHub installation, run this skill's bundled helper from its installed directory:

```sh
bash scripts/install-extension.sh
```

Resolve `scripts/` relative to this `SKILL.md`, not the user's project directory. The helper supports **macOS and Linux** with `curl` and Python 3.8+ (POSIX file locking and no-follow file opens). On Windows, use the normal ZIP/manual browser route instead. The helper:

1. Reads the latest public release from the fixed `8TrafficAI/bili-ip-lens` GitHub API URL, without authentication or token lookup.
2. Downloads the version-matched ZIP and `SHA256SUMS.txt`, checks the SHA-256, and validates archive paths, file types, size limits, manifest identity, version and permission scope.
3. Stages extraction and replaces only its own managed `extension/` directory under `~/.local/share/bili-ip-lens/`. It checks the existing manifest, marker version/digest, and exact file-hash/directory inventory. An unmarked, modified, or extended directory is left untouched.
4. Prints JSON with the release, verified digest, and `install_path`. `browser_installation` remains `pending`.

Optional commands:

```sh
bash scripts/install-extension.sh --dry-run
bash scripts/install-extension.sh --install-root /chosen/user-directory/bili-ip-lens
```

`--dry-run` downloads and validates in a temporary directory but does not create or change the installation root. The SHA check establishes consistency with the release's published checksum file; it is not a separate publisher signature. The helper never runs downloaded code or remote shell scripts.

On an API, checksum, archive, identity, permission or filesystem error, stop that installation path and report the specific failure. Do not silently use an unverified ZIP, fetch a credential, or erase an unfamiliar directory. The helper preserves sibling files in its installation root and refuses updates if its extension directory contains unrelated or modified entries. It rejects a group/world-writable root and unsafe lock files, and rolls back a failed managed-directory swap.

## Load through the browser and verify

Use the user's specified browser and its available browser/computer-use tools. In Chrome / Chromium, open `chrome://extensions`, enable Developer mode when using the unpacked GitHub route, choose **Load unpacked**, and select the exact `install_path` printed by the helper. Use the ordinary directory chooser. Keep the files in place after loading.

If a browser-owned security confirmation needs the user, leave that step to the user and resume after completion. No command can honestly promise a fully unattended installation across browsers. Do not report `files_ready` as `browser_installed`.

For existing installations, use the browser's extension UI to check the installed version and update/reload it as appropriate; do not search profile directories. Refresh already open Bilibili pages after installing or reloading.

Then follow [references/verification.md](references/verification.md). Verify a region-bearing modern video comment, the actual toolbar popup, immediate OFF/ON, and persistence after reopening. If the page supplies no region data, try a recent comment rather than inventing a location. Dynamic/profile scenarios, historical Vue interfaces, and actual userscript-manager acceptance must not be inferred from the extension's video test.

Report the actual installed version/browser, file path, checks performed, and any remaining manual confirmation. Distinguish **skill installed**, **files prepared**, **extension loaded**, and **behavior verified**.
