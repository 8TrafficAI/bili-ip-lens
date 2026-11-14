# Bili IP Lens

A small Manifest V3 extension that displays **the IP region Bilibili already provides** next to a comment's timestamp. A toolbar switch shows or hides the added labels immediately.

[Download extension v0.1.1](https://github.com/8TrafficAI/bili-ip-lens/releases/download/v0.1.1/bili-ip-lens-0.1.1.zip) · [Userscript](https://raw.githubusercontent.com/8TrafficAI/bili-ip-lens/main/userscript/bili-ip-lens.user.js) · [Product page](https://8trafficai.github.io/bili-ip-lens/) · [简体中文](README.md) · [Report a problem](https://github.com/8TrafficAI/bili-ip-lens/issues/new/choose)

Free and MIT licensed. Distributed through GitHub; **not currently listed in the Chrome Web Store**.

## Install

### Release ZIP

1. Download [bili-ip-lens-0.1.1.zip](https://github.com/8TrafficAI/bili-ip-lens/releases/download/v0.1.1/bili-ip-lens-0.1.1.zip) and fully extract it to a permanent folder.
2. Open `chrome://extensions` and enable Developer mode.
3. Select **Load unpacked**, then select the extracted folder **that directly contains `manifest.json`**.
4. Pin Bili IP Lens to the toolbar and refresh any Bilibili pages that were already open.
5. Open a video comment section, open the extension popup, and use the switch.

The release ZIP is flat: its root is the extension directory. If installing from a source checkout instead, select the repository's **`extension/` directory**.

After an update, reload the extension in the extension manager and refresh existing Bilibili pages. Normal popup toggles do not require a page refresh. The preference stays in the current browser's local storage.

### Tampermonkey userscript

If you already use Tampermonkey, open the [repository userscript](https://raw.githubusercontent.com/8TrafficAI/bili-ip-lens/main/userscript/bili-ip-lens.user.js) to install it through the script manager. Toggle it from the Bili IP Lens entry in the script manager's menu; the userscript has no separate Chrome toolbar popup. Use either the extension or the userscript to keep one source of settings.

The userscript has Node VM behavior tests. Actual Tampermonkey installation, injection, and manager compatibility still require manual acceptance. See the [userscript guide](userscript/README.md).

Greasy Fork and Chrome Web Store links will be added after actual publication. A GitHub download does not imply review or approval by either marketplace.

## Features and scope

- Adds the existing region string beside modern Bilibili comments and nested replies.
- Provides an instant popup toggle and an ON / OFF toolbar badge.
- Updates with comment rendering and avoids duplicating native region labels.
- Does not add Super Chat cards or other live-stream overlays.
- Does not query IP addresses or infer missing regions.

Video comments, nested replies, sorting, popup toggles, persistence, page refreshes, and the actual toolbar popup have been tested in ego-browser. Dynamic and profile pages using the same modern Lit component are integration targets; they have not completed separate manual acceptance tests.

The extension matches `www.bilibili.com`, `t.bilibili.com`, and `space.bilibili.com`. It targets Chrome / Chromium 111+. Browser acceptance so far was performed in ego-browser; compatibility reports from other browsers are welcome.

**Not supported:** live-chat IP regions, historical Vue comment UIs, or comments whose data contains no region. Bilibili may change its data or component implementation. See the [validation record](docs/validation-2026-11-15.md).

## Privacy and permissions

The only declared API permission is `storage`, used to save the `enabled` boolean. Content scripts run on the three Bilibili domains above, so the browser may describe the extension as able to read and change data on those sites.

The extension reads the existing `reply_control.location` region string inside the page. It makes no network requests and uses no server, telemetry, remote scripts, or third-party IP lookup. It does not obtain full IP addresses or upload comments or browsing data.

[Privacy policy](PRIVACY.md)

## FAQ

**Can it reveal someone's full IP address or precise location?**
No. It only displays the coarse region string supplied with a Bilibili comment.

**Why do some comments have no region?**
Bilibili may not supply the field, or the page may use an unsupported legacy component. Missing data stays missing. Also refresh pages after first installing the extension.

**Does the switch work without reloading?**
Yes. It immediately removes or restores this extension's labels on loaded comments. Installation and extension updates require refreshing previously open pages.

**Does it support live-stream chat regions?**
No. Live-chat location is outside this version's scope.

## Upstream credit

The modern comment integration is **adapted from [MaxChang3/BiliReveal](https://github.com/maxchang3/BiliReveal)**. Bili IP Lens adds MV3 packaging, the persistent instant toggle, toolbar state, extension-specific labels, native-label detection, and lifecycle handling.

The original copyright and full MIT license are retained in [THIRD_PARTY_NOTICES.md](extension/THIRD_PARTY_NOTICES.md).

## Development

No dependencies to install. Use Node.js 20+ and Python 3:

```sh
npm run check
npm test
npm run package
```

The installation ZIP is written to `dist/`. Local validation material in `.private/` and generated ZIPs are excluded from Git.

[Contributing](CONTRIBUTING.md) · [Changelog](CHANGELOG.md)

Maintained by [8TrafficAI](https://github.com/8TrafficAI), under the [MIT License](LICENSE). This project is not affiliated with Bilibili.
