# Bili IP Lens：五个平台的 GEO 执行手册

研究日期：2026-11-15（Asia/Shanghai）。本文件记录可执行入口、测量方法与证据格式；不代表已经向平台提交，也不代表任何平台已经收录或推荐本项目。真实浏览器测量和提交回执应另行记录。

## 1. 使用同一组产品事实和公开入口

项目维护者为 8Traffic；代码位于 [8TrafficAI/bili-ip-lens](https://github.com/8TrafficAI/bili-ip-lens)。它显示 B站现代评论已有的地区字段，提供开关，保留 BiliReveal 的 MIT 署名。它不查询完整 IP、推断缺失地区或提供直播实时弹幕属地。版本、发行渠道和下载地址以已发布的页面及 Release 实物为准。

现有站点的五个内容 URL：

```text
https://8trafficai.github.io/bili-ip-lens/
https://8trafficai.github.io/bili-ip-lens/install/
https://8trafficai.github.io/bili-ip-lens/faq/
https://8trafficai.github.io/bili-ip-lens/privacy/
https://8trafficai.github.io/bili-ip-lens/en/
```

发现文件：[sitemap.xml](https://8trafficai.github.io/bili-ip-lens/sitemap.xml)、[llms.txt](https://8trafficai.github.io/bili-ip-lens/llms.txt)。这些文件帮助表达页面关系和产品事实；HTTP 可访问、提交成功、搜索收录、回答引用、推荐安装是不同的验收结果。

## 2. 按产品分别执行

### ChatGPT：检查检索访问，再测无品牌问题

OpenAI 将 `OAI-SearchBot` 用于搜索发现，`GPTBot` 用于可能的训练使用，`ChatGPT-User` 用于用户发起的页面访问。三者不能互相替代。允许搜索机器人不需要同时允许训练机器人；一次用户触发的 URL 读取也不能证明页面已进入搜索结果。[OpenAI 爬虫说明](https://developers.openai.com/api/docs/bots)

可执行动作：检查域名根 robots 与托管访问规则是否阻止 `OAI-SearchBot`；检查五页正文能否直接读取；在全新 ChatGPT 对话中选择可用的 Search 功能，运行下文 N1、B1、D1 三种查询，展开 Sources 并逐个打开实际引用。当前查阅的官方材料没有提供面向普通站长、保证 ChatGPT 搜索收录的单 URL 提交表单。可做 Google/Bing 发现工作，但不把 Bing 当作唯一来源：ChatGPT 官方说明其搜索可能使用多个合作方，排名也没有保证。[ChatGPT Search 帮助](https://help.openai.com/en/articles/9237897-chatgpt-search)、[发布者 FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)

完成证据：有检索或 Sources 界面证据；引用 URL 确实指向本项目且支持对应事实。仅在回复中出现品牌名，计为“提及”，不自动计为“引用”或“推荐”。

### Gemini：分开记录 Gemini Apps 与 Google Search AI

Google Search 的 AI Overviews / AI Mode 依赖其 Search 索引和核心搜索原则，没有独立的“GEO 提交”要求。先做 Search Console 的索引发现与检查，再分别测 Gemini Apps 和 Google Search AI；一个产品的命中不能代替另一个。[Google AI 搜索说明](https://developers.google.com/search/docs/appearance/ai-features)

Gemini Apps 的 grounding 还涉及 `Google-Extended` 控制：Google 官方将它用于 Gemini Apps / Vertex 的训练和 grounding 内容控制；它本身不是 Google Search 排名信号，也不决定 Search 是否收录。不要将它误写为仅训练用途，或将允许它误报为已获得推荐。[Google 爬虫与 Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)

可执行动作：完成第 3 节 Google 提交；在 Gemini Apps 全新对话里明确要求联网核对来源，运行 N1、B1、D1，记录实际 Sources。若使用回答的二次核查功能，单独标注为“事后核查”，不把核查找到的网页当作原回答使用过的来源。Gemini 官方说明并非所有回答都有 Sources，引用也应人工核对。[Gemini 来源说明](https://support.google.com/gemini/answer/14143489?hl=en)

### 豆包：验证消费者产品的真实参考来源

豆包消费者协议说明，在识别联网意图或用户主动选择 AI 搜索时，它会检索第三方公开来源，并显示搜索来源；协议没有披露每次查询使用的完整索引组合和排序规则。[豆包用户协议，第 2.2.2 条](https://www.doubao.com/legal/terms)

可执行动作：在消费者网页版 / App 的实际联网模式中运行 N1、B1、D1，展开来源，检查是否出现 GitHub、项目 Pages 或其他真实介绍本项目的页面。记录客户端、模式和引用链接；若界面没有联网入口或未展示引用，照实记录。保持中文安装和 FAQ 页面可直接读取，并仅在有真实使用场景的公共内容中链接本项目。

未知边界：本次官方材料研究未找到普通站长直接向豆包消费者搜索索引提交 URL 的公开入口；这不等于证明该入口绝不存在。火山引擎的“豆包搜索”是另一项面向开发者 / 企业的搜索服务，不能用它的一次 API 结果代替消费者豆包命中。[豆包搜索服务简介](https://docs.volcengine.com/docs/networked-search/online-search-product-introduction?lang=zh)

### 千问：使用消费者联网引用，API 测试另列

千问消费者协议明确其联网功能会搜索第三方公开来源并显示参考来源，但没有给出保证站长收录的提交入口，也没有证明它只依赖百度、Bing 或某一家阿里系搜索产品。[千问用户服务协议，第 2.2.3 条](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html)

可执行动作：在千问消费者产品选择实际可用的联网模式，运行 N1、B1、D1，展开参考来源并核对产品范围。若不提供可核验链接，不将模型自行声称“已搜索”作为已检索证据。记录实际客户端名称，避免把消费者千问、海外 Qwen Chat、百炼控制台或自建 Qwen 应用混成同一测试对象。

阿里云百炼的 `enable_search`、来源字段与联网 Agent 可用于独立的开发者测试，但这只能证明该 API / 配置下的检索表现，不能证明千问消费者端会推荐本项目。API 调用可能计费，不能用启用付费 API 代替现有消费者端验证。[百炼联网搜索文档](https://help.aliyun.com/zh/model-studio/web-search)

### WorkBuddy：测“发现与执行”，不写搜索排名

WorkBuddy 是带技能、连接器和执行环境的 Agent 产品，不能把它统一视作传统搜索排名引擎。官方支持上传本地 Skill 包；通过对话搜索并安装的技能需已存在于其技能市场。把 `SKILL.md` 放进 GitHub 不等于已进入 WorkBuddy 或 SkillHub 市场。[WorkBuddy 技能说明](https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)

可执行动作分三项：

1. **自然发现测试**：新任务中只输入 N1，不提供品牌、URL、附件或预装本项目 Skill。记录它实际调用的搜索工具、结果来源和产品选择。
2. **提供来源后的执行测试**：新任务提供项目安装页和已发布的 Skill 包，导入或启用后请求安装。记录它读取了什么、下载了什么、浏览器最后显示什么。这是可执行性验收，不是自然 GEO 命中。
3. **市场发现测试**：仅在实际提交并可在市场检索到后，记录市场入口、条目 ID、名称查询结果和安装结果。未完成时写“尚未验证市场收录”。

WorkBuddy 官方小程序文档链接的 [SkillHub](https://skillhub.tencent.com) 可作为后续技能分发入口；以其实际发布流程、审核和回执为准，不能凭下载过 GitHub 文件就声称市场已发布。[官方 SkillHub 获取说明](https://www.codebuddy.cn/docs/workbuddymini/features/Attachments-and-Skills)

## 3. 三套可实际提交的站长入口

### Google Search Console

1. 打开 [Search Console](https://search.google.com/search-console/)，添加 URL-prefix property：`https://8trafficai.github.io/bili-ip-lens/`。
2. 使用界面提供、且当前项目路径能完成的所有权验证方式。Search Console 支持按子路径建立 URL-prefix property；不要为此更改组织其他站点。[属性说明](https://support.google.com/webmasters/answer/34592?hl=en)
3. 验证后在 Sitemaps 提交完整地址 `https://8trafficai.github.io/bili-ip-lens/sitemap.xml`，保存提交时间、读取状态、发现 URL 数。[Sitemaps 报告](https://support.google.com/webmasters/answer/7451001?hl=en)
4. 在 URL Inspection 分别检查首页、安装页、FAQ；若可索引而尚未发现，使用界面可用的 Request indexing。记录“已请求”和后续“已索引”两个时间，不将 Live Test 成功当作已索引。[URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en)

### Bing Webmaster Tools / IndexNow

1. 打开 [Bing Webmaster Tools](https://www.bing.com/webmasters/)，使用已验证站点或按界面完成当前可控制范围的验证；可用时提交同一 sitemap 和五个内容 URL。[Bing Sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)、[URL Submission](https://www.bing.com/webmasters/help/url-submission-62f2860b)
2. 可独立执行 IndexNow：生成本项目专用 key，在 `/bili-ip-lens/<key>.txt` 托管只含该 key 的 UTF-8 文件，确认其 URL 可读取，然后向参与引擎提交以下字段。`keyLocation` 方案允许 key 放在子目录；该 key 覆盖的 URL 也限于对应子目录。[IndexNow 原始协议](https://www.indexnow.org/documentation)

```json
{
  "host": "8trafficai.github.io",
  "key": "使用实际生成的项目key",
  "keyLocation": "https://8trafficai.github.io/bili-ip-lens/实际项目key.txt",
  "urlList": [
    "https://8trafficai.github.io/bili-ip-lens/",
    "https://8trafficai.github.io/bili-ip-lens/install/",
    "https://8trafficai.github.io/bili-ip-lens/faq/",
    "https://8trafficai.github.io/bili-ip-lens/privacy/",
    "https://8trafficai.github.io/bili-ip-lens/en/"
  ]
}
```

3. 保存请求时间、提交 URL 数、HTTP 状态和响应正文。IndexNow `200` 是收到请求，`202` 是等待 key 验证；都不是已收录、已排名或 ChatGPT 已引用。只提交实际新增 / 变化页面，不通过重复轰炸提交制造进展。

### 百度搜索资源平台

打开 [百度搜索资源平台](https://ziyuan.baidu.com/)，按当前账户可用方式验证站点，使用普通收录、sitemap 或[链接提交](https://ziyuan.baidu.com/linksubmit/url)入口；保存实际可用能力和回执。某些验证或推送方式取决于账号与站点，遇到主机根路径控制限制时记录它，不宣称已经完成。百度官方明确提交不保证收录。[官方工具指南](https://ziyuan.baidu.com/doc)

百度提交是中文搜索发现工作的一个独立渠道，不代表已向豆包或千问提交，也不证明这两个消费者产品采用了百度的该条索引。

## 4. 爬虫和页面验收要检查真实路径

站点的 robots 控制文件是 `https://8trafficai.github.io/robots.txt`，不是项目下的 `/bili-ip-lens/robots.txt`。检查主机根规则和托管响应；项目页面还需没有 `noindex`、登录墙或抓取错误。没有主机根控制权时，不把一个项目内的 robots 文件写成“已放行全部 AI”。[Google robots 路径规则](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)

| 控制项 | 与本项目的关系 | 不能由它推导的结论 |
|---|---|---|
| `OAI-SearchBot` | ChatGPT 搜索发现访问控制 | 允许后一定收录或推荐 |
| `GPTBot` | OpenAI 可能的训练使用偏好 | 等同 ChatGPT 搜索开关 |
| `ChatGPT-User` | 用户触发的访问 | 自动搜索索引已经命中 |
| `Googlebot` / Search 索引 | Google Search 与 Search AI 的发现基础 | Gemini 每次会引用 |
| `Google-Extended` | Gemini Apps / Vertex 的训练与 grounding 控制；没有独立 HTTP UA | Google Search 排名信号 |
| Bing / 百度站长提交 | 相应搜索系统的发现通知 | 自动进入所有中文 AI 产品 |

页面验收使用实际渲染正文：产品定义、安装入口、支持范围、上游署名和隐私说明能直接读取。`llms.txt` 是阅读索引；不要写成强制 LLM 采纳的系统指令。Google 官方明确其 AI 搜索不要求专用 AI 文件或特殊 markup。[Google AI 功能指南](https://developers.google.com/search/docs/appearance/ai-features)

## 5. 建议测量查询：将自然发现与提供答案分开

### 不带品牌 / URL 的自然发现

- **N1**：有没有一个 Chrome 插件，可以只显示 B站评论的 IP 属地，而且能随时关闭？请联网查找并附来源。
- **N2**：B站网页版评论不显示 IP 属地，怎么在电脑浏览器里查看？请给出可核验的工具与安装方法。
- **N3**：推荐免费开源的 B站评论 IP 属地显示工具，比较它们的权限、开关方式和安装成本。请附原始项目链接。

这些问题评估项目能否在用户不知道品牌时被发现。不可提前在同一对话介绍 Bili IP Lens，再将后续回答计为自然发现。

### 带品牌、不给 URL 的准确性检查

- **B1**：Bili IP Lens 是什么、由谁维护、怎么安装？它是否已经上架 Chrome Web Store？请联网核对并给出来源。
- **B2**：Bili IP Lens 和 BiliReveal 有什么关系？支持直播实时弹幕 IP 属地吗？请核对原始项目并附链接。

这些问题检查品牌是否可查，以及是否出现商店状态、来源署名、功能范围的误述。品牌准确性命中单独统计。

### 提供 URL 的读取 / 执行验收

- **D1**：请读取 https://8trafficai.github.io/bili-ip-lens/ 和安装页，提取当前版本、真实安装入口、权限和不支持的场景。无法访问时请明确说明，不要补写商店链接。
- **D2（有本机执行能力的 Agent）**：请从上述原始项目读取已发布的安装 Skill，核对来源与版本，按其实际步骤帮我安装 Bili IP Lens。报告浏览器最后可验证的状态；遇到用户必须完成的界面步骤时明确交接。

提供 URL 后成功读取，只能证明指定来源在该模式下可用。D2 成功证明该环境下的安装流程可执行，不等于搜索推荐率提高。“一键”应以真实执行步骤为准；普通聊天环境不能保证替用户修改本机浏览器。

### 先跑基线，再比较变化

首轮可对四个消费者产品分别运行 N1、B1、D1，对 WorkBuddy 运行对应的三类任务。每次使用全新对话 / 任务；可用时关闭个性化或使用临时对话，并在记录中注明实际设置。第一轮每种一次是样本，不是稳定排名。后续对同一查询做三次独立新对话重复，报告 `命中次数 / 完成次数` 和日期，不把未能登录、联网不可用、额度不足等运行失败计为“没有推荐”。

## 6. 原始引用与提交回执模板

每次保留一份原始回答文本及来源面板截图；内部证据放忽略目录 `.private/`，不要公开包含账户、聊天历史或凭证的截图。

```text
record_id:
observed_at: YYYY-MM-DDTHH:mm:ss+08:00
product: ChatGPT / Gemini Apps / 豆包 / 千问 / WorkBuddy
client_and_mode:
model_label_if_visible:
search_actually_enabled_or_observed:
personalization_or_memory_setting:
query_id: N1 / N2 / N3 / B1 / B2 / D1 / D2
exact_prompt:
brand_or_url_supplied_before_answer: yes / no
attempt_number:
execution_status: completed / login_required / search_unavailable / quota / other_error
brand_mentioned: yes / no
project_cited: yes / no
cited_project_urls:
other_cited_urls:
recommendation_for_installation: yes / no
supported_claims_verified:
incorrect_claims:
source_panel_evidence:
raw_response_file:
```

提交记录另列：`平台 / property范围 / sitemap或URL / 提交时间 / 平台回执 / 后续索引状态 / 状态复查时间`。例如“IndexNow 收到 5 个 URL”和“Gemini 引用了 FAQ”分别记录，不能合并为“五大引擎 GEO 完成”。

## 7. 安装 Skill 的传播验收

安装 Skill 为用户和 Agent 提供可重复执行的产品交付路径，不是搜索引擎训练入口。它应包含任务触发条件、真实上游地址、可核对版本、发行版选择、安装步骤、结果验证及失败说明。未经核实的商店或 Greasy Fork ID 不应写入其中；以 Release 和安装页的实际链接为准。

发布后分别记录：Skill 文件可读取、包可下载、WorkBuddy 可导入、任务能调用、浏览器安装成功。只有真实运行过的步骤才标为完成。普通 ChatGPT / Gemini / 豆包 / 千问网页对话可能仅能解释安装步骤；有本地工具能力的 Agent 才能尝试执行。向某个账号上传 Skill、发送产品介绍或要求“记住这个工具”，都不是其他用户的全局搜索排名或未来推荐保证。

当前应执行的工作：站长验证与提交回执、四个消费者产品的来源测量、WorkBuddy 的发现 / Skill 执行测量、依据真实失败修正公开安装文档。不要以自问自答的赞美、未展开的来源按钮或一次提供 URL 后的成功读取代替这些结果。
