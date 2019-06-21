const tag = 'eds-checkbox';
const html = `
  <label>
    <input type="checkbox" />
    <div class="box">
      <svg class="check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
      </svg>
    </div>
    <span class="label"></span>
  </label>`;
const css = require('./eds-checkbox.scss');

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

class EDSCheckboxElement extends EDSElement {
  static get observedAttributes() {
    return EDSCheckboxElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'checked',
      'label',
      { tabindex: 'tabIndex' }
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(mirroredInputAttributes.standard);
    this.defineFlagProperties(mirroredInputAttributes.flag);

    this._label = this.shadowRoot.querySelector('.label');
    this._input = this.shadowRoot.querySelector('input');
    this._box = this.shadowRoot.querySelector('.box');

    this.addEventListener('focus', () => this._box.classList.add('focus'));
    this.addEventListener('blur', () => this._box.classList.remove('focus'));
    this._input.addEventListener('change', () => this.checked = this._input.checked); // eslint-disable-line no-return-assign

    // Prevent two click events
    this._input.addEventListener('click', e => e.stopPropagation());

    this.bubbleShadowEvents(this._input, ['change']);
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    ~mirroredInputAttributes.all.indexOf(name) && this._input.setAttribute(name, value);
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    ~mirroredInputAttributes.all.indexOf(name) && this._input.removeAttribute(name);
  }

  focus() {
    this._input.focus();
  }

  blur() {
    this._input.blur();
  }

  toggle() {
    this.checked = !this.checked;
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this._label.innerText = value;
  }

  get checked() {
    return this._input.checked;
  }

  set checked(value) {
    // Removed attributes have a null value
    if (value === null) return;
    if (value === false) {
      this.removeAttribute('checked');
      this._input.checked = value;
    } else {
      this.setAttribute('checked');
      this._input.checked = true;
    }
  }

  get tabIndex() {
    return this._input.getAttribute('tabIndex');
  }

  set tabIndex(value) {
    // Removed attributes have a null value
    if (value === null) return;
    this._input.setAttribute('tabIndex', value);
    this.removeAttribute('tabIndex');
  }
}

customElements.define(tag, EDSCheckboxElement);
window.EDSCheckboxElement = EDSCheckboxElement;
