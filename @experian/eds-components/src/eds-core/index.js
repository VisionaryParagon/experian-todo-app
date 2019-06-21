import * as Popper from 'popper.js/dist/umd/popper.js';
import { addStyle } from './styles';
const edsGlobalStyles = require('../styles/eds-global-styles.scss');
const edsRequiredStyles = require('../styles/eds-required-styles.scss');

require('@babel/polyfill');

if (window.customElements) window.customElements.forcePolyfill = true;
window.ShadyDOM = {force: true};
require('@webcomponents/webcomponentsjs/webcomponents-bundle');
require('./closest.js');

// eds-dropdown, eds-tooltip, eds-popover...
// Maybe optimize this include later
window.Popper = Popper.default;
window.EDSElement = require('./element');
window.hybrids = require('hybrids');

// Component configuration
const defaults = {
  useGlobalStyles: true,
  hideUntilReady: false
};
window.EDS = Object.assign(defaults, window.EDS);

// Global Styles
addStyle('eds-required-styles', edsRequiredStyles);
if (window.EDS.useGlobalStyles) {
  addStyle('eds-global-styles', edsGlobalStyles);
  document.querySelector('html').classList.add('eds');
}

if (window.EDS.hideUntilReady) {
  document.querySelector('html').classList.add('eds-hide-content');
  window.addEventListener('WebComponentsReady', () => {
    document.querySelector('html').classList.remove('eds-hide-content');
  });
}
