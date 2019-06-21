import { materialIconFontRenderer, farSVGRenderer, fasSVGRenderer } from './renderers';
const tag = 'eds-icon';
const html = "<i class='api-icon-element'></i>";
const css = require('./eds-icon.scss');

window.EDS.icons = window.EDS.icons || {};
window.EDS.icons.renderers = window.EDS.icons.renderers || {};

// Provide some default renderers
window.EDS.icons.renderers[materialIconFontRenderer.name] = materialIconFontRenderer;
window.EDS.icons.renderers[farSVGRenderer.name] = farSVGRenderer;
window.EDS.icons.renderers[fasSVGRenderer.name] = fasSVGRenderer;

// Disallow autoreplace if font awesome is used, this must be included before fontawesome
window.FontAwesomeConfig = {
  autoReplaceSvg: false
};

class EDSIconElement extends EDSElement {
  static get observedAttributes() {
    return ['border', 'icon', 'library', 'spin'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._iconEl = this.shadowRoot.querySelector('i');
    this.defineFlagProperties(['spin', 'border']);
  }

  _reset() {
    this.shadowRoot.innerHTML = html;
    this._iconEl = this.shadowRoot.querySelector('i');
  }

  get icon() {
    return this._icon;
  }

  set icon(val) {
    this._icon = val;
    this._render();
  }

  _render() {
    // set the library attribute if not specified
    if (!this._library) {
      if (!this.getAttribute('library')) this.setAttribute('library', window.EDS.icons.defaultLibrary);
      else this._library = this.getAttribute('library');
    }

    const renderer = window.EDS.icons.renderers[this._library];
    if (!renderer) throw new Error(`We couldn't find the ${this._library} renderer. Did you register it?`);

    this._reset();
    renderer.render(this._icon, this._iconEl, this);
  }

  get library() {
    return this._library;
  }

  set library(val) {
    this._library = val;
    this.setAttribute('library', val);
    this._render();
  }
}

customElements.define(tag, EDSIconElement);
window.EDSIconElement = EDSIconElement;
