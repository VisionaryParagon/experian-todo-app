import { deprecate } from '../eds-core/deprecate';
import './eds-stage';

const tag = 'eds-progress-indicator';
const html = require('./eds-progress-indicator.html');
const css = require('./eds-progress-indicator.scss');

class EDSProgressIndicatorElement extends EDSElement {
  init() {
    this.initShadowDOM(tag, html, css);
    deprecate('eds-progress-indicator', 'use eds-step-sequence instead');
  }
}

customElements.define(tag, EDSProgressIndicatorElement);
window.EDSProgressIndicatorElement = EDSProgressIndicatorElement;
