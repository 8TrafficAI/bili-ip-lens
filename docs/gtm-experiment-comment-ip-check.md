# B站评论属地排查 · 首轮获客实验

2026-11-24 开始。首轮周检在四个渠道筛了 28 条候选，只找到一个适合补充安装方案的知乎旧问题。同一周，Greasy Fork 总安装计数从 1 到 8，原知乎文章阅读从 6 到 16。两组计数来自平台，来源归因尚无证据。[周检记录](gtm-weekly-2026-11-24.md)

这轮把「电脑评论没属地」「装了仍不显示」「只有几条有」做成可直达的排查路径。读者能看到原因、用曾验证的视频重测，再根据浏览器选择商店版或油猴版。每个症状有独立的链接。带着具体问题来的读者可以直接看到答案和下一步。[属地排查](https://8trafficai.github.io/bili-ip-lens/check/)

| 分发面 | 放置入口 | 观察指标 |
| --- | --- | --- |
| 项目首页、安装指南、FAQ | 按症状排查，附本地验证记录 | Chrome 商店的 `product_site` 来源访问 |
| GitHub README、发行说明 | 把排查步骤放到下载入口附近 | Chrome 商店的 `github` 来源访问 |
| 知乎现有产品文章 | 更新商店安装步骤，添加排查链接 | 文章阅读、具体反馈、商店的 `zhihu` 来源访问 |
| 针对明确需求的后续回答 | 按问题给出相关症状链接，披露维护者身份 | 已发布链接、追问、报告的验证结果 |

所有商店跳转使用同一活动标签 `comment_ip_check`。渠道标签只含固定名称，排查页本身没有分析脚本。Chrome 商店后台开放后，对比各来源的页面访问及同期安装、卸载总量。安装统计与来源访问分别读，只有平台确实给出渠道级安装才按渠道归因。[Chrome 商店来源统计](https://developer.chrome.com/blog/cws-analytics-revamp#intentional-and-useful-data-consolidated-and-upfront) · [Chrome 商店指标](https://developer.chrome.com/docs/webstore/metrics)

从上线起观察两个周周期。先复查新页面可达性，已发布链接和来源参数是否保留，再记录可读的来源访问和真实求助。后台需要登录时，仍检查知乎阅读、Greasy Fork 安装计数和公开问题，来源数据记为不可用。发现具体安装受阻，再改对应步骤。若有曝光但缺少明确求助，下一轮优先换问题词和内容入口，保留发布链接与反馈凭据。

## 首轮上线回执

2026-11-24，排查页及官网链接通过 GitHub Pages 发布。桌面和窄屏验证了症状展开与直接链接。实际点进 Chrome 商店后，`github` 来源和 `comment_ip_check` 活动标签仍在。测试人员打开的商店页计入自测。站点和镜像完整性检查通过。[站点部署](https://github.com/8TrafficAI/bili-ip-lens/actions/runs/45322409844) · [仓库检查](https://github.com/8TrafficAI/bili-ip-lens/actions/runs/45322409930)

发行说明和知乎原文均已更新并回读。知乎文章原篇幅和安装备用步骤保留，过时的商店状态已纠正。IndexNow 对新增排查页及四个修改页面返回 HTTP 200，收录状态待查。商店后台要求重新验证，当前来源和安装明细不可读。[发行说明](https://github.com/8TrafficAI/bili-ip-lens/releases/tag/v0.1.1) · [知乎原文](https://zhuanlan.zhihu.com/p/2105162590800311760)
