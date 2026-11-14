# Search indexing record · 2026-11-15

记录日期：2026-11-15。下列时间均为 **Asia/Shanghai（UTC+08:00）**。产品版本为 0.1.1。

**目前可以确认首页已被 Google 收录。** sitemap 的实时抓取测试也成功，但站点地图报表仍显示“无法抓取”、发现网页为 0。这三个观察并不冲突：单个首页的索引状态、实时访问 XML 文件、站点地图解析报表是不同检查。

| 对象 | 已观察状态 | 可得出的结论 | 不能推导的结论 |
| --- | --- | --- | --- |
| [产品首页](https://8trafficai.github.io/bili-ip-lens/) | GSC 索引视图显示“网址已收录到 Google / 网页已编入索引” | 该首页已进入 Google 索引 | 其余五页已收录、特定关键词排名、搜索流量或 AI 推荐 |
| [Agent 安装教程](https://8trafficai.github.io/bili-ip-lens/agent-install/) | 索引视图尚未识别 / 未索引；正常请求后显示“已请求编入索引，已将网址添加到优先抓取队列” | 该 URL 的索引请求已被接受 | 已被抓取或收录、保证何时收录 |
| [sitemap.xml](https://8trafficai.github.io/bili-ip-lens/sitemap.xml) 实时检查 | 05:23:38 允许抓取、抓取成功、允许编入索引 | Google 检查工具当时能访问该 XML URL | sitemap 已被解析、六个页面均被抓取或收录 |
| sitemap 提交报表 | 再次提交已接受；表中仍为“无法抓取”、0 个发现网页 | 提交动作完成，报表问题仍待后续确认 | 已解析成功或已发现六页 |
| IndexNow | 前次五 URL 请求为 HTTP 202，后次六 URL 请求为 HTTP 200 | 记录对应的提交回执 | Bing、Google 或任一 AI 产品已经收录或推荐 |

## 首页索引视图

发布操作人员在 Google Search Console 中检查的准确公开 URL 为：

`https://8trafficai.github.io/bili-ip-lens/`

- 状态：“网址已收录到 Google”“网页已编入索引”。这是已存在的索引视图，区别于“测试实际版本”的可抓取结果。
- 上次抓取：**2026-11-15 05:19:14**。
- 抓取工具：**Googlebot 智能手机版**。
- 是否允许抓取：是；网页抓取：成功；是否允许编入索引：是。
- 用户声明的规范网址：与上面首页 URL 完全相同。
- Google 选择的规范网址：所检查的网址。

这份记录支持一个页面的索引状态，不支持排名、曝光、点击、转化或自然 GEO 命中率的结论。后续索引状态可能改变，应保留每次检查的日期。[URL 检查工具说明](https://support.google.com/webmasters/answer/9012289)

## Agent 安装教程：请求已接受，尚未收录

同日，发布操作人员正常检查 `https://8trafficai.github.io/bili-ip-lens/agent-install/`。该 URL 当时尚未被 Google 识别 / 索引，随后点击正常“请求编入索引”，界面确认“已请求编入索引，已将网址添加到优先抓取队列”，没有遇到 CAPTCHA。本记录没有单独保存该步骤的精确秒级时间。

这只是请求被接受，不是已抓取或已收录。其他页面也不得从首页状态或这次请求推导为已收录。[请求抓取说明](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

## sitemap 抓取与报表的先后观察

1. 最初提交被接受，但站点地图列表显示“无法抓取”和 0 个发现网页。
2. 对同一准确 URL `https://8trafficai.github.io/bili-ip-lens/sitemap.xml` 执行 Google 的正常实时网址检查。**2026-11-15 05:23:38**，Google 检查工具智能手机版显示允许抓取、网页抓取成功、允许编入索引。
3. 随后正常重新提交一次，界面接受提交。报表仍显示“无法抓取”、0 个发现网页；本记录不将实时抓取成功写成 sitemap 解析成功。

Google 区分提交、抓取报表与页面索引；报表成功解析出的 URL 数也不保证这些 URL 已抓取或收录。抓取失败后 Google 会继续尝试数日，但没有保证完成时限。下一次应读取该 sitemap 的报表详情与“上次读取”结果，避免反复改名或密集提交。[Sitemaps 报表及排错说明](https://support.google.com/webmasters/answer/7451001?hl=en)

## 公开 HTTP 与本地诊断

2026-11-15 **05:27:24**，浏览器之外的普通 HTTP 检查得到：

- sitemap 原 URL 直接返回 **HTTP 200**，没有重定向；类型为 `application/xml`，723 字节，没有 `X-Robots-Tag`。
- 公开 XML 与本地 `site/sitemap.xml` 字节相同。SHA-256 为 `c8446a57105cdfc0383bb27541699f27b894abde096ca2e22c3631ba2a7f704d`。
- XML 使用 UTF-8、正确的 sitemap namespace，含六个唯一的绝对 URL，均在已验证的项目路径内。
- 本轮先前逐页 HTTP 检查中，六个页面均返回 200，canonical 指向自身，未发现 meta robots/noindex 或 `X-Robots-Tag`。本地静态检查的 canonical、sitemap、资源及链接检查通过。
- 主机根 `https://8trafficai.github.io/robots.txt` 返回 **404**。Google 将非 429 的 4xx robots 响应视为没有有效 robots 文件、没有对应抓取限制；项目子路径的 robots 文件不能代替主机根规则。[Google robots 规则](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)
- URL-prefix property 可以包含路径，因此 `/bili-ip-lens/` 子路径本身不是配置错误。[Google URL-prefix 属性定义](https://support.google.com/webmasters/answer/10432366)

普通 HTTP 请求及自报 Googlebot User-Agent 的请求不等于来自 Google 真实抓取网络的验证。本次另有上面的 Google 实时检查结果，因此可以单独记录 Google 检查工具的成功访问；仍不能从中推导站点地图解析已成功。

没有发现需要修改的网站实际错误，因此本轮没有为此改站点结构、添加空页、制造子路径 robots 或进行其他猜测性“修复”。当前证据不足以确定报表未更新的具体原因，也不将“可能延迟”写成已确诊原因。

## 证据与后续检查

首页和 sitemap 的私有、已登录控制台观察由发布操作人员保留在本地忽略目录，记录文件名为 `.private/gsc-home-indexed.json`、`.private/gsc-sitemap-live-test.json`。公开文档只摘录上述非敏感状态，不发布控制台 URL、账户或会话资料。这些记录是操作者观察，不是任何第三方对产品的背书。

后续分别检查 sitemap 报表是否成功解析、已请求的 Agent 安装教程及其余页面是否收录，以及实际 Search Console 效果数据。AI 搜索的自然发现和指定 URL 读取结果另见 [GEO 基线](geo-baseline-2026-11-15.md)；首页收录不代表这些测试已成功。相关发布状态见 [GTM 记录](gtm-launch.md)。
