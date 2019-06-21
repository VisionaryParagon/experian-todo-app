const tag = 'eds-stage';
const html = require('./eds-stage.html');
const css = require('./eds-stage.scss');

customElements.define(tag, class _ extends EDSElement {
  static get observedAttributes() {
    return ['active'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
  }

  set active(value) {
    this.setOrRemoveFlagAttribute('active', value);
    this._active = this.flagAttributeIsTruthy(value);
  }

  get active() {
    return this._active;
  }
});
