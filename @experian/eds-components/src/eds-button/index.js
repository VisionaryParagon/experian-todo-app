import { addStyle } from '../eds-core/styles';

const tag = 'eds-button';
const html = '<button><eds-icon class="eds-button-icon"></eds-icon><slot></slot></button>';
const css = require('./eds-button.scss');

// Expose CSS for CSS only use.
addStyle('eds-button', css);

const mirroredButtonAttributes = [
  'autofocus',
  'form',
  { formaction: 'formAction' },
  { formenctype: 'formEnctype' },
  { formmethod: 'formMethod' },
  { formnovalidate: 'formNoValidate' },
  { formtarget: 'formTarget' },
  'name',
  'type',
  'value'
];

class EDSButtonElement extends EDSElement {
  static get observedAttributes() {
    return EDSButtonElement.normalizeObservedAttributes(mirroredButtonAttributes.concat([
      'disabled', 'motif', 'icon', 'inverse', { iconlibrary: 'iconLibrary' },
      { iconplacement: 'iconPlacement' }
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      button: this.$('button'),
      icon: this.$('.eds-button-icon')
    };

    this.defineDefaultProperties(mirroredButtonAttributes);
    this.defineFlagProperties(['inverse']);

    if (console && console.warn) console.warn('using eds-button as an element is deprecated, apply as an attribute instead.');
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    if (name !== 'id') this._refs.button.setAttribute(name, value);
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    if (name !== 'id') this._refs.button.removeAttribute(name);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    value || value === '' ? this.setAttribute('disabled', value) : this.removeAttribute('disabled');
  }

  get motif() {
    return this.getAttribute('motif') || 'basic';
  }

  set motif(value) {
    this.setAttribute('motif', value);
  }

  get icon() {
    return this._refs.icon.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
    this._refs.icon.setAttribute('icon', value);
  }

  get iconLibrary() {
    return this._refs.icon.getAttribute('library');
  }

  set iconLibrary(value) {
    this.setAttribute('iconLibrary', value);
    this._refs.icon.setAttribute('library', value);
  }

  get iconPlacement() {
    return this.classList._refs.button.contains('eds-icon-right');
  }

  set iconPlacement(value) {
    if (value === 'right') this._refs.button.classList.add('eds-icon-right');
    else this._refs.button.classList.remove('eds-icon-right');
  }
};

customElements.define(tag, EDSButtonElement);
window.EDSButtonElement = EDSButtonElement;
