# Claim check — Bili IP Lens v0.1.1 public launch

Initial review: 2026-11-15, before first publication.

Initial code baseline: `9f779ca` + the publication working tree at that time.

Publication follow-up: 2026-11-15, offline review of `f025d76` + the current launch working tree.

Ledger: [brand-context](../.agents/brand-context.md).

**Current verdict: SHIP for the reviewed factual copy.** GitHub, Pages, release, Greasy Fork, X and Zhihu publication are recorded in the current launch log. Chrome Web Store publication and real userscript behavior acceptance remain incomplete; the copy must keep those limits explicit. Search ownership verification, sitemap submission and IndexNow receipts are not indexing or AI-recommendation outcomes.

The destination supplement at the end of this document is the current status. The eight-pass table and original remaining-check section below are the **pre-publication audit history**, retained with their original line references and five-page scope; references to a pending Greasy Fork listing or unverified launch destinations there are historical, not the present distribution state. The follow-up adds the sixth, Agent-install page and its public Skill mirrors. The initial verdict was SHIP for content / SHIP-BLOCKED for live distribution until destination and account checks were completed.

## Reviewed surfaces

- Chinese and English README, install paths, scope table, FAQ, privacy and upstream credit.
- Static product, install, FAQ, privacy, and English pages; title/meta/OG copy; SoftwareApplication JSON-LD; sitemap and llms.txt.
- Illustrative demo labels and interaction code.
- Prepared X post/follow-up and Zhihu article in [GTM brief](gtm-launch.md).
- Extension implementation, userscript source/settings, VM tests, MIT notices, and recorded real-browser checks.

## Eight passes

| # | Pass | Surface / source | Finding | Severity | Disposition |
| --- | --- | --- | --- | --- | --- |
| 1 | Every number | `site/index.html:22`; `docs/validation-2026-11-15.md:15-16` | “35” is explicitly a dated local sample of region-bearing comments/replies. It is not described as user count, adoption, accuracy, or global compatibility. | NOTE | Keep local/sample/date context together. |
| 1 | Every number | `extension/manifest.json:2-7`; `site/index.html:9` | v0.1.1, MV3, minimum Chrome 111, and SoftwareApplication price 0 match the manifest and free MIT distribution. | NOTE | Do not equate minimum version with acceptance in all browsers. |
| 1 | Every number | `docs/gtm-launch.md:37-47`, `docs/gtm-launch.md:136-156` | Search intents and seven-day measurement are a plan; no search volumes, rankings, adoption results, or conversion forecasts are invented. | NOTE | Leave unmeasured results unmeasured. |
| 2 | Invented evidence | `README.md:48-58`; `docs/gtm-launch.md:104-106` | Browser evidence is limited to ego-browser and the tested modern video/comment scenarios. Dynamic/profile acceptance remains open. | NOTE | Maintain this boundary. |
| 2 | Invented evidence | `README.md:29-33`; `tests/userscript.test.mjs:81-110`, `tests/userscript.test.mjs:113-193` | Userscript VM coverage is real, but no actual Tampermonkey installation/injection acceptance is recorded. | CHECK | README/English README/Zhihu copy now state this explicitly. |
| 3 | Fabricated people | `site/index.html:17` | Demo usernames A/B are explicitly labelled UI examples and non-real comments, with no claim that they are customers or testimonials. | NOTE | Keep the visible illustration label and caption. |
| 3 | Fabricated people | `docs/gtm-launch.md:62-72`, `docs/gtm-launch.md:78-86` | Maker involvement is disclosed. No invented customers, support team, reviews, or adoption story appears. | NOTE | Use the actual publisher account; do not present this as an independent review. |
| 4 | Category creep | `extension/page.js:20-24`, `extension/page.js:49-69`; `site/faq/index.html:14` | Copy distinguishes existing comment-region display from full IP lookup, precise location, missing-data inference, and livestream chat. | NOTE | No category expansion found. |
| 4 | Category creep | `userscript/settings.js:18-28`; `README.md:29`; `docs/gtm-launch.md:100` | Userscript menu and MV3 popup are different controls. | REWRITE | Resolved: own README and launch article now name the script-manager menu and no independent userscript popup. |
| 4 | Category creep | `site/install/index.html:14` | Earlier “无需更改安全设置” was broader than the installation instructions warranted. | REWRITE | Resolved by launch operator: removed broad wording, retained concrete Developer mode steps. |
| 5 | Credential/persona drift | `docs/gtm-launch.md:62-72`, `docs/gtm-launch.md:82-86` | Copy claims to build the tool, not to be Bilibili, a network-forensics provider, or the inventor of upstream integration. | NOTE | No credential drift found. |
| 5 | Credential/persona drift | `extension/THIRD_PARTY_NOTICES.md:5-34`; `site/index.html:20` | BiliReveal/MaxChang3 attribution is visible and full MIT notices are retained. | NOTE | Preserve it in userscript and release archives. |
| 6 | Regulated claims | README, all five site pages, X/Zhihu drafts | No medical, financial, legal, identity-eligibility, or safety verdict is offered. | NOTE | No qualified-review dependency applies to this copy. |
| 7 | Destination | `docs/gtm-launch.md:124-134`; canonical/link declarations in site pages | Public source, Pages and asset links are intended final destinations; first-push/deploy verification belongs to the launch operator, who is executing it. | CHECK | Record public read-back before social distribution; this is not a content rewrite or a request for new approval. |
| 7 | Destination | `README.md:33`; `site/llms.txt:13`; `site/faq/index.html:14` | No approved Chrome Web Store or live Greasy Fork listing is claimed. Login/submission/review availability must be reported separately. | CHECK | Add marketplace links only after actual publication. |
| 7 | Destination | `extension/manifest.json:7,17,23`; all four extension runtime JS files | “无额外查询 / 无上传 / 无使用追踪” matches the reviewed code. The local label count is not telemetry. | NOTE | Do not mislabel this supported claim as unverifiable. |
| 7 | Destination | `site/privacy/index.html:14`; `site/assets/demo.js:1-14` | Website has a local illustrative interaction and separately discloses hosting/platform request handling. | NOTE | Extension privacy claims do not promise GitHub has no logs. |
| 7 | Destination | `site/index.html:9`; `site/llms.txt:3-13` | Basic free-software structured facts contain no fake ratings/reviews. llms.txt expressly avoids guaranteed-indexing/AI-recommendation claims. | NOTE | Search results and AI citations remain unmeasured. |
| 8 | Platform-native compliance | `docs/gtm-launch.md:60-120` | X/Zhihu copy has maker disclosure, factual installation steps, no engagement bait or fabricated third-party endorsement. | NOTE | Final platform composer declarations and public visibility must be checked by the posting operator. |
| 8 | Platform-native compliance | `.agents/product-marketing.md:57-63`; `docs/gtm-launch.md:23-33` | LinkedIn is excluded. | NOTE | Do not distribute there. |

## Blockers and remaining checks

- **Actual destinations:** after source publication, release creation and Pages deployment, confirm the canonical product page, README, raw userscript, ZIP asset and attribution links resolve. Replace pending publication-log entries with actual observations.
- **Account/marketplace execution:** X, Zhihu, Greasy Fork and Chrome Web Store status must be based on completed browser actions and public URLs; a login screen, saved draft, submission, or under-review state is not a public launch.
- **Userscript acceptance:** do not market it as real-Tampermonkey verified until a manager installation/injection/playthrough is recorded. Current honest copy can publish with this limitation.
- **No performance claim is pending:** lack of analytics does not block the factual free/local-display/no-telemetry copy; it only rules out adoption, conversion, ranking or citation success claims.

## Rewrites completed in this review

- README and English README now name the userscript-manager menu, distinguish it from the MV3 popup, recommend one distribution at a time, and state the VM-versus-real-manager acceptance boundary.
- The prepared Zhihu article carries the same userscript boundary.
- Launch operator removed the overbroad safety-setting sentence from the install page.

No site, extension, userscript, privacy, or store implementation files were changed by this reviewer.

## Publication and destination follow-up · 2026-11-15

This follow-up reviewed the local final text, source links and dated launch records. It did not operate a browser or independently repeat the posting, account-verification or search-engine submissions. Public publication and account observations below come from the launch operator's completed read-backs, as recorded in the linked sources. No private account, conversation, address or session material is copied into this report.

| Surface / claim | Current checkable source | Follow-up finding | Severity |
| --- | --- | --- | --- |
| GitHub source and v0.1.1 release are public | `docs/gtm-launch.md:145-147` | Repository, release and raw userscript publication are recorded; anonymous ZIP checksum verification is distinct from a publisher signature. | NOTE |
| Product site and Agent-install page are published | `docs/gtm-launch.md:150-151`; `site/sitemap.xml:3-8`; `site/agent-install/index.html:17-27` | Six canonical pages are present. The current local site check passed metadata, links, assets, sitemap and exact Skill-mirror consistency. | NOTE |
| Greasy Fork script 605536 is published | `README.md:43`; `README.en.md:39`; `site/llms.txt:13,28`; `docs/gtm-launch.md:148` | Correctly states published and links the real script. A plain HTTP client's 403 does not negate the recorded browser detail/install-link read-back. | NOTE |
| Skill is publicly available and can guide an equipped Agent | `README.md:11-23`; `site/agent-install/index.html:17-27`; `site/llms.txt:15-16,29,32` | The command installs instructions. File preparation, browser loading and behavior verification are separate. macOS/Linux helper requirements and ordinary-chat limitations are explicit; no Marketplace inclusion or fully unattended install is promised. | NOTE |
| WorkBuddy consumed the Skill and ran its helper | `docs/geo-baseline-2026-11-15.md:239-279` | One observed public-source/dry-run sample returned `verified_dry_run` and `browser_installation: pending`; it is not a new extension installation, natural discovery or global Skill installation. | NOTE |
| X and Zhihu were published | `docs/gtm-launch.md:152-153` | Current log records [X status 2121706874768957664](https://x.com/handi_xie/status/2121706874768957664) and [Zhihu article 2105162590800311760](https://zhuanlan.zhihu.com/p/2105162590800311760), with author-side read-back and the documented anonymous-access limitation. These are maker publications, not independent reviews. | NOTE |
| Chrome Web Store status | `store/chrome-web-store.md:5-7,83-87`; `docs/gtm-launch.md:149`; `README.md:7,47` | Business-publisher verification and organization-profile entry remain prerequisites. The new organization/payment-profile form has not been submitted; the extension package is not uploaded or under review, and no public listing exists. Do not describe this as extension review. | CHECK |
| Tampermonkey acceptance | `README.md:45`; `README.en.md:41` | Version 0.1.1 was saved through the normal New Userscript/manager route. Initial hot comments had no region field; this is neither proof of a failed injection nor a successful playthrough. Real region-bearing comment injection and menu OFF/ON acceptance remain pending. | CHECK |
| Search submission and GEO results | `docs/gtm-launch.md:156-162`; `docs/geo-baseline-2026-11-15.md:12-19,34-50,74-96,98-152,239-279` | Google ownership was verified and sitemap submission accepted, while the initial sitemap table reports unable to fetch / zero discovered pages. The latest six-URL IndexNow receipt is HTTP 200, following an earlier five-URL 202; neither receipt proves indexing. Natural discovery samples and supplied-URL reading/dry-run checks remain separate, with no demonstrated ranking or recommendation gain. | CHECK |
| 35-comment sample, scope, privacy and upstream credit | `README.md:58-78,104-106`; `docs/validation-2026-11-15.md:10-20`; `site/index.html:17-22` | No conversion/adoption/accuracy claim, fake rating, full-IP lookup, official affiliation or unsupported livestream functionality was found. The local sample and BiliReveal attribution remain explicit. The no-upload/no-telemetry runtime claim remains supported by source review. | NOTE |

The recheck found no stale “Greasy Fork coming soon” or “Skill not yet available” claim in the current README, store preparation, six public HTML pages or llms.txt. The original ledger's combined marketplace row was split into published Greasy Fork and unsubmitted Chrome Web Store states. README's userscript status was narrowed from an undifferentiated pending installation to saved script / pending real behavior acceptance. No pending verification was promoted to a pass.

The current publication log supersedes the initial audit's live-destination blockers. Remaining work is specific: finish the publisher/account prerequisite before package submission, complete userscript injection/menu acceptance, investigate the sitemap-fetch report, and measure search/AI discovery with fresh completed samples. LinkedIn remains excluded. This review made no browser, account, publication or scheduling changes and created no commit.
