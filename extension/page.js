/*
 * Modern Bilibili comment integration adapted from BiliReveal (MIT).
 * Copyright (c) 2023-present MaxChang3. See THIRD_PARTY_NOTICES.md.
 * Changes: live toggle, own labels, native-label detection, bounded lifecycle,
 * late registration support, and no network or comment-content transport.
 */
(() => {
  'use strict';
  const NAME = 'bili-comment-action-buttons-renderer';
  const MARKER = 'data-bili-ip-lens';
  const SETTINGS = 'bili-ip-lens:settings';
  const STATUS = 'bili-ip-lens:status';
  const READY = 'bili-ip-lens:ready';
  const REQUEST = 'bili-ip-lens:request-status';
  const instances = new Set();
  const patched = new WeakSet();
  let enabled = false;
  let statusScheduled = false;

  function locationText(instance) {
    const value = instance.data?.reply_control?.location;
    if (typeof value !== 'string') return '';
    const text = value.trim().replace(/^IP\s*属地\s*[:：]?\s*/i, '');
    return text && text.length <= 80 ? `IP属地：${text}` : '';
  }

  function publishStatus() {
    statusScheduled = false;
    let count = 0;
    for (const instance of instances) {
      if (!instance.isConnected) {
        instance.shadowRoot?.querySelector(`[${MARKER}]`)?.remove();
        instances.delete(instance);
      } else if (instance.shadowRoot?.querySelector(`[${MARKER}]`)) {
        count += 1;
      }
    }
    document.dispatchEvent(new CustomEvent(STATUS, {
      detail: { count, supported: !!customElements.get(NAME) },
    }));
  }

  function scheduleStatus() {
    if (statusScheduled) return;
    statusScheduled = true;
    queueMicrotask(publishStatus);
  }

  function sync(instance) {
    const root = instance.shadowRoot;
    if (!root) return;
    let badge = root.querySelector(`[${MARKER}]`);
    const text = enabled ? locationText(instance) : '';
    const nativeLabel = root.querySelector('#location, .reply-location, [data-ip-location]');
    const pubdate = root.querySelector('#pubdate');
    if (!text || !pubdate || nativeLabel?.textContent?.trim()) {
      badge?.remove();
      scheduleStatus();
      return;
    }
    if (!badge) {
      badge = document.createElement('span');
      badge.setAttribute(MARKER, '');
      // Inherit Bilibili's metadata color, type, spacing, and dark theme.
      badge.style.cssText = 'font:inherit;color:inherit;white-space:nowrap;';
      pubdate.insertAdjacentElement('afterend', badge);
    }
    badge.textContent = text;
    badge.title = 'B站为这条评论提供的 IP 属地';
    scheduleStatus();
  }

  function safelySync(instance) {
    try {
      instances.add(instance);
      sync(instance);
    } catch {
      // A site renderer change must never interrupt comment rendering.
    }
  }

  function patch(Constructor) {
    if (!Constructor || patched.has(Constructor)) return;
    const original = Constructor.prototype.update;
    if (typeof original !== 'function') return;
    try {
      Constructor.prototype.update = function (...args) {
        const result = Reflect.apply(original, this, args);
        safelySync(this);
        return result;
      };
      patched.add(Constructor);
    } catch {
      // A frozen site prototype must still be registered and render normally.
    }
  }

  function discover(root) {
    for (const instance of root.querySelectorAll(NAME)) safelySync(instance);
    // Existing comments can live several open shadow roots deep.
    for (const element of root.querySelectorAll('*')) {
      if (element.shadowRoot) discover(element.shadowRoot);
    }
  }

  const existing = customElements.get(NAME);
  if (existing) {
    patch(existing);
  } else {
    const originalDefine = customElements.define;
    const wrappedDefine = function (name, Constructor, options) {
      if (name === NAME) patch(Constructor);
      const result = Reflect.apply(originalDefine, this, [name, Constructor, options]);
      // Stop intercepting the registry as soon as our one component exists.
      if (name === NAME && customElements.define === wrappedDefine) {
        customElements.define = originalDefine;
      }
      return result;
    };
    customElements.define = wrappedDefine;
  }

  document.addEventListener(SETTINGS, (event) => {
    if (typeof event.detail !== 'boolean') return;
    enabled = event.detail;
    discover(document);
    for (const instance of instances) {
      if (!instance.isConnected) {
        instance.shadowRoot?.querySelector(`[${MARKER}]`)?.remove();
        instances.delete(instance);
      }
      else safelySync(instance);
    }
    scheduleStatus();
  });
  document.addEventListener(REQUEST, publishStatus);
  document.dispatchEvent(new Event(READY));
})();
