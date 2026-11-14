# Bili IP Lens — verified claim ledger

Reviewed: 2026-11-15  
Code baseline: `9f779ca` plus the current publication working tree (README, site, userscript, and launch files).  
Final publication commit: to be recorded by the launch operator after committing this working tree.  
Product version: 0.1.1. A later implementation change requires rechecking the affected rows.

Publication-status follow-up: 2026-11-15, reviewed at `f025d76` plus the launch working tree. The original code-review baseline above is retained; current destination and userscript-acceptance rows below supersede their pre-publication states. See [the dated claim check](../docs/claim-check-2026-11-15.md).

This is an evidence ledger, not a promise that every browser, page, script manager, or marketplace has been accepted. Source paths and line numbers refer to the working tree reviewed on the date above. States are **verified**, **unverifiable**, or **contradicted**.

## Functional facts

| Claim allowed in copy | Checkable source | State |
| --- | --- | --- |
| The extension is Manifest V3, version 0.1.1, targeting Chrome 111+ | `extension/manifest.json:2-6` | verified |
| It displays the region string Bilibili already supplies with a comment | `extension/page.js:20-24` | verified |
| It adds the label beside the comment publication time | `extension/page.js:49-69` | verified |
| Missing or non-string region data is left without an added label; no region is inferred | `extension/page.js:20-24`, `extension/page.js:53-59` | verified |
| A native region label suppresses this extension's duplicate label | `extension/page.js:54-59` | verified |
| The popup controls a saved enabled boolean; changes reach loaded comment instances | `extension/popup.js:28-53`, `extension/bridge.js:24-37`, `extension/page.js:123-135` | verified |
| The extension toolbar has an ON / OFF badge | `extension/background.js:3-9` | verified |
| The only declared extension API permission is storage; content scripts match three named Bilibili domains | `extension/manifest.json:7`, `extension/manifest.json:15-26` | verified |
| Runtime data handling remains in-page; the extension implements no IP query, upload, analytics request, or telemetry transport | Full runtime review: `extension/page.js:7-138`, `extension/bridge.js:1-47`, `extension/background.js:1-17`, `extension/popup.js:1-75`; no network primitives or remote scripts in these files | verified |
| The page-to-extension status response carries only enabled/count/supported, not comment or region values | `extension/page.js:27-40`, `extension/bridge.js:42-45` | verified |
| Only the enabled setting is persisted by the extension's runtime code | `extension/popup.js:35-36`, `extension/bridge.js:33-37`, `extension/background.js:4` | verified |
| No Super Chat overlay, full-IP lookup, or precise-location function is implemented | Renderer is limited to the existing location string and a span: `extension/page.js:20-24`, `extension/page.js:49-69`; full runtime review above | verified |
| The implemented integration targets the modern Lit action-buttons renderer, not historical Vue components or live-chat packets | `extension/page.js:9`, `extension/page.js:82-120`; supported boundary recorded in `docs/validation-2026-11-15.md:37-42` | verified |
| Release ZIPs put manifest.json at the archive root; source checkouts use extension/ | `scripts/package.py:7-16`, `extension/manifest.json:1` | verified |

“无使用追踪 / no telemetry” is supported by the reviewed implementation. The volatile, in-page label count is not an outbound analytics stream or a stored usage history. Do not incorrectly downgrade the implementation's no-telemetry claim merely because this local diagnostic count exists.

## Evidence, licensing, and distribution boundaries

| Claim or proposed claim | Checkable source | State |
| --- | --- | --- |
| One local browser session observed 35 region-bearing comment renderers with matching labels, including nested replies | `docs/validation-2026-11-15.md:15-16` | verified |
| 35 is a local sample count, not user count, adoption, a compatibility rate, or a benchmark | `docs/validation-2026-11-15.md:6-19`, `.agents/product-marketing.md:27` | verified |
| Video comments, nested replies, sorting, OFF/ON, refresh, and preference persistence were checked in ego-browser | `docs/validation-2026-11-15.md:10-20` | verified |
| The actual toolbar popup width fix was retested in v0.1.1 | `docs/validation-2026-11-15.md:46-56` | verified |
| Every Chrome/Chromium browser and all dynamic/profile scenarios are manually verified | Current evidence explicitly limits browser/page acceptance: `README.md:48-56`, `docs/validation-2026-11-15.md:39-42` | contradicted |
| The userscript has a script-manager menu toggle, GM storage, and optional value-change handling; it has no independent extension popup | `userscript/settings.js:18-35`, `userscript/settings.js:38-65`, `userscript/README.md:11-18` | verified |
| The userscript source is self-contained, with three domain matches and no remote @require | `userscript/bili-ip-lens.user.js:13-31`, `tests/userscript.test.mjs:180-193` | verified |
| Userscript rendering, menu, persistence, isolation, and initialization behavior have VM test coverage | `tests/userscript.test.mjs:5`, `tests/userscript.test.mjs:81-110`, `tests/userscript.test.mjs:113-193` | verified |
| Released userscript 0.1.1 has passed real Tampermonkey 5.5.1 comment injection and menu-toggle acceptance in ego-browser on one video latest list | `docs/validation-2026-11-15.md:61-99` records 18 matching region-bearing labels, OFF=0, ON=18, reopened-menu state and MV3 isolation | verified |
| Modern comment integration is adapted from MaxChang3/BiliReveal; the original MIT copyright and permission notice are retained | `extension/page.js:1-5`, `extension/THIRD_PARTY_NOTICES.md:5-34`, `userscript/bili-ip-lens.user.js:55-88` | verified |
| Source is released under MIT with upstream notices preserved | `LICENSE:1-21`, `extension/THIRD_PARTY_NOTICES.md:14-34` | verified |
| The userscript is publicly published on Greasy Fork as script 605536 | `README.md:43`; `docs/gtm-launch.md:150` records the public detail/install-link read-back | verified |
| Chrome accepted the v0.1.1 ZIP and received the icon/screenshot | `store/chrome-web-store.md:93-94`; `docs/gtm-launch.md:151` records the launch operator's authenticated UI observations | verified |
| Listing, privacy, distribution and reviewer instructions were saved successfully; contact email is verified | `store/chrome-web-store.md:92,95-98`; saved settings and verified email are distinct from store publication | verified |
| Organization documents and SMS verification were submitted; organization verification was pending at the last settings observation | `store/chrome-web-store.md:91`; this is separate from extension review | verified |
| v0.1.1 was submitted for extension review and is pending review, with auto-publish after approval enabled | `store/chrome-web-store.md:89-90,100-102`; `docs/gtm-launch.md:151` records Google's explicit submission confirmation and pending-review status | verified |
| The extension is approved and public on Chrome Web Store | `store/chrome-web-store.md:88-102` records pending extension review and no live public listing; submission and auto-publish configuration are not approval | contradicted |
| Product site has no third-party analytics script; the local demo only changes illustrative DOM elements | `site/assets/demo.js:1-14`, local resource references in `site/index.html:8` and its closing script tag; hosting requests are separately disclosed in `site/privacy/index.html:14` | verified |
| The sample commenters are UI illustrations, not testimonials | `site/index.html:17` explicitly labels the demo “界面示例 · 非真实评论” and its sample users | verified |
| JSON-LD contains basic SoftwareApplication/Offer facts, with a zero price and no invented rating/review | `site/index.html:9` and the corresponding schema line in each of the four subpages | verified |
| llms.txt, structured data, or sitemap guarantees indexing, rankings, recommendations, or citations | No result evidence; `site/llms.txt:3`, `.agents/product-marketing.md:71-75` explicitly avoid this promise | unverifiable |
| X and Zhihu launch drafts are authorized destinations; LinkedIn is excluded | `.agents/product-marketing.md:57-63`, `docs/gtm-launch.md:23-33` | verified |

A test definition proves the intended VM check exists; it is not itself proof of a real script-manager/browser run. The launch operator separately reported the current combined test run as 11/11 (six extension tests, five userscript VM tests). Keep that distinct from browser acceptance.

## Prohibited claims

| Do not say | Reason |
| --- | --- |
| “35 users”, “35 browsers”, “100% compatible”, or “all comments work” | The number is one bounded local comment-renderer sample; missing data and unsupported components exist. |
| “First / original / invented Bilibili IP-region display” | Modern integration is adapted from BiliReveal. |
| “Official Bilibili extension” | This is an independent project with explicit non-affiliation. |
| “Find a full IP / precise location / live-chat location” | The implementation only displays an existing comment region field. |
| “Works everywhere / every Chromium browser / every userscript manager” | Userscript acceptance covers Tampermonkey 5.5.1 in one ego-browser video scenario; other managers and page types need separate checks. |
| “Approved on Chrome Web Store / live on Greasy Fork” before a public listing is verified | Submission, review, and public availability are separate states. |
| Ratings, reviews, awards, adoption, or conversion numbers without a dated source | No such evidence exists in this launch tree. |
| “Guaranteed Google / AI visibility” | Discoverability files and metadata do not establish ranking or citation outcomes. |
| “The site/host receives no network data at all” | Extension no-upload behavior is distinct from GitHub Pages/GitHub handling normal web requests. |

## Use

Reuse these facts across README, site, release, store copy, X, and Zhihu. Before posting, verify the actual public destination and install asset, then record final commit and publication URLs. Update rows when code or acceptance evidence changes.
