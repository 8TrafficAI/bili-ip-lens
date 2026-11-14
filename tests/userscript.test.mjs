import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const source = readFileSync(new URL('../userscript/bili-ip-lens.user.js', import.meta.url), 'utf8');
const NAME = 'bili-comment-action-buttons-renderer';
const MARKER = 'data-bili-ip-lens-userscript';

class PageEvent {
  constructor(type, options = {}) { this.type = type; this.detail = options.detail; }
}

function fixture({ saved = true, deferRead = false, listen = true, writeFails = false } = {}) {
  const listeners = new Map();
  const components = [];
  const definitions = new Map();
  const scheduled = [];
  const menus = new Map();
  const warnings = [];
  let stored = saved;
  let menuId = 0;
  let valueListener;
  let resolveRead;
  const document = {
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(handler);
    },
    dispatchEvent(event) {
      assert.ok(event instanceof PageEvent, 'events must use the page realm');
      for (const handler of listeners.get(event.type) ?? []) handler(event);
    },
    querySelectorAll(selector) {
      return selector === NAME ? components.filter(c => c.isConnected) : [];
    },
    createElement(tag) {
      assert.equal(tag, 'span', 'the script must not inject an inline script element');
      return {
        attributes: {}, style: {}, textContent: '',
        setAttribute(name, value) { this.attributes[name] = value; },
        remove() { this.parent.badges = this.parent.badges.filter(b => b !== this); },
      };
    },
  };
  class Renderer {
    constructor(location = 'IP属地：广东') {
      this.isConnected = true;
      this.data = { reply_control: { location } };
      this.shadowRoot = {
        badges: [], extensionBadge: null,
        querySelector(selector) {
          if (selector === `[${MARKER}]`) return this.badges[0] ?? null;
          if (selector === '#pubdate') return this.pubdate;
          if (selector.includes('[data-bili-ip-lens]')) return this.extensionBadge;
          return null;
        },
      };
      this.shadowRoot.pubdate = {
        insertAdjacentElement: (_position, badge) => {
          badge.parent = this.shadowRoot;
          this.shadowRoot.badges.push(badge);
        },
      };
      components.push(this);
    }
    update() { return 'native-render-result'; }
  }
  const registry = {
    get(name) { return definitions.get(name); },
    define(name, Constructor) { definitions.set(name, Constructor); },
  };
  const page = {
    document, customElements: registry, Event: PageEvent, CustomEvent: PageEvent,
    queueMicrotask(fn) {
      assert.equal(this, page, 'page queueMicrotask must retain its receiver');
      scheduled.push(fn);
    },
  };
  const sandboxTrap = new Proxy({}, { get() { throw new Error('Sandbox DOM used instead of unsafeWindow'); } });
  const globals = {
    unsafeWindow: page, document: sandboxTrap, customElements: sandboxTrap,
    CustomEvent: class { constructor() { throw new Error('Sandbox event used'); } },
    console: { warn: (...args) => warnings.push(args) },
    GM_getValue: () => deferRead ? new Promise(resolve => { resolveRead = resolve; }) : stored,
    GM_setValue: (_key, value) => {
      if (writeFails) throw new Error('Storage unavailable');
      stored = value;
    },
    GM_registerMenuCommand: (label, callback) => {
      const id = ++menuId;
      menus.set(id, { label, callback });
      return id;
    },
    GM_unregisterMenuCommand: id => menus.delete(id),
  };
  if (listen) globals.GM_addValueChangeListener = (_key, handler) => { valueListener = handler; };
  vm.runInNewContext(source, globals, { filename: 'bili-ip-lens.user.js' });
  registry.define(NAME, Renderer);
  function flush() { while (scheduled.length) scheduled.shift()(); }
  return {
    Renderer, document, menus, warnings,
    get stored() { return stored; },
    get menu() { assert.equal(menus.size, 1); return [...menus.values()][0]; },
    async ready() { await Promise.resolve(); await Promise.resolve(); flush(); },
    flush,
    remote(value) { stored = value; valueListener('bili-ip-lens-enabled', !value, value, true); flush(); },
    resolveRead(value) { resolveRead(value); },
  };
}

test('userscript hooks page objects directly and preserves native renderer behavior', async () => {
  const f = fixture();
  const comment = new f.Renderer();
  assert.equal(comment.update(), 'native-render-result');
  await f.ready();
  assert.equal(comment.shadowRoot.badges[0].textContent, 'IP属地：广东');
  assert.equal(comment.shadowRoot.badges[0].attributes[MARKER], '');
  assert.match(f.menu.label, /^关闭/);
});

test('menu persists an immediate toggle and remote changes replace the menu without duplicates', async () => {
  const f = fixture({ saved: false });
  const comment = new f.Renderer();
  await f.ready();
  assert.equal(comment.shadowRoot.badges.length, 0);
  assert.match(f.menu.label, /^开启/);
  await f.menu.callback(); f.flush();
  assert.equal(f.stored, true);
  assert.equal(comment.shadowRoot.badges.length, 1);
  assert.match(f.menu.label, /^关闭/);
  f.remote(false);
  assert.equal(comment.shadowRoot.badges.length, 0);
  assert.match(f.menu.label, /^开启/);

  const localOnly = fixture({ listen: false, saved: true });
  const localComment = new localOnly.Renderer();
  await localOnly.ready();
  await localOnly.menu.callback(); localOnly.flush();
  assert.equal(localOnly.stored, false);
  assert.equal(localComment.shadowRoot.badges.length, 0);
});

test('userscript owns its settings and never removes extension-owned labels', async () => {
  const f = fixture();
  const comment = new f.Renderer();
  await f.ready();
  f.document.dispatchEvent(new PageEvent('bili-ip-lens:settings', { detail: false }));
  f.flush();
  assert.equal(comment.shadowRoot.badges.length, 1, 'extension events do not change script state');
  const extensionBadge = { textContent: 'IP属地：广东', remove() { assert.fail('Extension badge removed'); } };
  comment.shadowRoot.extensionBadge = extensionBadge;
  comment.update(); f.flush();
  assert.equal(comment.shadowRoot.badges.length, 0, 'extension label takes precedence');
  assert.equal(comment.shadowRoot.extensionBadge, extensionBadge);
  await f.menu.callback(); f.flush();
  assert.equal(comment.shadowRoot.extensionBadge, extensionBadge, 'OFF only removes script labels');
});

test('failed saves retain the current state and stale preference reads cannot override remote updates', async () => {
  const f = fixture({ writeFails: true });
  const comment = new f.Renderer();
  await f.ready();
  await f.menu.callback(); f.flush();
  assert.equal(comment.shadowRoot.badges.length, 1);
  assert.equal(f.stored, true);
  assert.match(f.menu.label, /^关闭/);
  assert.equal(f.warnings.length, 1);

  const delayed = fixture({ deferRead: true });
  const delayedComment = new delayed.Renderer();
  delayed.remote(false);
  delayed.resolveRead(true);
  await delayed.ready();
  assert.equal(delayedComment.shadowRoot.badges.length, 0);
  assert.match(delayed.menu.label, /^开启/);
});

test('publishable userscript is current, readable, self-contained, and does not override update sources', () => {
  execFileSync(process.execPath, ['scripts/build-userscript.mjs', '--check'], {
    cwd: new URL('../', import.meta.url), stdio: 'pipe',
  });
  const manifest = JSON.parse(readFileSync(new URL('../extension/manifest.json', import.meta.url), 'utf8'));
  assert.match(source, new RegExp(`// @version\\s+${manifest.version.replaceAll('.', '\\.')}`));
  assert.match(source, /@run-at\s+document-start/);
  assert.match(source, /@namespace\s+https:\/\/github\.com\/8TrafficAI\/bili-ip-lens/);
  assert.match(source, /Copyright \(c\) 2023-present MaxChang3/);
  assert.match(source, /Permission is hereby granted, free of charge/);
  assert.equal((source.match(/^\/\/ @match\s/gm) ?? []).length, 3);
  assert.doesNotMatch(source, /^\/\/ @(require|connect|downloadURL|updateURL)\b/m);
  assert.doesNotMatch(source, /chrome\.storage|chrome\.runtime/);
});
