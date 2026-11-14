// Userscript-only persistence and menu. The rendering integration above is
// generated from extension/page.js with a separate marker and event namespace.
(() => {
  'use strict';
  const KEY = 'bili-ip-lens-enabled';
  let enabled = false;
  let initialized = false;
  let saving = false;
  let revision = 0;
  let menuId;

  function publishSettings() {
    document.dispatchEvent(new CustomEvent('bili-ip-lens-userscript:settings', {
      detail: enabled,
    }));
  }

  function updateMenu() {
    if (typeof GM_registerMenuCommand !== 'function') return;
    const canReplace = typeof GM_unregisterMenuCommand === 'function';
    if (menuId !== undefined) {
      if (!canReplace) return;
      GM_unregisterMenuCommand(menuId);
    }
    const label = canReplace
      ? (enabled ? '关闭 IP 属地显示（已开启）' : '开启 IP 属地显示（已关闭）')
      : '切换 IP 属地显示';
    menuId = GM_registerMenuCommand(label, toggle);
  }

  function apply(value) {
    enabled = value !== false;
    initialized = true;
    publishSettings();
    updateMenu();
  }

  async function toggle() {
    if (!initialized || saving) return;
    saving = true;
    const next = !enabled;
    const beforeWrite = revision;
    try {
      await GM_setValue(KEY, next);
      // Local or remote storage notifications may already carry a newer value.
      if (revision === beforeWrite) apply(next);
    } catch {
      // A failed write must not claim a persistent preference was saved.
      console.warn('[Bili IP Lens] 无法保存开关，已保留原状态。');
    } finally {
      saving = false;
    }
  }

  if (typeof GM_addValueChangeListener === 'function') {
    GM_addValueChangeListener(KEY, (_key, _oldValue, newValue) => {
      revision += 1;
      apply(newValue);
    });
  }

  const beforeRead = revision;
  try {
    Promise.resolve(GM_getValue(KEY, true)).then((value) => {
      if (revision === beforeRead) apply(value);
    }).catch(() => {
      if (revision !== beforeRead) return;
      // Remain OFF if reading preferences fails, but allow a manual retry.
      apply(false);
      console.warn('[Bili IP Lens] 无法读取设置；可从油猴菜单手动开启。');
    });
  } catch {
    apply(false);
    console.warn('[Bili IP Lens] 无法读取设置；可从油猴菜单手动开启。');
  }
})();
