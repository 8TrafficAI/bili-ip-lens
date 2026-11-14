# Bili IP Lens

轻量 Chrome / Chromium 扩展：在 B站评论的时间旁显示平台已有的 **IP 属地**。
工具栏提供 ON / OFF 状态，弹窗里一键切换；已加载的评论即时显示或隐藏。

## 本地安装

1. 保留本目录在固定位置。
2. 打开 `chrome://extensions`（ego-browser 使用相同地址），开启开发者模式。
3. 点击「加载已解压的扩展程序」，选择本项目的 **extension** 文件夹。
4. 固定 Bili IP Lens 到工具栏，刷新已打开的 B站页面。
5. 打开视频评论区，点击扩展图标测试「显示 IP 属地」开关。

首次安装需要刷新已有页面；之后切换开关无需刷新。设置保存在当前浏览器本地。

## 首版范围

- 接入当前 B站的 Lit 评论组件，覆盖主评论和楼中楼；视频、动态和个人空间使用同一组件时可用。
- 支持站点：`www.bilibili.com`、`t.bilibili.com`、`space.bilibili.com`。
- 展示 B站提供的地区字符串，不推断位置。历史评论或未携带属地的数据保持原样。
- 不提供直播实时弹幕属地；直播弹幕并未向本插件提供同类数据。
- 不带 Super Chat 功能。原「B站助手」应保持停用，避免它继续叠加卡片。
- 历史 Vue 评论组件暂不支持。B站组件更新后可能需要适配。

## 隐私与权限

仅使用 `storage` 权限保存一个布尔开关。content scripts 仅匹配上述三个 B站域名。
没有接口请求、服务器、遥测、远程脚本或第三方 IP 查询；评论数据留在页面内。
工具栏和弹窗只读取本地开关，不读取评论内容。
详见 [隐私说明](PRIVACY.md)。

## 开发与打包

无需安装依赖。Node.js 20+，Python 3 用于 ZIP 打包。

```sh
npm run check
npm test
npm run package
```

打包结果位于 `dist/`，ZIP 根目录包含 manifest，可解压后直接加载。
`.private/` 是本机测试证据目录，已被 Git 和打包流程排除。

## 来源与许可

评论组件的接入方式改编自 [MaxChang3/BiliReveal](https://github.com/maxchang3/BiliReveal)，
原作者及 MIT 许可证见 [第三方声明](extension/THIRD_PARTY_NOTICES.md)。
新增 MV3 包装、即时开关、工具栏状态、专用标签及生命周期处理。

本项目使用 [MIT License](LICENSE)。当前为本地试用版；公开发布和商店上线待试用验收。
