import './eds-accordion-panel';

const tag = 'eds-accordion';
const html = '<slot></slot>';
const css = require('./eds-accordion.scss');

class EDSAccordionElement extends EDSElement {
  static get observedAttributes() {
    return ['multiple', 'wide'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.setAttribute('role', 'tablist');
    this.defineFlagProperties(['multiple', 'wide']);

    this.addEventListener('eds-accordion-panel-toggle', e => {
      e.stopPropagation();

      // Close other panels if needed
      if (!this.multiple && e.detail.active) {
        Array.from(this.querySelectorAll('eds-accordion-panel')).forEach(el => {
          if (el !== e.detail && el.active) el.active = false;
        });
      }
    });
  }
};

customElements.define(tag, EDSAccordionElement);
window.EDSAccordionElement = EDSAccordionElement;
