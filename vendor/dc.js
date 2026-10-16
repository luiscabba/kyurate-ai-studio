// Minimal runtime for the Kyurate AI Studio prototype pages.
// Renders a page template (holes, sc-for, sc-if, events) with Preact.
import { h, render } from './preact.module.js';

class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
  }
  setState(update, cb) {
    const patch = typeof update === 'function' ? update(this.state, this.props) : update;
    if (patch) this.state = Object.assign({}, this.state, patch);
    if (this.__schedule) this.__schedule();
    if (cb) cb();
  }
  forceUpdate() {
    if (this.__schedule) this.__schedule();
  }
  renderVals() {
    return {};
  }
}
window.DCLogic = DCLogic;

const HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
const ONLY_HOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;
const BOOL_ATTRS = new Set(['disabled', 'checked', 'selected', 'readonly', 'required', 'multiple', 'hidden']);

function lookup(path, scope) {
  if (path === 'true') return true;
  if (path === 'false') return false;
  if (path === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
  if (/^'.*'$|^".*"$/.test(path)) return path.slice(1, -1);
  const parts = path.split('.');
  let v = scope;
  for (const p of parts) {
    if (v == null) return undefined;
    v = v[p];
  }
  return v;
}

function interp(str, scope) {
  return str.replace(HOLE, (_, p) => {
    const v = lookup(p, scope);
    return v == null ? '' : String(v);
  });
}

function attrValue(name, raw, scope) {
  const m = raw.match(ONLY_HOLE);
  if (m) return lookup(m[1], scope);
  if (raw === '' && BOOL_ATTRS.has(name)) return true;
  return interp(raw, scope);
}

function build(node, scope, key) {
  if (node.nodeType === 3) {
    const t = node.nodeValue;
    return t.indexOf('{{') >= 0 ? interp(t, scope) : t;
  }
  if (node.nodeType !== 1) return null;
  const tag = node.localName;
  if (tag === 'sc-for') {
    const list = attrValue('list', node.getAttribute('list') || '', scope) || [];
    const as = node.getAttribute('as') || 'item';
    const out = [];
    list.forEach((item, i) => {
      const s = Object.create(scope);
      s[as] = item;
      s.$index = i;
      let j = 0;
      node.childNodes.forEach((c) => {
        const r = build(c, s, c.nodeType === 1 ? i + ':' + j++ : undefined);
        if (Array.isArray(r)) out.push(...r);
        else if (r != null && r !== '') out.push(r);
      });
    });
    return out;
  }
  if (tag === 'sc-if') {
    const v = attrValue('value', node.getAttribute('value') || '', scope);
    return v ? kids(node, scope) : null;
  }
  const props = {};
  if (key != null) props.key = key;
  for (const a of Array.from(node.attributes)) {
    let name = a.name;
    if (name.startsWith('hint-')) continue;
    const v = attrValue(name, a.value, scope);
    if (BOOL_ATTRS.has(name) && (v === false || v == null)) continue;
    props[name] = v;
  }
  return h(tag, props, ...kids(node, scope));
}

function kids(node, scope) {
  const out = [];
  node.childNodes.forEach((c) => {
    const r = build(c, scope);
    if (Array.isArray(r)) out.push(...r);
    else if (r != null && r !== '') out.push(r);
  });
  return out;
}

export function mount() {
  const tpl = document.getElementById('dc-template');
  const src = document.getElementById('dc-script').textContent;
  const Component = new Function('DCLogic', src + '\nreturn Component;')(DCLogic);
  const inst = new Component({});
  const root = document.getElementById('root');
  let queued = false;
  const draw = () => {
    queued = false;
    const vals = inst.renderVals() || {};
    const tree = kids(tpl.content, vals);
    render(h('div', { style: 'display: contents' }, ...tree), root);
  };
  inst.__schedule = () => {
    if (queued) return;
    queued = true;
    queueMicrotask(draw);
  };
  draw();
  if (inst.componentDidMount) inst.componentDidMount();
  window.addEventListener('pagehide', () => { if (inst.componentWillUnmount) inst.componentWillUnmount(); });
}
