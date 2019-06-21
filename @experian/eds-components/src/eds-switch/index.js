const tag = 'eds-switch';
const html = `
  <label>
    <div class="label"></div>
    <input type="checkbox" />
    <div class="switch-components api-switch">
      <div class="outline"></div>
      <div class="marker"></div>
    </div>
  </label>`;
const css = require('./eds-switch.scss');

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
    'disabled'
  ],
  get all() {
    const { standard, flag } = this;
    return standard.concat(flag);
  }
};

class EDSSwitchElement extends EDSElement {
  static get observedAttributes() {
    return EDSSwitchElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'checked',
      'label',
      { tabindex: 'tabIndex' }
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(mirroredInputAttributes.standard);
    this.defineFlagProperties(mirroredInputAttributes.flag);

    const input = this.$('input');
    const label = this.$('.label');
    const components = this.$('.switch-components');
    this._refs = { input, label, components };

    this.addEventListener('focus', () => components.classList.add('focus'));
    this.addEventListener('blur', () => components.classList.remove('focus'));

    input.addEventListener('change', () => this.checked = input.checked); // eslint-disable-line no-return-assign
    input.addEventListener('click', e => e.stopPropagation());

    this.bubbleShadowEvents(this._refs.input, ['change']);
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

  toggle() {
    this.checked = !this.checked;
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this._refs.label.innerText = value;
  }

  get checked() {
    return this._refs.input.checked;
  }

  set checked(value) {
    // Removed attributes have a null value
    if (value === null) return;
    if (value === false) {
      this.removeAttribute('checked');
      this._refs.input.checked = value;
    } else {
      this.setAttribute('checked');
      this._refs.input.checked = true;
    }
  }

  get tabIndex() {
    return this._refs.input.getAttribute('tabIndex');
  }

  set tabIndex(value) {
    // Removed attributes have a null value
    if (value === null) return;
    this._refs.input.setAttribute('tabIndex', value);
    this.removeAttribute('tabIndex');
  }
}

customElements.define(tag, EDSSwitchElement);
window.EDSSwitchElement = EDSSwitchElement;
