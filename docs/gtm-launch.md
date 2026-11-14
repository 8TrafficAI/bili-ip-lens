# Bili IP Lens launch brief

Updated: 2026-11-15 · Release: v0.1.1

This document records the launch position, prepared copy, and a manual seven-day measurement plan. Prepared copy is not proof of publication; actual publication URLs and outcomes must be entered after execution.

## Product and audience

Bili IP Lens displays Bilibili's existing comment IP-region string in the desktop web interface. It is a focused, free, MIT-licensed MV3 extension with an instant persistent toggle.

Primary audience: Chinese-speaking Bilibili desktop viewers who want comment region information and an obvious way to turn it on or off.

Primary promise: **在 B站网页版评论旁显示平台已有的 IP 属地，工具栏一键开关。**

The modern integration is adapted from [MaxChang3/BiliReveal](https://github.com/maxchang3/BiliReveal). Credit the upstream; do not present the underlying idea as new.

## Conversion path

Search or social post → [product page](https://8trafficai.github.io/bili-ip-lens/) → [v0.1.1 download](https://github.com/8TrafficAI/bili-ip-lens/releases/download/v0.1.1/bili-ip-lens-0.1.1.zip) → extract → load unpacked folder → refresh Bilibili → test the switch.

The release ZIP contains manifest.json at its root. A source checkout uses extension/. This distinction belongs in every detailed installation guide.

## Channel scope

- GitHub: public source, release asset, release notes, issue forms, and repository metadata.
- Tampermonkey / Greasy Fork: a separate userscript distribution; report the actual source URL and marketplace status.
- Chrome Web Store: submit the MV3 extension; report submission and review states accurately, with a listing link only when available.
- Product page: public indexable explanation, installation, scope, privacy, and FAQs.
- X: concise maker disclosure and a working install link.
- Zhihu: a useful explanatory article with install steps, boundaries, and source credit.
- **LinkedIn: excluded by the user's instruction.**

Publication status must be verified per destination. Do not equate a submitted form, saved draft, or visible logged-in preview with public delivery.

## Search intent and page mapping

| Intent | Natural query examples | Destination and answer |
| --- | --- | --- |
| Find a tool | B站评论IP属地插件；Chrome B站IP属地 | Product page: what it does, download, price, permission |
| Solve a task | B站网页版怎么显示IP属地 | Install guide: exact ZIP and unpacked-folder steps |
| Diagnose missing data | B站评论为什么不显示IP属地 | FAQ: missing field, unsupported component, initial refresh |
| Understand privacy | B站IP属地插件会上传数据吗 | Privacy page and source: local display, no extension network request |
| Check limits | B站直播弹幕能看IP属地吗 | FAQ: not supported; do not imply full-IP or live-chat access |
| Understand upstream | Bili IP Lens BiliReveal 区别 | README: adapted integration plus MV3 packaging and user controls |
| English discovery | Bilibili IP location extension | English README / product explanation |

These are qualitative search intents, not measured search volumes. Do not invent traffic forecasts or keyword difficulty.

## SEO / AEO / GEO execution

- Use consistent product naming, version, owner, support scope, pricing, and upstream credit.
- Publish substantive text in static HTML so a reader or crawler can use it without a client-side app.
- Give installation and FAQ questions direct, factual answers.
- Use a descriptive title, meta description, canonical URL, meaningful headings, accessible links, and an appropriate sitemap.
- Structured product facts may describe a free browser extension; do not add fabricated ratings, reviews, download counts, or awards.
- Any llms.txt is an additional navigation aid. It is not a requirement for Google AI features or a promise of citations.
- Keep compatibility claims tied to the actual validation record.
- Search indexing, ranking, and AI citation results remain unmeasured until checked after publication.

## X launch copy — published

> 做了个小插件 Bili IP Lens：给 B站网页版评论显示已有的 IP 属地，一键开关。
>
> 免费开源，不额外查询 IP、不上传数据，也不带 SC 功能。评论接入改编自 BiliReveal（MIT）。
>
> 下载 Chrome 扩展 / 油猴脚本：
> https://8trafficai.github.io/bili-ip-lens/


If a follow-up is useful:

> 它只展示 B站评论里已有的地区信息，不是查完整 IP，也不支持直播实时弹幕属地。现代评论接入改编自 BiliReveal，MIT 署名和源码都保留了：https://github.com/8TrafficAI/bili-ip-lens

Use the publisher's real maker identity; do not describe the product as an independent recommendation.

## Zhihu article — published

### Title

B站网页版怎么显示评论 IP 属地？一个可开关的开源小工具

### Body

我们在 8Traffic 做了一个小工具，叫 Bili IP Lens。用途很具体：在 B站网页版评论时间旁，显示平台已经提供的 IP 属地，再给它加一个随时可以关闭的开关。下面是开发者自己的功能与安装说明。

它显示的是什么？

它读取的是 B站为某条评论提供的地区字符串，不是完整 IP 地址，也不是精确定位。没有该字段的评论会保持原样，不会猜一个地区填上去。现代评论接入方式改编自 MaxChang3 的 BiliReveal，MIT 版权与许可完整保留。

做这个版本的起点，是想把评论属地功能单独留下来。Bili IP Lens 只处理评论属地，不带 Super Chat 卡片或其他直播叠层。工具栏显示 ON / OFF；点击图标，可以在弹窗里切换。已经加载的评论会即时变化，切换时不需要刷新整页。

怎么安装 Chrome 扩展？

目前通过 GitHub 发行版分发，Chrome Web Store 还没有审核上线。

1. 从产品页下载发行版 ZIP，完整解压到固定文件夹。
2. 打开 chrome://extensions，开启开发者模式。
3. 点击“加载已解压的扩展程序”，选择直接包含 manifest.json 的解压文件夹。
4. 固定插件图标，刷新已经打开的 B站页面。
5. 展开视频评论区，试一下“显示 IP 属地”开关。

如果克隆的是源码仓库，第 3 步选择仓库里的 extension 子目录。发行版 ZIP 根目录与源码目录的层级不同，这是最容易选错的地方。

油猴版也已发布

已安装 Tampermonkey 等用户脚本管理器的用户，可以直接到 Greasy Fork 点击“安装此脚本”：
https://greasyfork.org/zh-CN/scripts/605536

油猴版从脚本管理器的 Bili IP Lens 菜单切换，不使用扩展版的工具栏弹窗。建议扩展版和油猴版二选一。脚本已完成 Node VM 行为测试；真实 Tampermonkey 的安装与注入仍在补充验收，发布本身不等于所有环境都已验证。

哪些场景验证过？

我们在 ego-browser 中检查了新版视频主评论、楼中楼、评论排序、展开回复、刷新和开关持久化。一次本地记录里，35 条带地区字段的主评论与回复均显示对应标签。v0.1.1 也修正了真实工具栏弹窗被挤窄的问题，并重新检查了尺寸和状态。

动态和个人空间使用同款新版评论组件时，是当前实现的接入目标，但尚未逐场景完成完整手工验收。历史 Vue 评论界面暂不支持。直播实时弹幕的 IP 属地也不在支持范围内；本工具不能替你关闭其他扩展添加的 SC 卡片。

隐私与权限

Chrome 扩展只声明 storage 权限来保存开关，内容脚本匹配 www、t、space 三个 B站域名。扩展没有新增接口请求、服务器、遥测或第三方 IP 查询，不上传评论或浏览数据。B站网页自身的网络活动仍由 B站决定。

也可以让 AI Agent 协助安装

我们提供了能让编码 Agent 理解安装流程的 Skill。在目标项目中运行：

npx skills add 8TrafficAI/bili-ip-lens --skill bili-ip-lens

随后告诉有终端与浏览器工具的 Agent：“安装 Bili IP Lens 并验证 IP 属地开关。”它可以校验公开发行包、准备文件，并通过正常浏览器界面加载和验证。普通聊天窗口不会因此自动获得操作电脑的能力，浏览器必要确认也仍需完成。

AI 安装教程：https://8trafficai.github.io/bili-ip-lens/agent-install/

来源与反馈

项目免费，采用 MIT License，与哔哩哔哩没有官方隶属关系。现代评论接入改编自 BiliReveal，我们在此基础上增加了独立 MV3 包装、即时开关、工具栏状态和生命周期处理。

上游项目：https://github.com/maxchang3/BiliReveal
产品页与安装教程：https://8trafficai.github.io/bili-ip-lens/
源码与问题反馈：https://github.com/8TrafficAI/bili-ip-lens

这篇说明使用 AI 协助整理；功能、来源和测试范围以公开源码与验证记录为准。

## Publication log

| Destination | Status | Public URL | Verification |
| --- | --- | --- | --- |
| GitHub repository | Public | https://github.com/8TrafficAI/bili-ip-lens | Anonymous public source access checked |
| GitHub release v0.1.1 | Published | https://github.com/8TrafficAI/bili-ip-lens/releases/tag/v0.1.1 | Anonymous ZIP SHA-256 matched local artifact |
| Repository userscript | Public | https://raw.githubusercontent.com/8TrafficAI/bili-ip-lens/main/userscript/bili-ip-lens.user.js | Anonymous source HTTP 200 |
| Greasy Fork | Published | https://greasyfork.org/zh-CN/scripts/605536 | Public script detail and install link read back in browser; raw urllib request was denied HTTP 403, not evidence of an unpublished script |
| Chrome Web Store | Publisher verification in progress; package not yet uploaded | — | Business/trader declaration agreed by owner; organization identity/profile verification still required. No listing or review submission yet. |
| Product page | Deployed | https://8trafficai.github.io/bili-ip-lens/ | Six canonical pages passed static checks; homepage inspected at desktop and 390px mobile with no horizontal overflow |
| Agent Skill | Public and remotely discoverable | https://8trafficai.github.io/bili-ip-lens/agent-install/ | Skills CLI public repository list found one named skill; WorkBuddy independently read the Skill and executed the helper dry-run successfully. Browser installation is separate |
| X | Published | https://x.com/handi_xie/status/2121706874768957664 | Own post body and image read back at resulting status URL |
| Zhihu | Published | https://zhuanlan.zhihu.com/p/2105162590800311760 | “发布成功”, article title/body and five destination links read back; native AI-assisted creation declaration selected. Anonymous urllib fetch returned HTTP 403, so anonymous readability is not independently established. |
| LinkedIn | Excluded | — | User instruction |

## Indexing and AI retrieval execution

- Google Search Console URL-prefix property ownership verified for the project URL via an HTML meta tag. Sitemap submission was accepted, but the initial table reports “无法抓取” with zero discovered pages; investigation remains open. Verification and submission are not proof of indexing.
- IndexNow returned HTTP 202 for the first five URLs; the later six-page submission returned HTTP 200. Acknowledgement means accepted for processing, not index inclusion.
- [AI retrieval baseline](geo-baseline-2026-11-15.md) separates natural discovery from supplied-URL content reading, and completed answers from transport/authentication failures.
- [Engine playbook](geo-engine-playbook.md) describes official crawler/search paths and the limits of llms.txt and direct consumer chat prompting.
- Public static Skill mirrors preserve the exact source bytes. CI checks them against the repository originals, so crawlers that cannot render GitHub can read the same instructions.


## Seven-day manual measurement

No automation or scheduled posting is created by this plan.

| When | Action | Record |
| --- | --- | --- |
| Launch day | Verify all published destinations and the download path | URL, version, date, HTTP / visibility result |
| Launch day | Establish repository and release baseline | Actual GitHub traffic and asset downloads; use “unavailable” where access is absent |
| Day 1 | Read install-related issues and social replies | Repeated friction, browser / version, reproducible reports |
| Day 3 | Check branded and task search queries | Engine, query, result URL, date; distinguish not indexed from not checked |
| Day 3 | Check a small set of AI-search task queries | Engine, prompt, date, cited URLs; do not treat one answer as a stable rate |
| Day 7 | Review adoption and documentation friction | Actual download change, public issues, useful feedback, next specific fix |

For a repeatable AI-visibility check, use the same small query set and record every run:

- B站网页版怎么显示评论 IP 属地？
- 有没有可以开关的 B站 IP 属地 Chrome 插件？
- Bili IP Lens 能查看完整 IP 地址吗？
- Bili IP Lens 和 BiliReveal 是什么关系？

Do not fabricate results, count self-authored posts as independent reviews, or claim that a sitemap, schema, or llms.txt guarantees indexing or recommendations.

## Repository measurement snapshot · 2026-11-15

GitHub traffic API reported 0 views / 0 unique viewers and 0 clones / 0 unique cloners at the snapshot. Release asset counters were ZIP 4, userscript 1, checksum 3. These counts include launch validation and agent dry-run activity; they do not establish external adoption or distinct users. Traffic statistics may lag.
