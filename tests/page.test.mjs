import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../extension/page.js', import.meta.url), 'utf8');
const bridgeSource = readFileSync(new URL('../extension/bridge.js', import.meta.url), 'utf8');
const NAME = 'bili-comment-action-buttons-renderer';
const MARKER = 'data-bili-ip-lens';

class FakeEvent {
  constructor(type, options = {}) { this.type = type; this.detail = options.detail; }
}

function fixture({ registered = false, readonly = false } = {}) {
  const listeners = new Map();
  const components = [];
  const definitions = new Map();
  const scheduled = [];
  const document = {
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(handler);
    },
    dispatchEvent(event) {
      for (const handler of listeners.get(event.type) ?? []) handler(event);
    },
    querySelectorAll(selector) {
      return selector === NAME ? components.filter(c => c.isConnected) : [];
    },
    createElement() {
      return {
        attributes: {}, style: {}, textContent: '',
        setAttribute(name, value) { this.attributes[name] = value; },
        remove() { this.parent.badges = this.parent.badges.filter(b => b !== this); },
      };
    },
  };
  class Renderer {
    constructor(location = 'IP属地：上海') {
      this.isConnected = true;
      this.data = { reply_control: { location } };
      this.renderCount = 0;
      this.shadowRoot = {
        badges: [], nativeLabel: null,
        querySelector(selector) {
          if (selector === `[${MARKER}]`) return this.badges[0] ?? null;
          if (selector === '#pubdate') return this.pubdate;
          if (selector.includes('#location')) return this.nativeLabel;
          return null;
        },
        pubdate: null,
      };
      this.shadowRoot.pubdate = {
        insertAdjacentElement: (_position, element) => {
          element.parent = this.shadowRoot;
          this.shadowRoot.badges.push(element);
        },
      };
      components.push(this);
    }
    update() { this.renderCount += 1; return 'site-render-result'; }
  }
  if (readonly) Object.defineProperty(Renderer.prototype, 'update', { writable: false });
  if (registered) definitions.set(NAME, Renderer);
  const registry = {
    get(name) { return definitions.get(name); },
    define(name, Constructor) { definitions.set(name, Constructor); },
  };
  const originalDefine = registry.define;
  const context = vm.createContext({ document, customElements: registry,
    Event: FakeEvent, CustomEvent: FakeEvent, queueMicrotask: fn => scheduled.push(fn) });
  vm.runInContext(source, context);
  function flush() { while (scheduled.length) scheduled.shift()(); }
  function enabled(value) {
    document.dispatchEvent(new FakeEvent('bili-ip-lens:settings', { detail: value }));
    flush();
  }
  function status() {
    let result;
    document.addEventListener('bili-ip-lens:status', e => { result = e.detail; });
    document.dispatchEvent(new FakeEvent('bili-ip-lens:request-status'));
    return result;
  }
  return { Renderer, registry, originalDefine, document, flush, enabled, status };
}

test('late registration preserves site rendering and toggles existing/recycled comments', () => {
  const f = fixture();
  f.registry.define(NAME, f.Renderer);
  assert.equal(f.registry.define, f.originalDefine, 'registry interception ends after registration');
  const comment = new f.Renderer();
  assert.equal(comment.update(), 'site-render-result');
  f.flush();
  assert.equal(comment.renderCount, 1);
  assert.equal(comment.shadowRoot.badges.length, 0, 'disabled before settings are available');
  f.enabled(true);
  assert.equal(comment.shadowRoot.badges[0].textContent, 'IP属地：上海');
  comment.data.reply_control.location = '广东';
  comment.update();
  f.flush();
  assert.equal(comment.shadowRoot.badges.length, 1, 'no duplicate label on re-render');
  assert.equal(comment.shadowRoot.badges[0].textContent, 'IP属地：广东');
  f.enabled(false);
  assert.equal(comment.shadowRoot.badges.length, 0, 'off removes labels without navigation');
  f.enabled(true);
  assert.equal(comment.shadowRoot.badges[0].textContent, 'IP属地：广东');
});

test('missing data stays blank and native labels are respected', () => {
  const f = fixture({ registered: true });
  const oldComment = new f.Renderer(undefined);
  delete oldComment.data.reply_control.location;
  const native = new f.Renderer('浙江');
  native.shadowRoot.nativeLabel = { textContent: 'IP属地：浙江' };
  f.enabled(true);
  oldComment.update(); native.update(); f.flush();
  assert.equal(oldComment.shadowRoot.badges.length, 0);
  assert.equal(native.shadowRoot.badges.length, 0);
  native.shadowRoot.nativeLabel = null;
  native.update(); f.flush();
  assert.equal(native.shadowRoot.badges.length, 1);
  native.shadowRoot.nativeLabel = { textContent: 'IP属地：浙江' };
  native.update(); f.flush();
  assert.equal(native.shadowRoot.badges.length, 0, 'native label supersedes extension label');
});

test('location strings are inserted as text, never markup', () => {
  const f = fixture({ registered: true });
  const comment = new f.Renderer('<img src=x onerror=alert(1)>');
  f.enabled(true);
  const badge = comment.shadowRoot.badges[0];
  assert.equal(badge.textContent, 'IP属地：<img src=x onerror=alert(1)>');
  assert.equal(Object.hasOwn(badge, 'innerHTML'), false);
  comment.data.reply_control.location = { toString: () => '上海' };
  comment.update(); f.flush();
  assert.equal(comment.shadowRoot.badges.length, 0, 'non-string payloads are ignored');
});

test('hook failure cannot block the site from registering a renderer', () => {
  const f = fixture({ readonly: true });
  assert.doesNotThrow(() => f.registry.define(NAME, f.Renderer));
  assert.equal(f.registry.get(NAME), f.Renderer);
});

test('detached cached components do not retain labels after disabling', () => {
  const f = fixture({ registered: true });
  const comment = new f.Renderer();
  f.enabled(true);
  assert.equal(comment.shadowRoot.badges.length, 1);
  comment.isConnected = false;
  assert.equal(f.status().count, 0);
  f.enabled(false);
  comment.isConnected = true;
  assert.equal(comment.shadowRoot.badges.length, 0,
    'a cached DOM node reinserted without update must not show stale IP labels');
});

test('a saved-preference read cannot overwrite a newer storage toggle', async () => {
  const f = fixture({ registered: true });
  const comment = new f.Renderer();
  let resolveRead;
  let onStorage;
  let onMessage;
  const chrome = {
    storage: {
      local: { get: () => new Promise(resolve => { resolveRead = resolve; }) },
      onChanged: { addListener: fn => { onStorage = fn; } },
    },
    runtime: { onMessage: { addListener: fn => { onMessage = fn; } } },
  };
  vm.runInContext(bridgeSource, vm.createContext({ chrome, document: f.document,
    Event: FakeEvent, CustomEvent: FakeEvent }));
  onStorage({ enabled: { oldValue: true, newValue: false } }, 'local');
  resolveRead({ enabled: true });
  await Promise.resolve();
  f.flush();
  assert.equal(comment.shadowRoot.badges.length, 0, 'stale get must not turn labels back on');
  onStorage({ enabled: { oldValue: false, newValue: true } }, 'local');
  f.flush();
  assert.equal(comment.shadowRoot.badges.length, 1);
  let response;
  onMessage({ type: 'BILI_IP_LENS_STATUS' }, {}, result => { response = result; });
  assert.deepEqual({ ...response }, { enabled: true, count: 1, supported: true });
  assert.deepEqual(Object.keys(response).sort(), ['count', 'enabled', 'supported'],
    'the bridge sends counts and state, never comment content or location values');
});
