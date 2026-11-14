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

## Fresh consumer-AI probes — latest completed results

Protocol P1 uses the same natural need in separate new chats/tasks without the
brand or project URL:

> B站网页版怎么显示评论 IP 属地？请联网查找可开关的免费开源工具，给出公开来源链接，并说明是否支持直播实时弹幕属地。

WorkBuddy additionally receives a read-only instruction forbidding local
commands, file changes and installation. Existing account and selected model are
preserved. A separate Stage B supplies the homepage, repository and
`/agent-install/` to check factual reading; it is not natural discovery.

| Platform | Natural Stage A | Independent supplied-URL Stage B | Scope of conclusion |
| --- | --- | --- | --- |
| Gemini · Hydrogen | 3 completed answers; 1 explicitly offline excluded. The other 2 exposed source chips and public anchors; neither mentioned, cited or recommended Bili IP Lens: 0/2 | Completed. Self-reports reading homepage and agent-install; GitHub body and deeper files restricted. Reproduced the exact Skill command and most boundaries, but no native clickable citation/source chips were captured | Small same-account sample. Source UI is not a provider HTTP trace; named-URL reading is not spontaneous recommendation |
| ChatGPT web · Thinking effort Medium (backend model not exposed) | After final login completion, 3 new-chat answers with native citation UI and public links; 0/3 product mentions, citations or recommendations | Completed factual check with 19 clickable public anchors; exact Skill command and submitted/pending store state correct. Reported reading GitHub source files through the available connector; direct static-mirror fetches reported DisabledError | Reported connector-assisted reading is separate from anonymous web access and natural recommendation |
| 豆包 · 快速 | After login, 3 completed natural answers with visible search reference-count labels (32 / 22 / 29); 0/3 product mentions, citations or recommendations | Completed but explicitly unable to open the provided pages; returned unsupported product claims without sources | The named-URL answer is inaccurate and is not a successful reading or citation result |
| 千问 · 快速 / Qwen-快速 | After login, 3 completed natural answers with visible search reference-count labels (12 / 10 / 10); 0/3 product mentions, citations or recommendations | Completed multi-step page parsing; core facts and submitted/pending store state accurate. Skill reading self-reported with correct workflow details, but direct static-mirror access unconfirmed | Correct named-source facts do not establish natural discovery or successful fetching of every file |
| WorkBuddy · 均衡 / GLM-5.3 | 3 completed new-task answers with visible search; source buttons 14 / 12 / 18. No product mention, citation or recommendation: 0/3 | After explicit resume, 1 completed reading check; six public sources, exact Skill command and current submitted/pending store status returned | Successful named-URL content check, not natural discovery or independent proof of submission |

The backend identifiers for 豆包 and 千问 were not exposed. Completed refusals,
offline answers, authentication gates and transport failures are excluded from
the usable search-recall denominator. Earlier guest attempts are retained in private
evidence: 豆包 had two natural sends and one named-URL send reset to empty pages;
千问 had three refusals and a named-URL login gate. They are not pooled with the
new authenticated answers. ChatGPT initially stopped at normal authentication;
after the user completed verification, three new natural questions and a
separate named-URL check completed. The earlier blocked attempts had no prompts
or answers and are excluded from the later denominator. WorkBuddy
first paused before Stage B when the app was changed, then completed it in a
fresh task after explicit user continuation. The old baseline samples are not pooled
with this follow-up, and these small samples do not establish a stable rate or
a change caused by the launch work. No installation or helper dry-run was
repeated. None of the five platforms surfaced the product in their respective
usable natural samples; no recommendation improvement is established.

Search/reference UI, returned anchors and model-reported reads are the provider
evidence here; no provider-side HTTP trace was available. The project’s own
public HTTP checks are separate. ChatGPT reported using the available GitHub
connector for README, manifest, renderer, notices, Skill, helper and verification
files, and returned matching
file-specific facts. It accurately separated the project’s submitted/pending
store claim from independent store approval. Direct fetching of the three static
Skill mirrors was unavailable in that consumer tool; this is not an observed
HTTP failure of the canonical resources, which returned 200 in our own check.

## Concrete correction from the probes

Gemini's named-URL answer repeated the website's old “上架准备中” wording and missed
the just-completed Chrome review submission. Five HTML pages and llms.txt were
updated to say **v0.1.1 submitted / pending review / not yet published**. The
existing installation paths remain valid; no unapproved store link was added.
The six-page static checks and byte-for-byte Skill-mirror checks passed. The
patch was deployed successfully; HTTP read-back of the homepage, agent-install
and llms.txt confirmed the submitted/pending wording and absence of the old
preparation phrase.

This fixes an outdated first-party fact. It does not prove that an AI has
recrawled the change or that natural recommendation has improved. Gemini
reproducing the Skill command demonstrates a readable explanation, not an
installed extension.

After deployment, a new independent Gemini named-URL probe completed but
explicitly lacked browsing/search. It did not verify the updated fact; this is
retrieval unavailable, not evidence that the website failed. WorkBuddy’s resumed
reading check did return the corrected store status and exact Skill command,
with six public source links. 千问 also returned the corrected store state.

千问 reported that its page parser did not expose the installation page’s
mirror-link hrefs, and it then guessed an incorrect file path. The canonical
links were healthy: all three static Skill, helper and verification resources
returned HTTP 200. The
installation tutorial now also displays their full URLs as copyable text for
readers or chat tools that lose hyperlink addresses. Skill source and mirror
bytes remain unchanged. 豆包’s explicit access failure and unsupported claims
are recorded as an inaccurate named-URL answer, rather than a successful
citation or a reason to invent new product features.

## Daily follow-up

The owner requested a daily tracking task, now active at **09:00 Asia/Shanghai**.
It checks destination availability, available counters and feedback, store
status, and separate natural / named-URL consumer-AI probes. It does not
automatically repost, repeat installations, change account/model selections or
use paid APIs. Authentication and human verification remain actual prerequisites.

The next useful actions are to observe the store-review outcome, collect
actual installation feedback and measure whether later unseeded searches begin
citing the public project. Repeating promotional chats is not model training or
evidence of an indexing gain.

Sanitized private evidence is kept locally under
`.private/gtm-followup-2026-11-15/`; it is excluded from Git. This report omits
account details, private conversation URLs, authentication links and unrelated
user history.
