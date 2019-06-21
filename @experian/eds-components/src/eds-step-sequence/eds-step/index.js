const tag = 'eds-step';
const html = require('./eds-step.html');
const css = require('./eds-step.scss');

customElements.define(tag, class EDSStep extends EDSElement {
  static get observedAttributes() {
    return ['active'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.setAttribute('role', 'tab');
    this.setAttribute('aria-disabled', true);
  }

  set active(value) {
    this.setOrRemoveFlagAttribute('active', value);
    this._active = this.flagAttributeIsTruthy(value);

    this.setOrRemoveFlagAttribute('aria-selected', this._active);
    this.setOrRemoveFlagAttribute('aria-disabled', !this._active);
  }

  get active() {
    return this._active;
  }
});
