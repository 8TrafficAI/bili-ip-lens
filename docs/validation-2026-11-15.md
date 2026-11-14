# Local validation · 2026-11-15

Version: 0.1.0. Installed as an unpacked extension in ego-browser (Chromium).
The original SC-producing B站助手 extension remains disabled.

## Observed in the real browser

Test page: https://www.bilibili.com/video/BV1xx411c7mD/

- Latest comments: 17 comments carrying a region field showed 17 matching labels.
- Popup OFF: labels changed from 17 to 0 without refreshing the page.
- Reopening the popup preserved OFF.
- Popup ON: all 17 labels returned without refreshing the page.
- Sorting between hot and latest comments continued to work.
- Expanding a reply thread and loading more comments reached 35 renderers with
  region data; all 35 displayed labels, including nested replies.
- Refreshing the video page with ON saved restored comment labels.
- The actual pinned toolbar popup opened and its switch changed state.
- Final installed extension: enabled, zero manifest errors and zero runtime errors.
- Final saved preference: ON.

The popup was simplified after testing to remove active-tab counting: ego's task
space pages do not always correspond to the active ordinary Chromium tab.
Its final interface depends only on the saved global preference.

Screenshots are kept locally in the ignored `.private/` directory and are not
included in the installation ZIP or a future public repository.

## Automated checks

`npm run check` passed (manifest, minimum permissions, packaged files, JS syntax).
`npm test` passed: six tests cover component registration and data reuse, instant
toggles, missing and native data, safe text insertion, frozen prototypes, detached
components, and preference initialization races.
`npm run package` produced an installable ZIP with manifest at its root.

## Remaining acceptance

Normal user trial, other browser profiles, and manual testing of dynamic / space
comment pages remain open. Those pages share the targeted component, but that
does not substitute for testing them. Historical Vue comment UIs and live chat
regions are outside v0.1.0's supported scope.

This section records the local validation phase before public distribution.
Current launch destinations and marketplace states are recorded in
[the launch log](gtm-launch.md).

## Popup sizing correction · v0.1.1

User testing exposed a narrow action popup that the full-tab preview did not
reproduce. `max-width: 100vw` constrained the body to Chromium's initial popup
viewport. Both `html` and `body` now declare a 352px width and minimum width;
the viewport-dependent cap and narrow-screen override have been removed.

Verified by reloading the installed extension and opening its actual toolbar
popup: horizontal title and setting labels, intact switch, complete footer,
and no long scrollbar. OFF persisted across closing and reopening the popup;
the final state was restored to ON. Version 0.1.1 is installed in ego-browser.


## Real Tampermonkey validation · 2026-11-15

Environment: ego-browser (Chromium), Tampermonkey **5.5.1**, released userscript
**0.1.1**, video `https://www.bilibili.com/video/BV1xx411c7mD/`, latest comments.
The published script was saved through the manager's normal **New Userscript**
editor. This was a separate userscript test, not a repeat of the MV3 test above.

The MV3 Bili IP Lens extension was OFF during the test, and the manager's original
global Disabled state was temporarily switched to Enabled. The browser extension
detail's **Allow User Scripts** permission was already true and was not changed.
After refreshing the video and selecting latest comments:

- All **18** comments carrying a region field had **18** matching userscript
  labels; their text matched the supplied regions. MV3 extension-label count was **0**.
- The actual toolbar script-manager menu's OFF action changed userscript labels
  from **18 to 0** without refreshing. Reopening the menu still showed OFF.
- The menu's ON action restored **18 / 18** matching labels without refreshing.
  Reopening the menu showed ON.
- Initial older hot comments without a region field were left unchanged. That
  initial empty-label observation was not classified as an injection failure.

After validation, the operator restored the original browser setup: Tampermonkey
global state Disabled, its browser extension OFF, and the MV3 Bili IP Lens
extension ON (version 0.1.1 confirmed). The Allow User Scripts permission stayed
true, and other userscripts were not changed.

The operator retained a sanitized local record in the ignored
`.private/tampermonkey-real-validation.json`; no account or browser-session data
is part of this public record. The sample demonstrates this manager version's
normal installation, comment injection, immediate menu toggle and saved state in
one video scenario. It does not establish all-manager compatibility, cross-tab
synchronization, dynamic/profile-page acceptance, full-IP lookup or live-chat
region support. The 18 comments are a local sample, not users or a success-rate
benchmark.

Installation troubleshooting: the manager must be globally **Enabled**, the script
itself must be enabled, and the browser's normal **Allow User Scripts** permission
must permit execution. Refresh already-open Bilibili pages after first installing
the script. Do not infer missing-region data from a blank label alone.
