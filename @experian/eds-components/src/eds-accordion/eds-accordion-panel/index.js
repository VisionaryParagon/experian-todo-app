const tag = 'eds-accordion-panel';
const html = `
  <button class='eds-accordion-panel-header'>
    <span class='eds-accordion-panel-label'></span>
    <span class='eds-accordion-panel-sublabel'></span>
    <span class='eds-accordion-panel-caret'></span>
  </button>
  <div class='eds-accordion-panel-content'>
    <slot></slot>
  </div>
`;
const css = '';
const ANIMATION_MS = 150;

class EDSAccordionPanelElement extends EDSElement {
  static get observedAttributes() {
    return ['active', 'label', 'expandedLabel', 'subLabel'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.setAttribute('role', 'tab');

    this._refs = {
      header: this.$('.eds-accordion-panel-header'),
      label: this.$('.eds-accordion-panel-label'),
      subLabel: this.$('.eds-accordion-panel-sublabel'),
      caret: this.$('.eds-accordion-panel-caret'),
      content: this.$('.eds-accordion-panel-content')
    };

    this.toggle = this.toggle.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
  }

  connectedCallback() {
    this._refs.header.addEventListener('click', this.toggle);
    this._refs.header.addEventListener('focus', this._handleFocus);
    this._refs.header.addEventListener('blur', this._handleBlur);
  }

  disconnectedCallback() {
    this._refs.header.removeEventListener('click', this.toggle);
    this._refs.header.removeEventListener('focus', this._handleFocus);
    this._refs.header.removeEventListener('blur', this._handleBlur);
  }

  _handleFocus() {
    this.classList.add('focus');
  }

  _handleBlur(e) {
    this.classList.remove('focus');
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this._resolveLabel();
  }

  _resolveLabel() {
    if (this.active) {
      this._refs.label.innerHTML = this.expandedLabel || this.label;
    } else {
      this._refs.label.innerHTML = this.label;
    }
  }

  get expandedLabel() {
    return this.getAttribute('expandedlabel');
  }

  set expandedLabel(value) {
    this.setAttribute('expandedlabel', value);
    this._resolveLabel();
  }

  get subLabel() {
    return this.getAttribute('sublabel');
  }

  set subLabel(value) {
    this.setAttribute('sublabel', value);
    this._refs.subLabel.innerHTML = value;
  }

  toggle() {
    this.active = !this.active;
  }

  get active() {
    return this.flagAttributeIsTruthy(this.getAttribute('active'));
  }

  set active(value) {
    if (this.flagAttributeIsTruthy(value)) {
      this._refs.content.style.display = 'block'; // prevent tabbing to children
      this.setAttribute('aria-expanded', true);
      setTimeout(() => { this.classList.add('active'); });
    } else {
      setTimeout(() => { this._refs.content.style.display = 'none'; }, ANIMATION_MS);
      this.setAttribute('aria-expanded', false);
      this.classList.remove('active');
    }
    this.setOrRemoveFlagAttribute('active', value);
    this._resolveLabel();
    this.dispatchEvent(new CustomEvent('eds-accordion-panel-toggle', { detail: this, bubbles: true }));
  }
};

customElements.define(tag, EDSAccordionPanelElement);
window.EDSAccordionPanelElement = EDSAccordionPanelElement;
