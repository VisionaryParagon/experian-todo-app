const tag = 'doc-header';
const template = '<slot></slot>';
const css = require('./doc-header.scss');

customElements.define(tag, class _ extends EDSElement {
  init() {
    this.initShadowDOM(tag, template, css);
  }
});
