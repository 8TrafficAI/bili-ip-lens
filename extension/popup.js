"use strict";

const toggle = document.getElementById("enabled-toggle");
const state = document.getElementById("state");
const stateText = document.getElementById("state-text");
const pageStatus = document.getElementById("page-status");
const feedback = document.getElementById("feedback");
let enabled = true;
let ready = false;
let saving = false;
let settingsRevision = 0;

function render() {
  toggle.setAttribute("aria-checked", String(enabled));
  toggle.disabled = !ready || saving;
  state.dataset.enabled = String(ready && enabled);
  stateText.textContent = saving ? "正在保存…" : enabled ? "已开启" : "已关闭";
  pageStatus.textContent = enabled
    ? "在评论时间旁显示 IP 属地"
    : "已隐藏 IP 属地，随时可以开启。";
}

function showError(message) {
  feedback.textContent = message;
  feedback.hidden = !message;
}

toggle.addEventListener("click", async () => {
  if (!ready || saving) return;
  const previous = enabled;
  saving = true;
  enabled = !enabled;
  showError("");
  render();
  try {
    await chrome.storage.local.set({ enabled });
  } catch {
    enabled = previous;
    showError("保存失败，请再试一次。");
  } finally {
    saving = false;
    render();
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local" || !changes.enabled) return;
  settingsRevision += 1;
  enabled = changes.enabled.newValue !== false;
  if (ready) {
    render();
  }
});

async function init() {
  const revision = settingsRevision;
  try {
    const settings = await chrome.storage.local.get({ enabled: true });
    if (revision === settingsRevision) enabled = settings.enabled !== false;
    ready = true;
    render();
  } catch {
    if (revision !== settingsRevision) {
      ready = true;
      render();
    } else {
      stateText.textContent = "设置暂时不可用";
      pageStatus.textContent = "请重新打开插件后再试。";
      showError("无法读取设置，开关暂时不可用。");
    }
  }
  document.getElementById("version").textContent = `v${chrome.runtime.getManifest().version}`;
}

init();
