const tag = 'doc-guideline';
const template = `
  <div class="doc-guideline-example">
    <slot name="example"></slot>
  </div>
  <div class="doc-guideline-motif"></div>
  <div class='doc-guideline-guideline'>
    <slot name="guideline"></slot>
  </div>
`;
const css = require('./doc-guideline.scss');

customElements.define(tag, class _ extends EDSElement {
  static get observedAttributes() {
    return ['motif'];
  }

  init() {
    this.initShadowDOM(tag, template, css);

    this._refs = {
      motif: this.$('.doc-guideline-motif')
    };

    this.motif = this.motif;
  }

  get motif() {
    return this.getAttribute('motif') || 'success';
  }

  set motif(value) {
    this.setAttribute('motif', value);

    switch (value) {
      case 'error':
        this._refs.motif.innerHTML = 'DON\'T';
        break;
      case 'warning':
        this._refs.motif.innerHTML = 'CAUTION';
        break;
      case 'success':
      default:
        this._refs.motif.innerHTML = 'DO';
    }
  }
});
