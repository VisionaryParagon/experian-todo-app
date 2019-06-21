import { addStyle } from '../eds-core/styles';

const tag = 'eds-card';
const html = '<slot></slot>';
const css = require('./eds-card.scss');

// Expose CSS for CSS only use.
addStyle(tag, css);

class EDSCardElement extends EDSElement {
  static get observedAttributes() {
    return ['background'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    if (console && console.warn) console.warn('using eds-card as an element is deprecated, apply as a class or attribute instead.');
  }
};

customElements.define(tag, EDSCardElement);
window.EDSCardElement = EDSCardElement;
