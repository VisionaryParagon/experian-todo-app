const tag = 'eds-token';
const html = `<slot></slot><button class="close">&times;</button>`;
const css = require('./eds-token.scss');

class EDSTokenElement extends EDSElement {
  static get observedAttributes() {
    return ['closable'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
  }

  close(e) {
    const closeEvent = new CustomEvent('close', {
      bubbles: true
    });

    this.dispatchEvent(closeEvent);
  }

  connectedCallback() {
    this.$('.close').addEventListener('click', this.close.bind(this));
    super.connectedCallback();
  }

  set closable(value) {
    if (this.flagAttributeIsTruthy(value)) {
      this.$('.close').classList.add('show');
    } else {
      this.$('.close').classList.remove('show');
    }

    this.setOrRemoveFlagAttribute('closable', value);
  }

  get closable() {
    return this.hasAttribute('closable');
  }
}

customElements.define(tag, EDSTokenElement);
window.EDSTokenElement = EDSTokenElement;
