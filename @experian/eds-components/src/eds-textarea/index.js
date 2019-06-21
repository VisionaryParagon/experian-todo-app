const tag = 'eds-textarea';
const css = require('./eds-textarea.scss');
const html = require('./eds-textarea.html');

const mirroredInputAttributes = {
  default: [
    'autofocus',
    'cols',
    'dirname',
    'form',
    { formaction: 'formAction' },
    { formenctype: 'formEnctype' },
    { formmethod: 'formMethod' },
    { formnovalidate: 'formNoValidate' },
    { formtarget: 'formTarget' },
    'maxlength',
    'name',
    'placeholder',
    'rows',
    'wrap'
  ],
  flags: [
    'disabled',
    'readonly',
    'required'
  ],
  get all() {
    return this.default.concat(this.flags);
  }
};

class EDSTextareaElement extends EDSElement {
  static get observedAttributes() {
    return EDSTextareaElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'label', 'value', 'mode'
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      label: this.$('label'),
      inputWrap: this.$('.input-wrap'),
      input: this.$('textarea')
    };
    this.defineDefaultProperties(mirroredInputAttributes.default);
    this.defineFlagProperties(mirroredInputAttributes.flags);

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#Methods
    this.proxyNativeMethods([
      'focus', 'blur', 'select', 'click', 'setSelectionRange',
      'setCustomValidity', 'checkValidity', 'reportValidity'
    ], this._refs.input);
  }

  connectedCallback() {
    this._refs.input.addEventListener('focus', () => this._refs.inputWrap.classList.add('focus'));
    this._refs.input.addEventListener('blur', () => this._refs.inputWrap.classList.remove('focus'));
    this.bubbleShadowEvents(this._refs.input, ['change']);

    super.connectedCallback();
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    this._refs.input.setAttribute(name, value);
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    this._refs.input.removeAttribute(name);
  }

  get label() {
    return this.shadowRoot.querySelector('label').textContent;
  }

  set label(value) {
    if (value) this._refs.label.classList.add('show');
    else this._refs.label.classList.remove('show');
    this._refs.label.textContent = value;
  }

  get value() {
    return this._refs.input.value;
  }

  set value(val) {
    this._refs.input.value = val;
  }
}

customElements.define(tag, EDSTextareaElement);
window.EDSTextareaElement = EDSTextareaElement;
