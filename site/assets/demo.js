'use strict';
// A local illustration only: never reads or changes extension/browser settings.
const demoToggle = document.querySelector('[data-demo-toggle]');
if (demoToggle) {
  demoToggle.addEventListener('click', () => {
    const enabled = demoToggle.getAttribute('aria-checked') !== 'true';
    demoToggle.setAttribute('aria-checked', String(enabled));
    document.querySelectorAll('[data-demo-region]').forEach(region => {
      region.hidden = !enabled;
    });
    document.getElementById('demo-status').textContent = enabled
      ? '已开启 · 试试切换' : '已关闭 · 示例标签已隐藏';
  });
}
