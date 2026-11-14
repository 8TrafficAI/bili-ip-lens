# Claim check — Bili IP Lens v0.1.1 public launch

Reviewed: 2026-11-15  
Baseline: `9f779ca` + current publication working tree.  
Final published commit / destination read-back: launch operator to fill after first push, release, and Pages deployment.  
Ledger: [brand-context](../.agents/brand-context.md).

**Verdict: SHIP for content; SHIP-BLOCKED for live distribution until destination links and required account sessions are verified.**

There is no unresolved substantive product-claim contradiction in the reviewed copy. Source/website publication can proceed. X and Zhihu publication should use the verified final product and download URLs. Chrome Web Store and Greasy Fork must retain preparation/submission wording until an actual public listing exists.

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
