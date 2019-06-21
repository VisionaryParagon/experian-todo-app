import { uniqueId } from '../eds-core/uniqueId';
const tag = 'eds-textbox';
const css = require('./eds-textbox.scss');
const html = require('./eds-textbox.html');

const mirroredInputAttributes = {
  default: [
    'autocomplete',
    'autofocus',
    'form',
    { formaction: 'formAction' },
    { formenctype: 'formEnctype' },
    { formmethod: 'formMethod' },
    { formnovalidate: 'formNoValidate' },
    { formtarget: 'formTarget' },
    'inputmode',
    'list',
    'max',
    'maxlength',
    'min',
    'minlength',
    'name',
    'pattern',
    'spellcheck'
  ],
  flags: [
    'borderless',
    'disabled',
    'readonly',
    'required'
  ],
  get all() {
    return this.default.concat(this.flags);
  }
};

class EDSTextboxElement extends EDSElement {
  static get observedAttributes() {
    return EDSTextboxElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'label', 'placeholder', 'value', 'info', 'warning', 'error', 'mode'
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      label: this.$('label'),
      inputWrap: this.$('.input-wrap'),
      input: this.$('input'),
      inline: this.$('.eds-textbox-inline'),
      inlineSlot: this.$('.eds-textbox-inline-slot'),
      prepend: this.$('.eds-textbox-prepend'),
      prependSlot: this.$('.eds-textbox-prepend-slot'),
      messages: this.$('.eds-textbox-messages'),
      errorText: this.$('.error-text'),
      warningText: this.$('.warning-text'),
      infoText: this.$('.info-text')
    };
    this.defineDefaultProperties(mirroredInputAttributes.default);
    this.defineFlagProperties(mirroredInputAttributes.flags);

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Methods
    this.proxyNativeMethods([
      'focus', 'blur', 'select', 'click', 'setSelectionRange', 'setRangeText',
      'setCustomValidity', 'checkValidity', 'reportValidity'
    ], this._refs.input);

    this._refs.prependSlot.addEventListener('slotchange', () => {
      this._handlePrependSlot(this._refs.prependSlot.assignedNodes());
    });
    this._refs.inlineSlot.addEventListener('slotchange', () => {
      this._handleInlineSlot(this._refs.inlineSlot.assignedNodes());
    });

    const prepareMessageId = type => {
      const id = uniqueId();
      this._refs[type + 'Text'].setAttribute('id', id);
      return id;
    };

    this._refs.label.setAttribute('id', uniqueId());
    this._refs.input.setAttribute('aria-describedby', `${prepareMessageId('error')} ${prepareMessageId('warning')} ${prepareMessageId('info')}`);
  }

  connectedCallback() {
    this._refs.input.addEventListener('focus', () => this._refs.inputWrap.classList.add('focus'));
    this._refs.input.addEventListener('blur', () => this._refs.inputWrap.classList.remove('focus'));
    this.bubbleShadowEvents(this._refs.input, ['change']);

    super.connectedCallback();
  }

  _handlePrependSlot(els) {
    if (els.length) this._refs.prepend.classList.add('eds-show');
    else this._refs.prepend.classList.remove('eds-show');
  }

  _handleInlineSlot(els) {
    if (els.length) this._refs.inline.classList.add('eds-show');
    else this._refs.inline.classList.remove('eds-show');
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
    return this._refs.label.textContent;
  }

  set label(value) {
    if (value) this._refs.label.classList.add('show');
    else this._refs.label.classList.remove('show');
    this._refs.label.textContent = value;
    this._resolveAriaLabel();
  }

  get placeholder() {
    return this._refs.input.getAttribute('placeholder');
  }

  set placeholder(value) {
    this._refs.input.setAttribute('placeholder', value);
    this._resolveAriaLabel();
  }

  _resolveAriaLabel() {
    const input = this._refs.input;
    const labelledBy = this.getAttribute('aria-labelledby');
    if (labelledBy) input.setAttribute('aria-labelledby', labelledBy);
    else if (this.label) input.setAttribute('aria-labelledby', this._refs.label.getAttribute('id'));
    else if (this.placeholder) input.setAttribute('aria-label', this.placeholder);
  }

  get value() {
    return this._refs.input.value;
  }

  set value(val) {
    this._refs.input.value = val;
  }

  _refreshMessages() {
    if (this.error || this.warning || this.info) this._refs.messages.style.display = 'block';
    else this._refs.messages.style.display = 'none';
  }

  _getStatus(attr) {
    return this.getAttribute(attr);
  }

  _setStatus(attr, value) {
    if (!value) {
      this.removeAttribute(attr);
    } else {
      this.setAttribute(attr, value);
    }
    this._refs[attr + 'Text'].innerHTML = typeof value === 'string' ? value : '';
    this._refreshMessages();
  }

  get error() {
    return this._getStatus('error');
  }

  set error(value) {
    this._setStatus('error', value);
  }

  get warning() {
    return this._getStatus('warning');
  }

  set warning(value) {
    this._setStatus('warning', value);
  }

  get info() {
    return this._getStatus('info');
  }

  set info(value) {
    this._setStatus('info', value);
  }

  get mode() {
    return this.getAttribute('mode');
  }

  set mode(value) {
    this.setAttribute('mode', value);
    switch (value) {
      case 'password':
        this._refs.input.type = 'password';
        break;
      default:
        this._refs.input.type = 'text';
        break;
    }
  }
}

customElements.define(tag, EDSTextboxElement);
window.EDSTextboxElement = EDSTextboxElement;
