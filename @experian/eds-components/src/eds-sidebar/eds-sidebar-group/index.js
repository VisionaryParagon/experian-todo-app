const tag = 'eds-sidebar-group';
const html = require('./eds-sidebar-group.html');
const css = require('./eds-sidebar-group.scss');
const COLLAPSED_HEIGHT = '42px';
const ANIMATION_MS = 200;

class EDSSidebarGroupElement extends EDSElement {
  static get observedAttributes() {
    return ['collapsed', 'icon', 'iconLibrary'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = { icon: this.$('eds-icon') };
  }

  get icon() {
    return this._refs.icon.getAttribute('icon');
  }

  set icon(val) {
    this._refs.icon.setAttribute('icon', val);
  }

  get iconLibrary() {
    return this._refs.icon.getAttribute('library');
  }

  set iconLibrary(value) {
    this.setAttribute('iconLibrary', value);
    this._refs.icon.setAttribute('library', value);
  }

  setHeightSnapshot() {
    const height = `${this.offsetHeight}px`;
    this._heightSnapshot = height;
    this.style.height = height;
  }

  get collapsed() {
    return this.hasAttribute('collapsed');
  }

  set collapsed(value) {
    this.setOrRemoveFlagAttribute('collapsed', value);

    if (this.flagAttributeIsTruthy(value)) {
      // Required for animations to take correctly
      setTimeout(() => this.style.height = COLLAPSED_HEIGHT); // eslint-disable-line no-return-assign
    } else {
      this.style.height = this._heightSnapshot || this.style.height;
      setTimeout(() => {
        this.style.height = '';
        this._heightSnapshot = null;
      }, ANIMATION_MS);
    }
  }
};

customElements.define(tag, EDSSidebarGroupElement);
window.EDSSidebarGroupElement = EDSSidebarGroupElement;
