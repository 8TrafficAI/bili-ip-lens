# Bili IP Lens 用户脚本版

显示 B站现代评论组件已经携带的 **IP 属地**，并通过油猴管理器菜单即时开关。
菜单会显示「关闭 IP 属地显示（已开启）」或「开启 IP 属地显示（已关闭）」。
设置保存于当前用户脚本管理器本地；支持 `GM_addValueChangeListener` 的管理器会
将开关同步到已打开的其他标签页。缺少该 API 时，当前标签页的即时开关仍可使用，
其他标签页刷新后会读取保存的设置。

## 安装与使用

1. 安装并启用 Tampermonkey 等支持本脚本声明的 GM API 的用户脚本管理器。
2. 从 [Greasy Fork](https://greasyfork.org/zh-CN/scripts/605536) 或已发布的 `.user.js` 文件打开管理器安装页，阅读代码并安装。
3. 刷新已打开的 B站视频页面，滚动到评论区。
4. 点击用户脚本管理器图标，在 Bili IP Lens 的菜单中开启或关闭显示。

首次安装需刷新已有页面；之后菜单开关无需刷新。脚本没有自己的 Chrome 工具栏图标。
Chrome 扩展版和用户脚本版建议二选一，以免两个设置来源造成困惑。两版使用独立
标签和事件；用户脚本关闭时只移除自己的标签，检测到扩展版标签时优先保留扩展版。

### 安装后没有显示？

- 确认 Tampermonkey 的全局状态为 **Enabled**，并且 Bili IP Lens 脚本已启用。管理器全局 Disabled 时，即使脚本已保存也不会注入。
- 在浏览器的扩展详情中检查正常的 **允许运行用户脚本 / Allow User Scripts** 许可；本次实测配置原本已开启，没有修改此许可。
- 首次安装后刷新 B站页面，再选择带地区字段的新评论。部分旧热评没有地区数据，空白本身不说明脚本注入失败。

## 真实管理器验证 · 2026-11-15

发布版 0.1.1 已通过 Tampermonkey 5.5.1 的正常 New Userscript 编辑器保存，并在 ego-browser 的视频 `BV1xx411c7mD` 最新评论列表中独立验证。测试期间 MV3 版 Bili IP Lens 停用，18 条带地区评论均有对应用户脚本标签且文字全部匹配，扩展标签数为 0。

真实工具栏菜单 OFF 后标签数从 18 变为 0，重开菜单仍显示已关闭；ON 后恢复 18 / 18，重开菜单显示已开启。这是一个浏览器、管理器版本和视频场景的本地样本，不推导其他管理器、跨标签页同步、动态或空间页均已验收。详见[完整验证记录](../docs/validation-2026-11-15.md#real-tampermonkey-validation--2026-11-15)。

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
