import { deprecate } from '../../eds-core/deprecate';
const tag = 'eds-tab';
const html = '<slot></slot>';
const css = require('./eds-tab.scss');

class EDSTabElement extends EDSElement {
  static get observedAttributes() {
    return ['active', 'closable', 'selected', 'label'];
  }

  init() {
    this.defineFlagProperties(['closable']);
    this.initShadowDOM(tag, html, css);
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this.dispatchEvent(new CustomEvent('eds-tab-label', { detail: this, bubbles: true, cancelable: true }));
  }

  set active(value) {
    deprecate('active', "use 'selected' instead");
    this.selected = value;
  }

  get active() {
    return this._selected;
  }

  set selected(value) {
    const val = this.flagAttributeIsTruthy(value);

    if (val === this.selected) return;

    if (val) {
      this.setAttribute('aria-hidden', false);
      this._selected = true;
      this.dispatchEvent(new CustomEvent('eds-tab-select', { detail: this, bubbles: true, cancelable: true }));
    } else {
      this.setAttribute('aria-hidden', true);
      this._selected = false;
    }

    this.setOrRemoveFlagAttribute('selected', val);
  }

  get selected() {
    return this._selected || false;
  }
};

customElements.define(tag, EDSTabElement);
window.EDSTabElement = EDSTabElement;
