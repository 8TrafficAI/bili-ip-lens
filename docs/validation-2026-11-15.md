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

No public repository, Chrome Web Store listing, or marketing posts were created.
