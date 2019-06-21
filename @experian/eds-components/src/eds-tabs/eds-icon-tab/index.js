const tag = 'eds-icon-tab';
const html = '<div style="display:none"><slot name="icon"></slot></div><slot></slot>';

class EDSIconTabElement extends EDSElement {
  static get observedAttributes() {
    return ['selected'];
  }

  init() {
    this._unlisteners = [];
    this.defineFlagProperties(['closable']);
    this.initShadowDOM(tag, html, '');
  }

  connectedCallback() {
    super.connectedCallback();
    this.addListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }

  addListeners() {
    const slotchangeListener = () =>
      this.dispatchEvent(new CustomEvent('eds-tab-label', { detail: this, bubbles: true, cancelable: true }));
    this.addEventListener('slotchange', slotchangeListener);
    this._unlisteners.push(() => this.removeEventListener('slotchange', slotchangeListener));
  }

  removeListeners() {
    this._unlisteners.forEach(unlisten => unlisten());
    this._unlisteners = [];
  }

  get icon() {
    return this.shadowRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
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

customElements.define(tag, EDSIconTabElement);
window.EDSIconTabElement = EDSIconTabElement;
