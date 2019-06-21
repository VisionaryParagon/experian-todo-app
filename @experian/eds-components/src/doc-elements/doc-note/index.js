const tag = 'doc-note';
const template = '<slot></slot>';
const css = require('./doc-note.scss');

customElements.define(tag, class _ extends EDSElement {
  static get observedAttributes() {
    return ['motif'];
  }

  init() {
    this.initShadowDOM(tag, template, css);
  }
});
