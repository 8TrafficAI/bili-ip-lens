# GEO retrieval baseline · 2026-11-15

This is an execution record, not evidence of search ranking or AI recommendation
success. The date is in Asia/Shanghai. Initial provider adapter attempts used
OpenCLI 1.8.4. Subsequent consumer-site follow-ups used ego-browser directly;
WorkBuddy was tested through its native UI. Existing account and model selections
were preserved. Adapter failures and completed browser answers are reported
separately below.

## Questions and method

Stage A asks a natural need without the brand or project URL, in a new chat:

> 请进行联网检索：B站网页版怎么显示评论IP属地？推荐可开关的开源工具，给出可点击的公开来源，并说明是否支持直播实时弹幕。请只根据本次可核对的来源回答；无法检索或无法确认时明确说明。

If a completed Stage A answer does not identify the product, Stage B uses a
separate new chat and explicitly supplies its name and public URLs. That stage
checks whether the pages can be read and described correctly; it is **not**
spontaneous recall, ranking improvement, or persistent model memory.

The intended Stage B prompt is:

> 请进行联网核验：Bili IP Lens 是什么？公开项目 https://github.com/8TrafficAI/bili-ip-lens ，产品页 https://8trafficai.github.io/bili-ip-lens/ 。请说明你是否实际打开或检索到了这些页面，并根据公开页面核对功能、安装方法、IP数据来源、上游署名和直播实时弹幕支持范围，给出可点击来源。若无法访问或检索，请明确说明，不要把我提供的URL当作已验证引用。

Initial adapter commands used background windows, fresh chats, and response
timeouts of 50 seconds or less. Individual subprocesses were bounded to 60
seconds. No user conversation history was searched. Private conversation IDs and
URLs are removed from the local records. No WorkBuddy adapter was present in the
inspected command registry. Direct browser prompts are recorded in their
respective sections; they are not silently pooled with failed adapter attempts.

## Observed results

| Provider | Stage A access / submission attempts | Completed natural answers (n) | Product recall / cited project URL | Actual observation | Model / UI label |
|---|---:|---:|---|---|---|
| ChatGPT | 2 adapter attempts; direct UI inspected, unsent | 0 | Not assessed | Adapter failures followed by a direct ego-browser page showing login choices and no composer. | Unknown |
| Gemini | 3 failed adapter attempts; 1 completed direct-browser chat | 1 | No spontaneous Bili IP Lens mention; no project URL cited (0/1) | Direct browser answer recommended BiliReveal, Bilibili-Evolved and ShowBilibiliLocation. | Hydrogen (visible UI label) |
| 豆包 / Doubao | 1 adapter attempt; 2 ordinary guest UI submissions | 0 | Not assessed | Adapter timed out. Both guest submissions returned to the empty homepage; the second showed a logout-related URL flag. No answer completed. | 快速 mode label; backend model unknown |
| 千问 / Qianwen | 1 adapter attempt; direct guest UI inspected, unsent | 0 | Not assessed | Adapter had stale-page failure. The guest composer was available, but shared-space user control stopped execution before submission. | Qwen-快速 UI label; backend model unknown |
| WorkBuddy 5.11.3 | 1 native new task | 1 | No spontaneous Bili IP Lens mention; no project URL cited (0/1) | Search completed; this is one sample only. | 均衡 (GLM-5.3), visible response footer |

An adapter's preliminary `Login: Yes` status is insufficient evidence of a usable
session: ChatGPT's failure trace showed `Log in or sign up` and an email field.
The actual page state takes precedence over that status result.

No successful engine answer or citation was obtained through the initial adapter
attempts. Later direct-browser Gemini and native WorkBuddy tests did complete,
as detailed below. ChatGPT, Doubao and Qianwen still have no completed-answer
denominator. Transport and authentication failures are **not** counted as product
misses. Supplied-URL Stage B results are separate from natural discovery.

## Gemini direct browser Stage A: one completed sample

The root agent completed a fresh Gemini Apps chat through ego-browser. The
visible mode label was **Hydrogen**; it is a UI label, not an independently
verified API model identifier. The natural prompt was:

> B站网页版怎么显示评论 IP 属地？请联网查找可开关的免费开源工具，给出公开来源链接，并说明是否支持直播实时弹幕属地。

The completed answer did not mention Bili IP Lens. It recommended BiliReveal,
Bilibili-Evolved and ShowBilibiliLocation, and printed these public source URLs:

- [BiliReveal](https://github.com/maxchang3/BiliReveal)
- [Its Greasy Fork page](https://greasyfork.org/zh-CN/scripts/466815)
- [Bilibili-Evolved](https://github.com/the1812/Bilibili-Evolved)
- [ShowBilibiliLocation](https://github.com/BlackVisor/ShowBilibiliLocation)

The UI showed source labels and the answer included these URL strings. This
records what Gemini returned; it does not independently validate all its claims
about third-party tools or Bilibili's data. This is one completed natural sample
with no product mention (0/1), not a stable recall or recommendation estimate.
The sanitized answer is stored in `.private/gemini-natural.json`.

## Gemini direct browser Stage B: partial supplied-URL reading

In a separate new Gemini chat, the root agent supplied the product homepage,
GitHub repository, Greasy Fork script 605536, and the repository's installation
`SKILL.md` URL. The visible mode label remained **Hydrogen**.

The completed answer reported that it could read the product homepage and
[Greasy Fork listing](https://greasyfork.org/zh-CN/scripts/605536), but could only
see a shell for the GitHub repository and `SKILL.md`, without their bodies.
It accurately described the product scope, license and installation information
from accessible sources, and declined to invent a Skill command it could not
verify. This is **partial content access: 2 of 4 supplied sources**, with Skill
body reading unsuccessful. It is not a 4/4 read success or natural discovery.
The root agent's sanitized record is `.private/gemini-directed.json`.

Any later test of a static-site Skill mirror must be reported as a separate
engineering improvement and new retrieval attempt, rather than overwriting this
initial source-access limitation.

The Stage B access statements are Gemini's reported retrieval outcome and the
visible completed answer. No independent provider-side HTTP trace was available;
the report does not treat the model's claim of an HTTP success as a verified
network receipt.

## WorkBuddy native Stage A: one completed sample

The natural question was sent in a separate new WorkBuddy task. It included a
read-only instruction not to modify local files, install software, or execute
local commands. No brand name or project URL was supplied. The selected 均衡 mode
was left unchanged. The response footer exposed **GLM-5.3**, and the UI displayed
“腾讯元宝提供搜索技术支持” and “15个来源”. Completion took 1m41s in the UI.

The answer named BiliReveal, Bilibili-Evolved's ipShow component,
chenaive/bilibili-web-ip, and the original bilibili-fullscreen-sc extension. It
**did not identify Bili IP Lens**. This is a single observed miss (0/1), not an
estimate of the engine's general recall rate or a comparison between models.

Public sources named in that answer included:

- [BiliReveal](https://github.com/maxchang3/BiliReveal)
- [BiliReveal Greasy Fork page](https://greasyfork.org/zh-CN/scripts/466815)
- [chenaive/bilibili-web-ip](https://github.com/chenaive/bilibili-web-ip)
- [Its Greasy Fork page](https://greasyfork.org/zh-CN/scripts/602922)
- [Bilibili-Evolved issue 4643](https://github.com/the1812/Bilibili-Evolved/issues/4643)
- [bilibili-fullscreen-sc](https://github.com/eeelester/bilibili-fullscreen-sc)

These links are normalized from source strings displayed in the answer; the
separate 15-source panel was not opened. This report records what the engine
returned and does not independently endorse every claim about those tools.
WorkBuddy's independent brand/URL Stage B completed in a separate new task.

## WorkBuddy native Stage B: supplied-URL content check

The second task supplied the public product page and repository URLs and asked
for actual access, factual checks, explicit access failures, and public sources.
It again prohibited local file changes, installation, and local commands. The
selected mode remained 均衡; the response footer again displayed **GLM-5.3**.

The answer completed in 24s, reported successful opening of both pages, and
returned clickable links to the [product page](https://8trafficai.github.io/bili-ip-lens/),
[repository README](https://github.com/8TrafficAI/bili-ip-lens), and
[BiliReveal](https://github.com/maxchang3/BiliReveal). It correctly restated:

- Existing `reply_control.location` region data, with no external IP lookup.
- The difference between loading the extracted release ZIP root and the source
  repository's `extension/` directory.
- MIT attribution to BiliReveal, main/nested modern comments, and no live-chat
  IP-region support.
- The project-reported 35-comment local test and the remaining userscript,
  dynamic/profile, and other-browser acceptance limits.
- Chrome Web Store and Greasy Fork publishing had not yet happened at test time.

This is **one successful supplied-URL content check (1/1)**, not spontaneous
retrieval or a rank improvement. Evidence is the native UI's completed answer,
clickable citations, and page-specific facts; no independent provider HTTP trace
was available. These facts originated from project-controlled public pages, not
an independent third-party product review. Together, the two WorkBuddy stages
show that the pages could be consumed when named, while the unseeded need query
did not surface Bili IP Lens in this one test.

## What can be verified independently

- [Public source repository](https://github.com/8TrafficAI/bili-ip-lens)
- [Public product page](https://8trafficai.github.io/bili-ip-lens/)
- [Installation guide](https://8trafficai.github.io/bili-ip-lens/install/)
- [FAQ](https://8trafficai.github.io/bili-ip-lens/faq/)
- [Privacy statement](https://8trafficai.github.io/bili-ip-lens/privacy/)

These are the intended project sources, not citations returned by a tested AI
engine. Site availability, crawler-readable HTML, and publication are separate
from index inclusion, retrieval, citation, and recommendation.

## Re-test protocol

Once the relevant session and adapter are usable, repeat Stage A in new chats
without supplying the brand, then Stage B only where needed. Record the visible
model if the interface exposes it, whether web search actually ran, the complete
answer, and the URLs actually cited. Start with at least three completed samples
per engine before comparing mention rates; a single answer remains an anecdote.

Raw sanitized command records are kept locally in the ignored
`.private/geo-probes-2026-11-15/` directory. They are not published with this report.

## Direct ego-browser follow-up: initial access inspection

At approximately 05:03–05:04 Asia/Shanghai on 2026-11-15, the three consumer
websites were opened directly through ego-browser in separate new tabs. The
shared task space remained agent-owned; existing tabs were not modified. This
follow-up inspected actual UI state rather than trusting adapter session flags.

The intended new-chat natural prompt was:

> B站网页版怎么显示评论 IP 属地？请联网查找可开关的免费开源工具，给出公开来源链接，并说明是否支持直播实时弹幕属地。

| Product | Observed fresh page | Prompt sent | Completed answers | Result |
|---|---|---:|---:|---|
| ChatGPT | “Log in or sign up”, Google/Apple/phone/email sign-in choices, no composer | No | 0 | `login_required` |
| 豆包 / Doubao | “登录”, no authenticated identity; a guest composer was visible | No | 0 | `login_required` under the authenticated-session test protocol; anonymous access was not tested |
| 千问 / Qianwen | “登录”, “暂无对话”; default UI mode label “Qwen-快速” | No | 0 | `login_required` |

No account was signed in or switched, no model selection was changed, and no
CAPTCHA was encountered or solved. The pages were left available for a later
user login. During this initial access inspection, no Stage A prompt or supplied-URL Stage B
prompt was submitted; there were **zero completed samples**, not three product
misses. The subsequent guest follow-up is recorded separately below. Presence of a
guest composer is not proof that authenticated search is available, and this
record does not claim that anonymous access is universally unsupported.

Sanitized records are in the ignored local directory
`.private/geo-browser-2026-11-15/`. Only public entry URLs and observed login UI
markers were saved; authentication URLs, credentials and conversation histories
were not collected.


## Ordinary guest follow-up: Doubao and Qianwen

After authorization to use ordinary anonymous composers, the same natural prompt
was attempted on Doubao without logging in, changing the visible 快速 mode, or
modifying account state. One submission used Enter; after inspecting the reset
page, the second used the visible send button. Both returned to an empty fresh
homepage with the Login button. After the second submission, the URL included
the non-secret `from_logout=1` flag. No answer or citation appeared; the second attempt also
included a bounded 10-second condition wait.

This is **two UI submission attempts and zero completed natural answers**. The
logout-related redirect was observed, but its exact authentication or transport
cause was not independently verified. No explicit login modal or CAPTCHA was
encountered on Doubao. Further attempts and supplied-URL Stage B were stopped.
The result is `guest_submission_redirect_no_answer`, not a product-recall miss.

Qianwen still exposed its normal guest composer and the unchanged **Qwen-快速**
label. Before filling or sending, the shared-space ownership guard stopped the
next script because control had returned to the user. The parent agent reported
a browser clipboard permission prompt from a different page. **No Qianwen
prompt was submitted**; its anonymous search capability therefore remains
untested. No browser action resumed after this stop.

The guest observations occurred after the initial 05:03–05:04 inspection and
before the records were written at 05:10:39 Asia/Shanghai on 2026-11-15; individual
action timestamps were not captured. Sanitized records are
`.private/geo-browser-2026-11-15/doubao-guest-natural.json` and
`.private/geo-browser-2026-11-15/qianwen-guest-natural.json`. The earlier access
inspection files are retained as chronological evidence. No conversation IDs,
authentication data, account switches or previous chat contents were collected.

## WorkBuddy Stage C: public Agent Skill consumer check

A third independent WorkBuddy task consumed the public
[SKILL.md](https://github.com/8TrafficAI/bili-ip-lens/blob/main/skills/bili-ip-lens/SKILL.md),
[helper](https://github.com/8TrafficAI/bili-ip-lens/blob/main/skills/bili-ip-lens/scripts/install-extension.sh),
and [verification reference](https://github.com/8TrafficAI/bili-ip-lens/blob/main/skills/bili-ip-lens/references/verification.md).
The response footer again showed **均衡 (GLM-5.3)**. It completed in 1m20s.

The task downloaded the three public raw files into a dedicated temporary work
directory, reviewed them, and ran only the helper's dry-run route:

```sh
bash scripts/install-extension.sh --dry-run --install-root <dedicated-temporary-root>
```

The already completed terminal step was expanded in the native UI to inspect
its original output; the helper was not rerun for evidence collection. The tool
transcript showed `EXIT_CODE=0` and the full JSON with:

- `status: verified_dry_run`, repository `8TrafficAI/bili-ip-lens`.
- Release `v0.1.1`, manifest version `0.1.1`.
- ZIP SHA-256 `175e2b2455a4b02c6a2329b7ab3291225c01ca27dc7c99840843b0ec7b16342f`.
- `browser_installation: pending`.

Independent read-only filesystem checks confirmed the downloaded files matched
the repository files byte for byte and that the designated installation root
was still absent after the run. The native transcript did not expose stderr as
a separate stream; no error was displayed. Private records retain the complete
observed command and original stdout JSON.

WorkBuddy correctly distinguished instructions being installed, extension files
being prepared, the browser accepting the extension, and behavior being tested.
It also explained the checksum's scope (consistency with the published checksum,
not a separate publisher signature), permissions, upstream attribution, and
compatibility limits.

This is **one successful agent-consumption and dry-run sample (1/1)**. It does
not establish organic search discovery, global Skill installation, persisted
extension preparation, a new browser installation, or behavior verification in
this run. No global Skill or browser profile was changed; temporary public-file
downloads were the only requested file changes.
