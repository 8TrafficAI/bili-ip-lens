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

## X launch copy — prepared, not yet a publication record

> 做了个小插件 Bili IP Lens：在 B站网页版评论旁显示平台已有的 IP 属地，工具栏一键开关。
>
> 免费开源，不额外查询 IP，不带 SC 功能。已在 ego-browser 验证；暂未上架 Chrome 商店。
>
> 下载与安装：https://8trafficai.github.io/bili-ip-lens/

If a follow-up is useful:

> 它只展示 B站评论里已有的地区信息，不是查完整 IP，也不支持直播实时弹幕属地。现代评论接入改编自 BiliReveal，MIT 署名和源码都保留了：https://github.com/8TrafficAI/bili-ip-lens

Use the publisher's real maker identity; do not describe the product as an independent recommendation.

## Zhihu article — prepared, not yet a publication record

### Title

B站网页版怎么显示评论 IP 属地？我们做了一个可开关的开源扩展

### Body

我们做了一个小型浏览器扩展，叫 Bili IP Lens。用途很具体：把 B站已经放在评论数据里的 IP 属地，显示在评论时间旁边，再给它加一个随时可以关闭的开关。

它不是查 IP 的工具。你看到的是 B站为某条评论提供的地区字符串，不是完整 IP 地址，也不是精确定位。没有该字段的评论会保持原样，不会猜一个地区填上去。

做这个版本的起点，是想把评论属地功能单独留下来。Bili IP Lens 只处理评论属地，不附带 Super Chat 卡片或其他直播叠层。工具栏会显示 ON / OFF；点击图标，可以在弹窗里打开或关闭显示。已经加载的评论会即时变化，不需要为了切换开关刷新整页。

**怎么安装？**

目前通过 GitHub 分发，还没有上架 Chrome Web Store。

1. 下载发行版 ZIP，完整解压到固定文件夹。
2. 在地址栏打开 chrome://extensions，开启开发者模式。
3. 点击“加载已解压的扩展程序”，选择解压后直接含 manifest.json 的文件夹。
4. 把插件固定到工具栏，刷新已打开的 B站页面。
5. 打开视频评论区，试一下“显示 IP 属地”开关。

如果你克隆的是源码仓库，第 3 步应选择仓库里的 extension 文件夹。发行版 ZIP 和源码目录的层级不同，这是最容易选错的地方。

另有单独的油猴用户脚本版本，从脚本管理器的 Bili IP Lens 菜单切换，不使用扩展版的工具栏弹窗。该版本目前完成 Node VM 行为测试，真实 Tampermonkey 安装和注入仍待手工验收；Chrome 商店和 Greasy Fork 的实际上架状态应以发布记录为准。

**哪些场景验证过？**

我们在 ego-browser 里检查了现代视频主评论、楼中楼、评论排序、展开回复、页面刷新和开关持久化。v0.1.1 还修正了真实工具栏弹窗被挤窄的问题，并重新检查了关闭、重新打开后的尺寸和状态。

动态与个人空间使用同款现代评论组件时，是当前实现的接入目标，但这些页面还没有分别完成完整手工验收。历史 Vue 评论界面暂不支持。直播实时弹幕的 IP 属地也不在支持范围内。

**数据会发到哪里？**

扩展只声明 storage 权限，用来保存一个开关；脚本匹配三个 B站域名，在页面里读取已有的地区字段。扩展没有额外接口请求、服务器、遥测或第三方 IP 查询，不上传评论或浏览数据。B站网页本身的网络活动不属于扩展新增的请求。

**代码从哪里来？**

现代评论组件的接入方式改编自 MaxChang3 的 BiliReveal。原作者版权和 MIT 许可完整保留。Bili IP Lens 在这个基础上做了独立 MV3 包装、即时开关、工具栏状态、专用标签和生命周期处理。

项目是免费 MIT 开源的，也不是 B站官方产品。想试用、检查实现或反馈兼容性问题，可以从这里开始：

产品页与安装教程：https://8trafficai.github.io/bili-ip-lens/

源码与问题反馈：https://github.com/8TrafficAI/bili-ip-lens

## Publication log

| Destination | Status | Public URL | Verification |
| --- | --- | --- | --- |
| GitHub repository | Pending execution | To record after creation | Check anonymous public access |
| GitHub release v0.1.1 | Pending execution | To record after release | Check ZIP download and checksum |
| Repository userscript | Pending execution | To record after publication | Check raw source and script-manager install flow |
| Greasy Fork | Pending submission | To record after publication | Check public script page and install link |
| Chrome Web Store | Pending submission | To record after review | Distinguish submitted, under review, and publicly listed |
| Product page | Pending deployment | To record after deployment | Check HTTP response, canonical, links, mobile layout |
| X | Prepared copy | To record after publishing | Check resulting public post URL |
| Zhihu | Prepared copy | To record after publishing | Check resulting public article URL |
| LinkedIn | Excluded | — | User instruction |

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
