const tag = 'eds-primary-header';
const html = require('./eds-primary-header.html');
const css = require('./eds-primary-header.scss');

const DEFAULT_MOTIF = 'light';
const DEFAULT_TITLE = 'Application';
const DEFAULT_LOGO_HREF = '#';
const DEFAULT_LOGO_TEXT = 'Home';

class EDSPrimaryHeaderElement extends EDSElement {
  static get observedAttributes() {
    return ['motif', 'title', 'logoHref', 'logoText'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      logoAnchor: this.$('.eds-logo a'),
      logoText: this.$('.eds-logo a .sr-only'),
      title: this.$('.eds-application-name'),
      navigation: this.$('.eds-primary-header-nav'),
      icons: this.$('.eds-primary-header-icons')
    };

    this.defineDefaultProperties(['motif']);
    this.motif = this.motif || DEFAULT_MOTIF;
    this.title = this.title || DEFAULT_TITLE;
    this.logoHref = this.logoHref || DEFAULT_LOGO_HREF;
    this.logoText = this.logoText || DEFAULT_LOGO_TEXT;
    this._refs.navigation.addEventListener('click', this._onNavigationClick.bind(this));
    this._refs.icons.addEventListener('click', this._onIconClick.bind(this));
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
    this._refs.title.innerHTML = val;
  }

  get logoHref() {
    return this.getAttribute('logoHref');
  }

  set logoHref(val) {
    this._refs.logoAnchor.setAttribute('href', val);
    this.setAttribute('logoHref', val);
  }

  get logoText() {
    return this.getAttribute('logoText');
  }

  set logoText(val) {
    this._refs.logoText.innerHTML = val;
    this.setAttribute('logoText', val);
  }

  get selectedNavigationElement() {
    return this._refs.navigation.querySelector('a[selected]');
  }

  set selectedNavigationElement(el) {
    if (!this.contains(el)) throw new Error(`You can only select children of ${tag}`);
    this._deselectNavigationElements();
    // Ensure the top level anchor tag gets selected
    if (el.tagName !== 'A') el = el.closest('a');
    el.setAttribute('selected');
  }

  _deselectNavigationElements() {
    // Need to query from the host in order to find slotted content
    Array.from(this.querySelectorAll('.eds-primary-header-nav a')).forEach(el => {
      el.removeAttribute('selected');
    });
  }

  _onNavigationClick(e) {
    this.selectedNavigationElement = e.target;
    this.dispatchEvent(new CustomEvent('navigationclick', { detail: e.target }));
  }

  _onIconClick(e) {
    this.dispatchEvent(new CustomEvent('iconclick', { detail: e.target }));
  }
}

customElements.define(tag, EDSPrimaryHeaderElement);
window.EDSPrimaryHeaderElement = EDSPrimaryHeaderElement;
