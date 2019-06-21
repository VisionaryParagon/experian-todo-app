const tag = 'eds-tag';
const html = '<slot></slot>';
const css = require('./eds-tag.scss');

class EDSTagElement extends EDSElement {
  static get observedAttributes() {
    return EDSTagElement.normalizeObservedAttributes(['motif']);
  };

  init() {
    this.initShadowDOM(tag, html, css);
  };

  get tag() {
    return this.getAttribute('tag') || 'default';
  }

  set tag(value) {
    this.setAttribute('tag', value);
  }
}

customElements.define(tag, EDSTagElement);
window.EDSTagElement = EDSTagElement;
