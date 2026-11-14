(() => {
  'use strict';
  let enabled = false;
  let initialized = false;
  let count = 0;
  let supported = false;
  let settingRevision = 0;

  function sendSettings() {
    if (initialized) {
      document.dispatchEvent(new CustomEvent('bili-ip-lens:settings', { detail: enabled }));
    }
  }

  document.addEventListener('bili-ip-lens:ready', sendSettings);
  document.addEventListener('bili-ip-lens:status', (event) => {
    const detail = event.detail;
    if (Number.isSafeInteger(detail?.count) && detail.count >= 0 && detail.count <= 100000) {
      count = detail.count;
      supported = detail.supported === true;
    }
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !changes.enabled) return;
    settingRevision += 1;
    enabled = changes.enabled.newValue !== false;
    initialized = true;
    sendSettings();
  });

  const revision = settingRevision;
  chrome.storage.local.get({ enabled: true }).then((settings) => {
    if (revision !== settingRevision) return;
    enabled = settings.enabled !== false;
    initialized = true;
    sendSettings();
  }).catch(() => {
    // Fail closed when the saved preference cannot be read.
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type !== 'BILI_IP_LENS_STATUS') return;
    document.dispatchEvent(new Event('bili-ip-lens:request-status'));
    sendResponse({ enabled, count, supported });
  });
})();
