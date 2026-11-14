'use strict';

async function updateAction() {
  const { enabled = true } = await chrome.storage.local.get('enabled');
  await Promise.all([
    chrome.action.setBadgeText({ text: enabled ? 'ON' : 'OFF' }),
    chrome.action.setBadgeBackgroundColor({ color: enabled ? '#087f8c' : '#63717b' }),
    chrome.action.setTitle({ title: `Bili IP Lens · IP 属地${enabled ? '已开启' : '已关闭'}` }),
  ]);
}

chrome.runtime.onInstalled.addListener(() => { updateAction().catch(() => {}); });
chrome.runtime.onStartup.addListener(() => { updateAction().catch(() => {}); });
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.enabled) updateAction().catch(() => {});
});
updateAction().catch(() => {});
