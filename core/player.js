import { ref } from 'vue';
import { wait } from '@as/utils';

export default class Player {
  constructor() {
    this._stacks = ref([]);
    this._map = {};
  }
  get lastWarp() {
    const stackLength = this._stacks.value.length;
    return stackLength ? this._stacks.value[stackLength - 1] : null;
  }
  register(name, ctx) {
    if (!name) throw Error(`warp: name of component is required.`);

    this._map[name] = {
      ctx,
    };
    ctx.emit('after-register');
  }
  unregister(name) {
    if (this.isVisible(name)) this.hide(name);
    delete this._map[name];
  }
  async show(name, args = {}) {
    if (!(name in this._map)) throw Error(`warp: '${name}' is Unregistered name.`);
    if (this._stacks.value.includes(name)) return;

    const { delay = 0 } = args;
    if (delay) await wait(delay);

    this._pushStack(name);
    this._map[name].ctx.emit('before-open', args);
    this._map[name].ctx.emit('update:model-value', true);
    document.documentElement.classList.add(`warp-${name}`.toLowerCase());
  }
  hide(name, options = {}) {
    if (!(name in this._map)) throw Error(`warp: '${name}' is Unregistered name.`);
    if (!this._stacks.value.includes(name)) return;

    const { intended = true } = options;
    let evt;
    evt = new CustomEvent('warp-hide', { cancelable: true, detail: { intended } });
    this._map[name].ctx.emit('before-close', evt);
    if (!evt.defaultPrevented) {
      this._removeStack(name);
      this._map[name].ctx.emit('update:model-value', false);
      document.documentElement.classList.remove(`warp-${name}`.toLowerCase());
    }
  }
  toggle(name) {
    if (this.isVisible(name)) this.hide(name);
    else this.show(name);
  }
  isActive() {
    return !!this._stacks.value.length;
  }
  isVisible(name) {
    return this._stacks.value.includes(name);
  }
  hideAll() {
    while (this._stacks.value.length) {
      this.hide(this.lastWarp);
    }
  }

  _pushStack(name) {
    this._stacks.value.push(name);
  }
  _removeStack(name) {
    this._stacks.value = this._stacks.value.filter((e) => e !== name);
  }
}
