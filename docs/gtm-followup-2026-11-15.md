# GTM / GEO follow-up · 2026-11-15

Date and schedule use Asia/Shanghai. This is a fresh follow-up after the initial
[launch](gtm-launch.md) and [GEO baseline](geo-baseline-2026-11-15.md), not a
replacement for their earlier observations. Figures are point-in-time counters,
not distinct-user or conversion measurements.

## Distribution and response

| Destination | Fresh observation | Interpretation |
| --- | --- | --- |
| [X launch post](https://x.com/handi_xie/status/2121706874768957664) | Post and product link visible; 1 view, 0 replies, reposts, likes and bookmarks | The view can include launch verification; no external response established |
| [Zhihu article](https://zhuanlan.zhihu.com/p/2105162590800311760) | Article remains visible with the Tampermonkey validation paragraph. Creator content manager shows 1 read and 0 upvotes, comments, collections and likes | Author-side metrics; the read cannot be attributed to an external reader |
| [Greasy Fork](https://greasyfork.org/zh-CN/scripts/605536) | v0.1.1 and installation link visible; daily installs 0, total installs 0 | Marketplace counters at the check, not a claim that installation is impossible |
| [GitHub release](https://github.com/8TrafficAI/bili-ip-lens/releases/tag/v0.1.1) | ZIP downloads 5, userscript 1, checksum 4; ZIP/checksum each increased by 1 from the earlier snapshot | Includes validation/dry-run activity; cannot identify five users or establish external adoption |
| [Repository](https://github.com/8TrafficAI/bili-ip-lens) | Traffic API: views 0 / unique viewers 0, clones 0 / unique cloners 0; stars, forks and open issues 0 | Traffic reporting can lag; these are API counters, not complete launch-day attribution |
| [Product site](https://8trafficai.github.io/bili-ip-lens/) | Six canonical HTML pages and llms.txt returned HTTP 200 | Availability is separate from indexing, ranking and AI retrieval |
| Chrome Web Store | Authenticated status reread: pending review, draft awaiting review | Submission is complete; the extension is not live. Auto-publish after approval remains configured. Organization verification was separately pending at the last settings observation |

No new social post, reply, direct message, paid promotion or LinkedIn action was
made in this follow-up. There is no verified external-acquisition result yet.

## Fresh consumer-AI probes

Protocol P1 uses the same natural need in independent new chats/tasks without the
brand or project URL:

> B站网页版怎么显示评论 IP 属地？请联网查找可开关的免费开源工具，给出公开来源链接，并说明是否支持直播实时弹幕属地。

WorkBuddy additionally receives a read-only instruction forbidding local
commands, file changes and installation. Existing account and selected model are
preserved. A separate Stage B supplies the homepage, repository and
`/agent-install/` to check factual reading; it is not natural discovery.

| Platform | Natural Stage A | Independent supplied-URL Stage B | Scope of conclusion |
| --- | --- | --- | --- |
| Gemini · Hydrogen | 3 completed answers; 1 explicitly offline excluded. The other 2 exposed source chips and public anchors; neither mentioned, cited or recommended Bili IP Lens: 0/2 | Completed. Self-reports reading homepage and agent-install; GitHub body and deeper files restricted. Reproduced the exact Skill command and most boundaries, but no native clickable citation/source chips were captured | Small same-account sample. Source UI is not a provider HTTP trace; named-URL reading is not spontaneous recommendation |
| ChatGPT web | Entry requires login, no composer; no prompt submitted | Not run | No completed-answer denominator; recall not assessed |
| 豆包 · 快速 | 2 ordinary guest sends reset to empty homepage, no answer | 1 send also reset to empty homepage, no answer | Session/submission failure, not a product miss or proof that the pages cannot be read |
| 千问 · 快速 | 3 new-chat completed refusals, no observed search or sources | Sending the independent query opened the normal app-scan login requirement; no answer | Refusals and login gate recorded separately; usable retrieval denominator 0 |
| WorkBuddy · 均衡 / GLM-5.3 | 3 completed new-task answers with visible search; source buttons 14 / 12 / 18. No product mention, citation or recommendation: 0/3 | Not executed: user interaction changed the app before sending, so native actions stopped | A real three-sample natural result. The interrupted Stage B is not a page-access failure or a product miss |

The backend identifiers for 豆包 and 千问 were not exposed. Completed refusals,
offline answers, authentication gates and transport failures are excluded from
the usable search-recall denominator. The old baseline samples are not pooled
with this follow-up, and these small samples do not establish a stable rate or
a change caused by the launch work. No installation or helper dry-run was
repeated. Gemini and WorkBuddy did not surface the product in their respective
usable natural samples; no recommendation improvement is established.

## Concrete correction from the probes

Gemini's named-URL answer repeated the website's old “上架准备中” wording and missed
the just-completed Chrome review submission. Five HTML pages and llms.txt were
updated to say **v0.1.1 submitted / pending review / not yet published**. The
existing installation paths remain valid; no unapproved store link was added.
The six-page static checks and byte-for-byte Skill-mirror checks passed.

This fixes an outdated first-party fact. It does not prove that an AI has
recrawled the change or that natural recommendation has improved. Gemini
reproducing the Skill command demonstrates a readable explanation, not an
installed extension.

## Daily follow-up

The owner requested a daily tracking task, now active at **09:00 Asia/Shanghai**.
It checks destination availability, available counters and feedback, store
status, and separate natural / named-URL consumer-AI probes. It does not
automatically repost, repeat installations, change account/model selections or
use paid APIs. Authentication and human verification remain actual prerequisites.

The next useful actions are to complete the normal ChatGPT / 豆包 / 千问 sessions
and repeat their real consumer tests, then observe the store-review outcome and
whether fresh unseeded searches begin citing the public project. Repeating
promotional chats is not model training or evidence of an indexing gain.

Sanitized private evidence is kept locally under
`.private/gtm-followup-2026-11-15/`; it is excluded from Git. This report omits
account details, private conversation URLs, authentication links and unrelated
user history.
