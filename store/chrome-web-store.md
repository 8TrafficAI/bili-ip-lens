# Chrome Web Store submission material

Version: 0.1.1 · Prepared: 2026-11-15

Status: **v0.1.1 submitted for extension review; pending review.** Google confirmed
submission and the item status shows pending review. Automatic publication after
approval is enabled. There is no live public listing yet.
The ZIP was accepted, icon/screenshot uploaded, and listing, privacy disclosures,
distribution settings and reviewer instructions were saved with success confirmations.
Contact email is verified. Organization documents and SMS verification were
submitted; organization verification was pending at the last settings observation.
Organization verification and extension review are separate platform states.

## Listing

- Name: **Bili IP Lens · B站评论 IP 属地**
- Short description: **在 B站评论旁显示平台已有的 IP 属地。工具栏一键开关，即时生效。免费开源，不额外查询 IP。**
- Primary language: Simplified Chinese
- Category: Tools
- Website: https://8trafficai.github.io/bili-ip-lens/
- Support: https://github.com/8TrafficAI/bili-ip-lens/issues
- Privacy policy: https://8trafficai.github.io/bili-ip-lens/privacy/
- Package: `dist/bili-ip-lens-0.1.1.zip`
- Icon: `store/assets/icon-128.png`
- Screenshot: `store/assets/screenshot-1280x800.png` (1280 × 800)

### Detailed description

Bili IP Lens 是一个专注 B站评论 IP 属地的轻量浏览器扩展。

它把 B站已经放在现代评论组件数据里的地区文字，显示在评论时间旁边。
点击工具栏图标，可以随时打开或关闭「显示 IP 属地」；已经加载的评论
即时显示或隐藏，开关状态保存在当前浏览器本地。

功能：
- 显示兼容的主评论与楼中楼中的地区信息。
- 工具栏提供 ON / OFF 状态和即时开关。
- 跟随评论重新渲染更新，避免重复添加原生属地标签。
- 免费、MIT 开源，源码可在 GitHub 查看。

隐私：
- 不额外查询 IP，不获取完整 IP 地址或精确位置。
- 不上传评论、属地或浏览数据。
- 没有服务器、遥测、广告或远程脚本。
- storage 权限只保存一个开启 / 关闭设置。

支持范围：
适用于 www.bilibili.com、t.bilibili.com 和 space.bilibili.com 上的兼容现代
评论组件。视频主评论与楼中楼已在 ego-browser 验证；动态和个人空间的
同款组件是接入目标，尚未逐场景完成手工验收。部分历史评论没有地区
字段时保持空白，不猜测地区。历史 Vue 评论界面及直播实时弹幕属地不支持。

本项目没有 Super Chat 或其他直播叠层功能，与哔哩哔哩没有官方隶属关系。
现代评论组件的接入方式改编自 MaxChang3/BiliReveal，保留原作者的 MIT
版权及许可。首次安装或更新后，请刷新已经打开的 B站页面。

## Privacy practices and permission justification

Single purpose: display IP-region strings already present in compatible
Bilibili comments, controlled by a saved user preference.

`storage`: saves only the `enabled` boolean used by the toolbar switch.

Website access: the two static content scripts match only HTTPS pages on
www.bilibili.com, t.bilibili.com, and space.bilibili.com. The MAIN-world script
reads `reply_control.location` from the existing comment renderer and adds
a text label. The isolated script passes only the boolean preference and
local diagnostic counts. No comment text or region values leave the page.

Remote code: **No**. All code is bundled; there is no `eval`, remote script,
external dependency, or extension-created network request.

Data collection: **No collection or transmission**. The extension processes
the platform's supplied region text locally to provide its stated feature.
No account credentials, complete IP addresses, browsing history, or precise
location are collected. Local preference storage is the only persistence.

Reviewer instructions: open a Bilibili video, refresh after installation,
scroll to comments, and choose newest comments. Where a modern comment
contains region data, the label appears beside its time. Toggle the toolbar
switch OFF and ON to verify immediate removal and restoration. Older
comments lacking the field are intentionally unchanged.

No payment, external account, or API key is required by the extension.

## Public status record

Public listing URL: none yet; unpublished console links and the item identifier are omitted.
Extension review state: **SUBMITTED / PENDING REVIEW**.
Automatic publication after approval: enabled.
Organization verification: pending at the last settings observation, after successful document and SMS-verification submission.
Contact-email verification: **VERIFIED**.
Package: v0.1.1 ZIP accepted.
Listing assets: icon and screenshot uploaded.
Listing text: saved; explicit success confirmation observed.
Privacy: permission reasons, policy URL, no collected-data categories and three applicable Limited Use declarations saved successfully.
Distribution: free / public, all offered regions selected; save succeeded.
Reviewer instructions: saved, with the dated save confirmation observed.

The final submit action produced Google's extension-submitted confirmation and
pending-review status. This establishes review submission, not approval or live
publication; auto-publish remains contingent on approval and platform requirements.
Private identity documents, business identifiers, phone/contact values, account
IDs and authentication URLs are not recorded here.
