const tag = 'eds-breadcrumbs';
const html = require('./eds-breadcrumbs.html');
const css = require('./eds-breadcrumbs.scss');

class EDSBreadcrumbsElement extends EDSElement {
  static get observedAttributes() {
    return ['separator'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
  }

  get separator() {
    return this._separator || '/';
  }

  set separator(value) {
    this._separator = value;
  }

  connectedCallback() {
    Array.from(this.querySelectorAll('a')).forEach(el => {
      el.setAttribute('data-separator-symbol', this.separator);
    });

    super.connectedCallback();
  }
}

customElements.define(tag, EDSBreadcrumbsElement);
window.EDSBreadcrumbsElement = EDSBreadcrumbsElement;
