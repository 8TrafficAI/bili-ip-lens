# Bili IP Lens — product marketing context

Version: 1.3.0
Updated: 2026-11-17
Basis: extension source, manifest, validation record, user acceptance of the v0.1.1 popup fix, and the launch operator's normal-UI read-back of the public Chrome Web Store listing on 2026-11-17.

## Product

Bili IP Lens is a free, MIT-licensed Chrome / Chromium Manifest V3 extension maintained under 8TrafficAI. It displays Bilibili's existing comment IP-region string beside a comment's timestamp and provides an immediate persistent popup toggle with a toolbar ON / OFF badge.

Repository: https://github.com/8TrafficAI/bili-ip-lens
Product page: https://8trafficai.github.io/bili-ip-lens/
Chrome Web Store: https://chromewebstore.google.com/detail/eigfjbfkjlihfkiheeodkckmebolbcgi
Release version: 0.1.1

## Audience and job

Primary audience: Chinese-speaking Bilibili desktop viewers who want to see comment IP regions in the web interface with a small, focused extension and an obvious switch.

Primary job: show an available comment region while reading, then hide it when desired. Secondary job: retain that preference between sessions.

Useful search language: B站网页版显示IP属地、B站评论IP属地插件、Chrome B站IP属地、bilibili IP location extension.

## Evidence and boundaries

Observed in ego-browser: modern video main comments and nested replies, sorting, page reload, instant OFF / ON, preference persistence, actual toolbar popup, and v0.1.1 popup sizing correction.

One validation session reached 35 region-bearing comment renderers, all with labels. This is a bounded functional check, not a universal compatibility rate or benchmark.

Dynamic and profile pages share the integration target but still need separate manual acceptance. Historical Vue comment UIs, live-chat regions, missing region data, full IP addresses, and precise geolocation are outside the scope.

Targets Chrome / Chromium 111+; only ego-browser acceptance is recorded so far. Chrome Web Store v0.1.1 is publicly live as of 2026-11-17, with an enabled install button and matching project website/support repository. The normal store installation flow is the primary distribution route. GitHub ZIP / unpacked installation remains an advanced fallback, and the published Greasy Fork userscript is an alternative distribution. Store availability does not expand the tested browser/page scope.

The separate Tampermonkey userscript is published at https://greasyfork.org/zh-CN/scripts/605536. Use the current dated distribution state in store/chrome-web-store.md and the actual public listing URL. Do not ascribe the MV3 toolbar popup to the userscript. Developer-console access currently requires reauthentication; organization verification was last observed pending on 2026-11-15 and its current state is unavailable. Public store availability is not evidence for claiming organization verification is complete.

## Positioning

Chinese one-liner: 在 B站网页版评论旁显示平台已有的 IP 属地，工具栏一键开关。

English one-liner: Display Bilibili's existing comment IP regions with an instant toolbar toggle.

The distinction is focused packaging and user control: a standalone MV3 extension with no SC feature, a persistent toggle, toolbar state, and transparent upstream credit. Do not imply competitors lack these qualities without inspecting their current implementations.

## Origin and trust

The modern comment integration is adapted from MaxChang3/BiliReveal under MIT. The original copyright and full license are retained. This is not a claim of inventing IP-region display.

Only the `storage` API permission is declared; content scripts match three Bilibili domains. The extension reads existing region data in-page, makes no network requests, has no telemetry, and performs no third-party IP lookup.

It is not an official Bilibili product.

## Offer and conversion

Free installation, with no account or subscription required by the extension. Primary conversion: open the verified Chrome Web Store listing and complete its normal browser installation flow, then refresh an existing Bilibili page and verify the popup toggle.

The advanced ZIP fallback must distinguish the flat release ZIP from a source checkout's extension/ directory. Userscript instructions must identify the manager-menu control separately. Install friction should be measured from real reports, not assumed away.

## Launch and channels

Authorized publication destinations for this launch: GitHub, the public product page, X, and Zhihu. LinkedIn is explicitly excluded.

Lead with the user's problem and working installation path. Disclose involvement when publishing on social platforms. Use different lengths and formats for X and Zhihu.

No paid spend, fabricated reviews, mass direct messages, bulk reposting, or claims of guaranteed search / AI recommendation results are part of this launch.

## SEO, AEO, GEO

Create helpful, public, static product facts, an installation guide, visible FAQs, privacy information, version and source attribution. Keep descriptions consistent across the repository, product page, release, X, and Zhihu.

FAQ priorities: installation; missing regions; full IP versus region; live-chat limitations; instant toggle; Chrome Web Store status; relationship to BiliReveal.

Machine-readable files and structured data can make facts easier to parse. They do not prove indexing, rankings, rich results, or AI citations.

## Measurement

Current publication, Google indexing and bounded consumer-AI probe evidence is recorded in docs/gtm-launch.md, docs/search-indexing-2026-11-15.md, docs/geo-baseline-2026-11-15.md and dated GTM follow-ups. Homepage index inclusion was verified on November 15. The November 17 natural-query check observed one ChatGPT recommendation (1/1, same account with earlier branded-query history); independent organic discovery, stable recommendation improvement and external adoption are not established. See docs/gtm-daily-2026-11-17.md. The public store displayed 1 user on 2026-11-17; this platform counter is not independent-adoption proof, and no ratings or reviews were observed. Download counters include validation activity. A daily tracking task was enabled on 2026-11-15 and changed by the owner on 2026-11-17 to weekly Tuesdays at 09:00 Asia/Shanghai. Its main work is now targeted social keyword search and relevant public replies with maintainer disclosure and publication receipts; distribution checks remain secondary and consumer-AI probes are optional rotating samples. Public replies are authorized; repeated posts, bulk direct messages and LinkedIn remain excluded. Leave unavailable values unmeasured and keep named-URL reading separate from natural discovery.

## Change log

- 2026-11-15 — v1.0.0: initial source-backed public-launch context, with confirmed scope and channel exclusions.

- 2026-11-15 — v1.1.0: synchronize published userscript, submitted Chrome review, and dated measurement records; daily tracking enabled.

- 2026-11-17 — v1.2.0: record verified live Chrome Web Store v0.1.1 listing and make normal store installation the primary conversion; retain ZIP/userscript alternatives and unavailable organization-verification state.

- 2026-11-17 — v1.3.0: change the existing automation to weekly targeted social acquisition, with relevant disclosed replies and recorded outcomes; reduce mandatory GEO probing.
