# Bili IP Lens 用户脚本版

显示 B站现代评论组件已经携带的 **IP 属地**，并通过油猴管理器菜单即时开关。
菜单会显示「关闭 IP 属地显示（已开启）」或「开启 IP 属地显示（已关闭）」。
设置保存于当前用户脚本管理器本地；支持 `GM_addValueChangeListener` 的管理器会
将开关同步到已打开的其他标签页。缺少该 API 时，当前标签页的即时开关仍可使用，
其他标签页刷新后会读取保存的设置。

## 安装与使用

1. 安装并启用 Tampermonkey 等支持本脚本声明的 GM API 的用户脚本管理器。
2. 打开已发布的 `.user.js` 文件，在管理器提供的安装页阅读代码并安装。
3. 刷新已打开的 B站视频页面，滚动到评论区。
4. 点击用户脚本管理器图标，在 Bili IP Lens 的菜单中开启或关闭显示。

首次安装需刷新已有页面；之后菜单开关无需刷新。脚本没有自己的 Chrome 工具栏图标。
Chrome 扩展版和用户脚本版建议二选一，以免两个设置来源造成困惑。两版使用独立
标签和事件；用户脚本关闭时只移除自己的标签，检测到扩展版标签时优先保留扩展版。

## 范围与限制

- 接入 `www.bilibili.com`、`t.bilibili.com`、`space.bilibili.com` 的现代 Lit 评论组件。
- 支持主评论和楼中楼；未携带地区的评论不补填、不猜测。
- 不提供完整 IP 地址、精确定位或直播实时弹幕属地。
- 不调用 B站或第三方查询接口，不上传评论数据，不加载外部脚本。
- 脚本与浏览器扩展共享渲染核心，但用户脚本管理器的注入与 GM API 兼容性需分别验证。
- 不承诺历史 Vue 评论组件、所有页面或所有用户脚本管理器均兼容。

## 构建

```sh
node scripts/build-userscript.mjs
node scripts/build-userscript.mjs --check
node --test tests/userscript.test.mjs
```

`bili-ip-lens.user.js` 为可发布完整文件，包含从 `extension/page.js` 生成的接入代码
和 `settings.js` 的设置菜单。不要直接编辑生成文件。

脚本不硬编码 `@downloadURL` / `@updateURL`；用户脚本管理器使用安装来源处理更新，
Greasy Fork 安装则由 Greasy Fork 处理后续更新。脚本本身不请求更新。

## 许可与来源

MIT。现代评论组件接入改编自 [MaxChang3/BiliReveal](https://github.com/maxchang3/BiliReveal)。
完整原作者版权与 MIT 许可已内嵌在 `.user.js` 中；相较上游的改动包括独立的即时菜单
开关、持久化与跨标签同步、发行版隔离及组件生命周期处理。
