const tag = 'mdn-doc-link';
const baseUrl = 'https://developer.mozilla.org/en-US/docs/Web/';
const template = `<a target="_blank"><slot></slot></a>`;

customElements.define(tag, class _ extends EDSElement {
  static get observedAttributes() {
    return ['url'];
  }

  init() {
    this.initShadowDOM(tag, template);
    this._anchor = this.shadowRoot.querySelector('a');
  }

  get url() {
    return this._anchor.href;
  }

  set url(value) {
    this._anchor.href = `${baseUrl}${value}`;
  }
});
