# Contributing

欢迎提交可复现的问题、兼容性反馈或小而明确的修复。也欢迎英文反馈。

## Report a problem

Use [the issue forms](https://github.com/8TrafficAI/bili-ip-lens/issues/new/choose). Include:

- Browser name and version, extension version, and Bilibili page type.
- Steps to reproduce, expected result, and observed result.
- Whether refreshing the page after installation or update changes the result.
- A public page URL only when useful; remove tracking parameters.

Do not include account tokens, cookies, full IP addresses, private messages, personal contact details, or screenshots containing sensitive information. Comment authors' identities are usually unnecessary for diagnosing a renderer problem.

## Local development

Use Node.js 20+ and Python 3. No package installation is required.

```sh
npm run check
npm test
npm run package
```

Load `extension/` through `chrome://extensions` in Developer mode. After editing, reload the extension and refresh the test page.

## Scope and review

Keep the extension focused on displaying Bilibili-provided comment region strings with an immediate toggle. It should not query full IP addresses, infer missing locations, add telemetry, or introduce unrelated live-stream overlays.

For UI changes, check the **actual toolbar popup**, not only a full-page preview of popup.html. Verify horizontal labels, the complete switch and footer, no unnecessary scrollbars, and saved state after reopening.

For comment integration changes, check available versus missing region data, nested replies, sorting, native-label duplication, and OFF / ON behavior. Record which browser and page types you actually tested.

Preserve BiliReveal attribution and its full MIT notice when modifying adapted integration code. Avoid publishing local test artifacts from the ignored `.private/` directory.

Please describe the concrete problem, resulting behavior, and relevant validation in pull requests. Keep changes limited to the intended behavior.
