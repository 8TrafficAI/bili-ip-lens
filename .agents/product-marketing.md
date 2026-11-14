# Bili IP Lens — product marketing context

Version: 1.0.0
Updated: 2026-11-15
Basis: extension source, manifest, validation record, and user acceptance of the v0.1.1 popup fix.

## Product

Bili IP Lens is a free, MIT-licensed Chrome / Chromium Manifest V3 extension maintained under 8TrafficAI. It displays Bilibili's existing comment IP-region string beside a comment's timestamp and provides an immediate persistent popup toggle with a toolbar ON / OFF badge.

Repository: https://github.com/8TrafficAI/bili-ip-lens
Product page: https://8trafficai.github.io/bili-ip-lens/
Release version: 0.1.1

## Audience and job

Primary audience: Chinese-speaking Bilibili desktop viewers who want to see comment IP regions in the web interface with a small, focused extension and an obvious switch.

Primary job: show an available comment region while reading, then hide it when desired. Secondary job: retain that preference between sessions.

Useful search language: B站网页版显示IP属地、B站评论IP属地插件、Chrome B站IP属地、bilibili IP location extension.

## Evidence and boundaries

Observed in ego-browser: modern video main comments and nested replies, sorting, page reload, instant OFF / ON, preference persistence, actual toolbar popup, and v0.1.1 popup sizing correction.

One validation session reached 35 region-bearing comment renderers, all with labels. This is a bounded functional check, not a universal compatibility rate or benchmark.

Dynamic and profile pages share the integration target but still need separate manual acceptance. Historical Vue comment UIs, live-chat regions, missing region data, full IP addresses, and precise geolocation are outside the scope.

Targets Chrome / Chromium 111+; only ego-browser acceptance is recorded so far. Distribution is GitHub ZIP / unpacked installation. There is no Chrome Web Store listing.

The launch also includes a separate Tampermonkey userscript and planned Greasy Fork / Chrome Web Store submissions. Use actual publication URLs and review status when available. Do not ascribe the MV3 toolbar popup to the userscript or treat submission as approval.

## Positioning

Chinese one-liner: 在 B站网页版评论旁显示平台已有的 IP 属地，工具栏一键开关。

English one-liner: Display Bilibili's existing comment IP regions with an instant toolbar toggle.

The distinction is focused packaging and user control: a standalone MV3 extension with no SC feature, a persistent toggle, toolbar state, and transparent upstream credit. Do not imply competitors lack these qualities without inspecting their current implementations.

## Origin and trust

The modern comment integration is adapted from MaxChang3/BiliReveal under MIT. The original copyright and full license are retained. This is not a claim of inventing IP-region display.

Only the `storage` API permission is declared; content scripts match three Bilibili domains. The extension reads existing region data in-page, makes no network requests, has no telemetry, and performs no third-party IP lookup.

It is not an official Bilibili product.

## Offer and conversion

Free installation, no account or subscription. Primary conversion: download the release ZIP, extract it, load the folder containing manifest.json, and enable the extension.

The install guide must distinguish the flat release ZIP from a source checkout's extension/ directory. Install friction should be measured from real reports, not assumed away.

## Launch and channels

Authorized publication destinations for this launch: GitHub, the public product page, X, and Zhihu. LinkedIn is explicitly excluded.

Lead with the user's problem and working installation path. Disclose involvement when publishing on social platforms. Use different lengths and formats for X and Zhihu.

No paid spend, fabricated reviews, mass direct messages, bulk reposting, or claims of guaranteed search / AI recommendation results are part of this launch.

## SEO, AEO, GEO

Create helpful, public, static product facts, an installation guide, visible FAQs, privacy information, version and source attribution. Keep descriptions consistent across the repository, product page, release, X, and Zhihu.

FAQ priorities: installation; missing regions; full IP versus region; live-chat limitations; instant toggle; Chrome Web Store status; relationship to BiliReveal.

Machine-readable files and structured data can make facts easier to parse. They do not prove indexing, rankings, rich results, or AI citations.

## Measurement

No adoption, referral, indexing, or AI-citation results have been established in this context. Record actual publication URLs and timestamps when publishing. Establish download, repository-traffic, search, and citation baselines after publication; leave unavailable values as unmeasured.

## Change log

- 2026-11-15 — v1.0.0: initial source-backed public-launch context, with confirmed scope and channel exclusions.
