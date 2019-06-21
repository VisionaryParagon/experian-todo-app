const tag = 'eds-modal';
const html = require('./eds-modal.html');
const css = require('./eds-modal.scss');

class EDSModalElement extends EDSElement {
  static get observedAttributes() {
    return EDSModalElement.normalizeObservedAttributes(
      [{ 'arialabelclose': 'ariaLabelClose' }, 'closable']
    );
  }

  get defaults() {
    return {
      ariaLabelClose: 'close'
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);

    this._refs = {
      box: this.$('.eds-modal-box'),
      closeIcon: this.$('.eds-close-modal')
    };

    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');

    // ensure aria-label for close icon has a label
    this.ariaLabelClose = this.ariaLabelClose;
  }

  connectedCallback() {
    this.addEventListener('click', e => {
      if (e.composedPath()[0] === this && this.closable) this.hide();
    });
    this._refs.closeIcon.addEventListener('click', () => {
      if (this.closable) this.hide();
    });
    this._refs.closeIcon.addEventListener('keydown', e => {
      if (e.key === 'Enter' && this.closable) this.hide();
    });
    this._handleKeydown = this._handleKeydown.bind(this);

    super.connectedCallback();
  }

  disconnectedCallback() {
    document.body.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _handleKeydown(e) {
    if (e.key === 'Escape' && this.closable) this.hide();
  }

  get ariaLabelClose() {
    return this.getAttribute('arialabelclose') || this.defaults.ariaLabelClose;
  }

  set ariaLabelClose(value) {
    this.setAttribute('arialabelclose', value);
    this._refs.closeIcon.setAttribute('aria-label', value);
  }

  get closable() {
    const attribute = this._refs.box.getAttribute('closable');
    return (attribute !== false && attribute !== 'false');
  }

  set closable(value) {
    this._refs.box.setAttribute('closable', value);
  }

  show() {
    document.body.classList.add('no-scroll');
    this.classList.add('eds-modal-show');
    document.body.addEventListener('keydown', this._handleKeydown);

    // Allow enough time for all css transitions to complete
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('show'));
    }, 200);
  }

  hide() {
    document.body.classList.remove('no-scroll');
    this.classList.remove('eds-modal-show');
    document.body.removeEventListener('keydown', this._handleKeydown);

    // Allow enough time for all css transitions to complete
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('hide'));
    }, 200);
  }
}

customElements.define(tag, EDSModalElement);
window.EDSModalElement = EDSModalElement;
