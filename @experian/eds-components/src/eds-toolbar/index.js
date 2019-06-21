const tag = 'eds-toolbar';
const html = '<slot></slot>';
const css = require('./eds-toolbar.scss');

class EDSToolbarElement extends EDSElement {
  init() {
    this.initShadowDOM(tag, html, css);
  }
}

customElements.define(tag, EDSToolbarElement);
window.EDSToolbarElement = EDSToolbarElement;
