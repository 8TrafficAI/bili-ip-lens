# Bili IP Lens · B站评论 IP 属地插件

在 B站网页版评论的时间旁，显示 **B站已经提供的 IP 属地**。工具栏一键开关，已加载的评论即时显示或隐藏。

[下载扩展 v0.1.1](https://github.com/8TrafficAI/bili-ip-lens/releases/download/v0.1.1/bili-ip-lens-0.1.1.zip) · [油猴脚本](https://raw.githubusercontent.com/8TrafficAI/bili-ip-lens/main/userscript/bili-ip-lens.user.js) · [产品页与安装教程](https://8trafficai.github.io/bili-ip-lens/) · [English](README.en.md) · [反馈问题](https://github.com/8TrafficAI/bili-ip-lens/issues/new/choose)

免费、MIT 开源、Manifest V3。当前通过 GitHub 分发，**尚未上架 Chrome Web Store**。

## 如何安装

### 下载发行版 ZIP

1. 下载 [bili-ip-lens-0.1.1.zip](https://github.com/8TrafficAI/bili-ip-lens/releases/download/v0.1.1/bili-ip-lens-0.1.1.zip)，完整解压到一个固定文件夹。
2. 在 Chrome / Chromium 地址栏打开 `chrome://extensions`，开启「开发者模式」。
3. 点击「加载已解压的扩展程序」，选择**解压后直接包含 `manifest.json` 的文件夹**。
4. 将 Bili IP Lens 固定到工具栏，刷新已打开的 B站页面。
5. 打开视频评论区，点击扩展图标，使用「显示 IP 属地」开关。

发行版 ZIP 的根目录就是扩展目录；不要另找一个 `extension/` 子文件夹。

### 从源码安装

克隆或下载本仓库后，在第 3 步选择仓库中的 **`extension/` 文件夹**。

首次安装或更新扩展后，需要刷新已经打开的 B站页面。之后切换弹窗开关无需刷新；设置保存在当前浏览器本地。更新时替换原文件夹中的文件，在扩展管理页点击「重新加载」，再刷新 B站页面。

### Tampermonkey / 油猴用户脚本

已使用 Tampermonkey 的用户可以打开[仓库中的用户脚本](https://raw.githubusercontent.com/8TrafficAI/bili-ip-lens/main/userscript/bili-ip-lens.user.js)，通过脚本管理器安装。安装后，从脚本管理器图标下的 Bili IP Lens 菜单开启或关闭显示；用户脚本没有独立的 Chrome 工具栏弹窗。扩展版与用户脚本版建议二选一。

用户脚本目前完成了 Node VM 行为测试，真实 Tampermonkey 安装、注入与管理器兼容性仍待手工验收。[用户脚本说明](userscript/README.md)

Greasy Fork 和 Chrome Web Store 的上架链接将在实际发布后补充。现有 GitHub 下载入口不代表通过了任一商店审核。

## 能做什么

- 在现代 B站评论组件的时间旁显示地区文字。
- 覆盖主评论和楼中楼，随评论渲染更新。
- 工具栏显示 ON / OFF，弹窗提供即时开关。
- 关闭后移除本扩展添加的标签，保留原有评论内容。
- B站已显示原生属地时避免重复添加。
- 不附带 Super Chat 卡片或其他直播叠层。

## 支持范围与验证

| 场景 | v0.1.1 状态 |
| --- | --- |
| B站视频页的现代 Lit 主评论、楼中楼 | 已在 ego-browser 实测 |
| 评论排序、展开回复、页面刷新、开关持久化 | 已实测 |
| 真正的工具栏弹窗尺寸、关闭后重新打开 | 已实测，v0.1.1 修复 |
| 动态与个人空间中的同款现代评论组件 | 接入目标相同，尚未完成各页面的手工验收 |
| 未携带属地数据的评论、部分历史评论 | 保持原样，不猜测地区 |
| 历史 Vue 评论界面 | 暂不支持 |
| 直播实时弹幕的 IP 属地 | 不支持 |

扩展匹配 `www.bilibili.com`、`t.bilibili.com`、`space.bilibili.com` 三个域名。面向 Chrome / Chromium 111+；实际浏览器验收目前在 ego-browser 完成，其他浏览器仍欢迎反馈。

B站的数据字段或页面组件更新可能影响可用性。测试记录见 [validation](docs/validation-2026-11-15.md)。

## 隐私与权限

扩展仅声明 `storage` 权限，用来保存 `enabled` 布尔开关；content scripts 在上述三个 B站域名运行。浏览器可能因此提示它可以读取和更改这些网站的数据。

地区文字来自评论组件已有的 `reply_control.location` 字段，在页面内处理。扩展没有接口请求、服务器、遥测、远程脚本或第三方 IP 查询；不读取完整 IP 地址，也不上传评论或浏览数据。工具栏和弹窗只读取本地开关。

[完整隐私说明](PRIVACY.md)

## 常见问题

### B站网页版怎么显示评论 IP 属地？

安装 Bili IP Lens，刷新 B站页面并打开评论区，再打开「显示 IP 属地」开关。兼容评论里已有地区数据时，扩展会把它显示在评论时间旁。

### 能查看完整 IP 或精确位置吗？

不能。扩展只展示 B站已提供的地区字符串，不查询完整 IP，不推断精确位置。

### 为什么有些评论没有属地？

评论数据可能没有提供该字段，或页面采用尚不兼容的旧组件。插件保持空白，不自行补全。首次安装后也请确认已刷新页面、开关已开启。

### 可以给直播间实时弹幕显示属地吗？

不可以。实时弹幕不在当前支持范围，也没有向本扩展提供同类评论属地字段。

### 关闭开关需要刷新吗？

不需要。已加载评论的本扩展标签会即时隐藏；重新开启后即时恢复。首次安装和更新扩展后需要刷新已有页面。

### 它和 BiliReveal 是什么关系？

Bili IP Lens 的现代评论组件接入方式**改编自 [MaxChang3/BiliReveal](https://github.com/maxchang3/BiliReveal)**。本项目将这一接入方式做成独立 MV3 扩展，并加入即时开关、工具栏状态、专用标签、原生标签检测及组件生命周期处理。上游版权和完整 MIT 许可保留在 [第三方声明](extension/THIRD_PARTY_NOTICES.md)。

## 开发

无需安装依赖。使用 Node.js 20+ 与 Python 3：

```sh
npm run check
npm test
npm run package
```

安装包输出到 `dist/`，ZIP 根目录包含 `manifest.json`。本机验证材料所在的 `.private/` 和生成的安装包不会进入 Git。

[贡献指南](CONTRIBUTING.md) · [更新记录](CHANGELOG.md)

## 许可与维护

由 [8TrafficAI](https://github.com/8TrafficAI) 维护，使用 [MIT License](LICENSE)。BiliReveal 的原作者版权及许可单独保留。本项目与哔哩哔哩没有官方隶属关系。
