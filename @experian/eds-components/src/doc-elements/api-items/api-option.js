import APIElement from './api-element';
// HACK: styles for all api elements are hoisted only once in api-option.
const css = require('./api-item.scss');
const tag = 'api-option';
const template = `
  <span class='api-name name'></span>
  <span class='required'></span>:
  <span class='type option-type'></span>
  <span class='default'></span>
  <span class='deprecated'></span>
  <span class='property-only'></span>
  <span class='attribute-only'></span>
  <span class='read-only'></span>
`;

customElements.define(tag, class _ extends APIElement {
  init() {
    super.init();
    this.initShadowDOM(tag, this.getTemplate(template), css);
  }

  set default(val) {
    const el = this.shadowRoot.querySelector('.default');
    el.innerHTML = `= ${val}`;
    el.style.display = 'inline-block';
  }

  set propertyOnly(val) {
    const el = this.shadowRoot.querySelector('.property-only');
    if (!el) return;
    el.innerHTML = 'Property Only';
    el.style.display = 'inline-block';
  }

  set attributeOnly(val) {
    const el = this.shadowRoot.querySelector('.attribute-only');
    if (!el) return;
    el.innerHTML = 'Attribute Only';
    el.style.display = 'inline-block';
  }

  set readOnly(val) {
    const el = this.shadowRoot.querySelector('.read-only');
    if (!el) return;
    el.innerHTML = 'Read Only';
    el.style.display = 'inline-block';
  }
});
