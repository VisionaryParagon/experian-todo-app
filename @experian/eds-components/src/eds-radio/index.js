const tag = 'eds-radio';
const html = `
  <label>
    <input type="radio" />
    <div class="radio-components"></div>
    <div class="label"></div>
  </label>`;
const css = require('./eds-radio.scss');

const mirroredInputAttributes = {
  standard: [
    'autofocus',
    'form',
    { formaction: 'formAction' },
    { formenctype: 'formEnctype' },
    { formmethod: 'formMethod' },
    { formnovalidate: 'formNoValidate' },
    { formtarget: 'formTarget' },
    'name',
    'value'
  ],
  flag: [
    'checked',
    'disabled'
  ],
  get all() {
    const { standard, flag } = this;
    return standard.concat(flag);
  }
};

class EDSRadioElement extends EDSElement {
  static get observedAttributes() {
    return EDSRadioElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'label'
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(mirroredInputAttributes.standard);
    this.defineFlagProperties(mirroredInputAttributes.flag);

    const input = this.$('input');
    const label = this.$('.label');
    this._refs = { input, label };

    input.addEventListener('focus', () => this.classList.add('focused'));
    input.addEventListener('blur', () => this.classList.remove('focused'));

    input.addEventListener('change', () => this.checked = input.checked); // eslint-disable-line no-return-assign
    input.addEventListener('click', e => e.stopPropagation());
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    ~mirroredInputAttributes.all.indexOf(name) && this._refs.input.setAttribute(name, value);
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    ~mirroredInputAttributes.all.indexOf(name) && this._refs.input.removeAttribute(name);
  }

  focus() {
    this._refs.input.focus();
  }

  blur() {
    this._refs.input.blur();
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this._refs.label.innerText = value;
  }
}

customElements.define(tag, EDSRadioElement);
window.EDSRadioElement = EDSRadioElement;
