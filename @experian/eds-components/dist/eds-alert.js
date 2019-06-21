/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__ = __webpack_require__(1);

const tag = 'eds-alert';
const html = __webpack_require__(2);
const css = __webpack_require__(3);

const ANIMATION_TRANSITION_MS = 200;
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["a" /* setEDSValue */])('alerts.defaults.timeout', 8000);
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["a" /* setEDSValue */])('alerts.create', (html, options) => {
  const alert = document.createElement('eds-alert');
  alert.innerHTML = html;
  Object.keys(options).forEach(key => {
    alert[key] = options[key];
  });
  alert.setAttribute('hidden', true);
  alert.addEventListener('hide', () => alert.destroy());
  document.body.appendChild(alert);
  setTimeout(() => alert.show(), 10);
  return alert;
});

class EDSAlertElement extends EDSElement {
  static get observedAttributes() {
    return EDSAlertElement.normalizeObservedAttributes(
      [{ 'arialabelclose': 'ariaLabelClose' }, 'background', 'closable', 'hidden', 'region', 'timeout', 'motif']
    );
  }

  get defaults() {
    return {
      ariaLabelClose: 'close',
      timeout: window.EDS.alerts.defaults.timeout
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(['background', 'timeout', 'motif']);
    this.defineFlagProperties(['closable', 'hidden']);

    this._refs = {
      sidebar: this.$('.eds-alert-sidebar'),
      content: this.$('.eds-alert-content'),
      closeIcon: this.$('.eds-alert-close-icon')
    };

    // ensure aria-label for close icon has a label
    this.ariaLabelClose = this.ariaLabelClose;
  }

  connectedCallback() {
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this._addCloseIconHandlers();

    if (this.region) this._appendToRegion();

    super.connectedCallback();
  }

  get ariaLabelClose() {
    return this.getAttribute('arialabelclose') || this.defaults.ariaLabelClose;
  }

  set ariaLabelClose(value) {
    this.setAttribute('arialabelclose', value);
    this._refs.closeIcon.setAttribute('aria-label', value);
  }

  get region() {
    return this.getAttribute('region');
  }

  set region(value) {
    this.setAttribute('region', value);
    // enforce announcement to screen readers:
    this.setAttribute('role', 'alert');
    this._appendToRegion();
  }

  show() {
    // Ensure the alert is visible
    this.removeAttribute('hidden');
    // Kick off a timeout
    this._setTimeout();
    // Trigger a change event after the alert is shown (post css transition)
    setTimeout(() => this.dispatchEvent(new CustomEvent('show')), ANIMATION_TRANSITION_MS);
  }

  hide() {
    // Ensure the alert is hidden
    this.setAttribute('hidden', true);
    // Trigger a change event after the alert is hidden (post css transition)
    setTimeout(() => this.dispatchEvent(new CustomEvent('hide')), ANIMATION_TRANSITION_MS);
  }

  destroy() {
    // Trigger a change event when the alert has been destroyed
    this.dispatchEvent(new CustomEvent('destroy'));
    this.parentNode.removeChild(this);
  }

  // Private methods
  _addCloseIconHandlers() {
    this._refs.closeIcon.addEventListener('click', () => {
      if (this.closable) this.hide();
    });
    this._refs.closeIcon.addEventListener('keydown', e => {
      if (e.key === 'Enter' && this.closable) this.hide();
    });
  }

  _setTimeout() {
    // A timeout only applies to "regional" alerts
    if (this.region) {
      if (this.timeout === 'never') return;
      const timeout = parseInt(this.timeout, 10);
      setTimeout(() => this.hide(), timeout);
    }
  }

  // Wrap alerts from each region in a container
  _appendToRegion() {
    // Ignore attempts to append prior to connectedCallback
    // This method will be called manually at that time
    if (!this.parentNode) return;

    const regionContainerClass = `eds-alert-region-${this.region}`;
    let regionContainer = document.querySelector(`.${regionContainerClass}`);

    // Do nothing if the alert is already in the region
    if (regionContainer && regionContainer.contains(this)) return;

    if (!regionContainer) {
      // Create wrapper container
      regionContainer = document.createElement('div');
      regionContainer.classList.add(regionContainerClass);
      document.body.appendChild(regionContainer);
    }

    // Move this alert element into wrapper (fires connectedCallback)
    if (!this.appending) {
      this.appending = true;
      regionContainer.appendChild(this);
      this.appending = false;
    }
  }
}

customElements.define(tag, EDSAlertElement);
window.EDSAlertElement = EDSAlertElement;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setEDSValue;
/* unused harmony export deleteEDSValue */
const getPathLeaf = function(path) {
  let obj = window.EDS;
  const parts = path.split('.');

  while (parts.length > 1) {
    const part = parts.shift();
    obj[part] = obj[part] || {};
    obj = obj[part];
  }

  return obj;
};

function setEDSValue(path, value) {
  const parts = path.split('.');
  const obj = getPathLeaf(path);

  obj[parts.pop()] = value;
}

function deleteEDSValue(path) {
  const parts = path.split('.');
  const obj = getPathLeaf(path.slice(0, -1));

  delete obj[parts.pop()];
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<div class=\"eds-alert-sidebar\"></div>\n<button class=\"eds-alert-close-icon\" type=\"button\" aria-label=\"\">&times;</button>\n<div class=\"eds-alert-content api-alert\"><slot></slot></div>"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-alert {\n  transition: transform 100ms ease 0ms, opacity 75ms ease 25ms, max-height 100ms ease 0ms, margin 100ms ease 0ms; }\n  eds-alert[hidden] {\n    transition: transform 250ms ease 0ms, opacity 75ms ease 0ms, max-height 250ms ease 0ms, margin 250ms ease 0ms; }\n\neds-alert {\n  display: flex;\n  border-radius: 4px;\n  background-color: #ffffff;\n  overflow: hidden;\n  max-height: 500px;\n  margin: 16px 0;\n  opacity: 1;\n  transform: scale(1); }\n  eds-alert[border] .eds-alert-content {\n    border-top: 1px solid #d8d8d8;\n    border-right: 1px solid #d8d8d8;\n    border-bottom: 1px solid #d8d8d8;\n    border-top-right-radius: 4px;\n    border-bottom-right-radius: 4px; }\n  eds-alert[background=\"gray\"]:not([region]) {\n    background-color: #f6f6f6;\n    border: none; }\n  eds-alert[motif] .eds-alert-sidebar {\n    display: flex;\n    position: relative;\n    min-width: 28px;\n    justify-content: center;\n    padding-top: 10px; }\n    eds-alert[motif] .eds-alert-sidebar:after {\n      content: \"\";\n      width: 20px;\n      height: 20px; }\n  eds-alert .eds-alert-content {\n    flex-grow: 0;\n    position: relative;\n    padding: 10px 10px 10px 14px;\n    width: calc(100% - 28px); }\n    eds-alert .eds-alert-content ul {\n      padding-left: 0;\n      list-style-type: none; }\n      eds-alert .eds-alert-content ul li {\n        display: list-item;\n        margin-bottom: 0;\n        margin-left: 20px;\n        padding-left: 14px;\n        position: relative;\n        line-height: 1.6em; }\n        eds-alert .eds-alert-content ul li:before {\n          content: \"●\";\n          color: inherit;\n          position: absolute;\n          left: -20px;\n          width: 25px;\n          height: 25px;\n          text-align: center; }\n    eds-alert .eds-alert-content h4:first-child {\n      margin-top: 0;\n      margin-bottom: 0; }\n    eds-alert .eds-alert-content p:last-child, eds-alert .eds-alert-content ul:last-child {\n      margin-bottom: 0; }\n  eds-alert .eds-alert-close-icon {\n    display: none;\n    position: absolute;\n    z-index: 1;\n    top: 3px;\n    right: 10px;\n    font-size: 29px;\n    font-weight: 300;\n    color: #426da9;\n    cursor: pointer;\n    border: none;\n    margin: 0;\n    padding: 0;\n    width: auto;\n    overflow: visible;\n    background: transparent;\n    line-height: normal;\n    -webkit-font-smoothing: inherit;\n    -moz-osx-font-smoothing: inherit;\n    -webkit-appearance: none;\n    line-height: 1; }\n  eds-alert[closable] .eds-alert-close-icon {\n    display: block; }\n  eds-alert[motif=success] .eds-alert-sidebar {\n    background-color: #cdf4d2; }\n    eds-alert[motif=success] .eds-alert-sidebar:after {\n      display: block;\n      background-image: url(\"data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDA3QTNCIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+DQogICAgPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0yIDE1bC01LTUgMS40MS0xLjQxTDEwIDE0LjE3bDcuNTktNy41OUwxOSA4bC05IDl6Ii8+DQo8L3N2Zz4=\");\n      background-size: contain; }\n  eds-alert[motif=success][compact] .eds-alert-content b, eds-alert[motif=success][compact] .eds-alert-content strong {\n    color: #007A3B; }\n  eds-alert[motif=success] .eds-alert-content h4 {\n    color: #007A3B; }\n  eds-alert[motif=success] .eds-alert-content li:before {\n    color: #007A3B; }\n  eds-alert[motif=error] .eds-alert-sidebar {\n    background-color: #ffdce2; }\n    eds-alert[motif=error] .eds-alert-sidebar:after {\n      display: block;\n      background-image: url(\"data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' fill='%23CD0026' /%3E%3C/svg%3E\");\n      background-size: contain; }\n  eds-alert[motif=error][compact] .eds-alert-content b, eds-alert[motif=error][compact] .eds-alert-content strong {\n    color: #cd0026; }\n  eds-alert[motif=error] .eds-alert-content h4 {\n    color: #cd0026; }\n  eds-alert[motif=error] .eds-alert-content li:before {\n    color: #cd0026; }\n  eds-alert[motif=warning] .eds-alert-sidebar {\n    background-color: #fceeba; }\n    eds-alert[motif=warning] .eds-alert-sidebar:after {\n      display: block;\n      background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' fill='%23AD5700'/%3E%3C/svg%3E\");\n      background-size: contain; }\n  eds-alert[motif=warning][compact] .eds-alert-content b, eds-alert[motif=warning][compact] .eds-alert-content strong {\n    color: #ad5700; }\n  eds-alert[motif=warning] .eds-alert-content h4 {\n    color: #ad5700; }\n  eds-alert[motif=warning] .eds-alert-content li:before {\n    color: #ad5700; }\n  eds-alert[motif=info] .eds-alert-sidebar {\n    background-color: #d2e8f9; }\n    eds-alert[motif=info] .eds-alert-sidebar:after {\n      display: block;\n      background-image: url(\"data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNDI2ZGE5IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+DQogICAgPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTEgMTVoLTJ2LTZoMnY2em0wLThoLTJWN2gydjJ6Ii8+DQo8L3N2Zz4=\");\n      background-size: contain; }\n  eds-alert[motif=info][compact] .eds-alert-content b, eds-alert[motif=info][compact] .eds-alert-content strong {\n    color: #426da9; }\n  eds-alert[motif=info] .eds-alert-content h4 {\n    color: #426da9; }\n  eds-alert[motif=info] .eds-alert-content li:before {\n    color: #426da9; }\n\n/*\n * Regional alert specific styles\n */\neds-alert[region] {\n  border: 1px solid #d8d8d8;\n  background-clip: border-box;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);\n  margin: 6px 0;\n  pointer-events: auto; }\n\n[class^=\"eds-alert-region-\"] {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  z-index: 2000; }\n  [class^=\"eds-alert-region-\"][class*=\"top-left\"] {\n    top: 24px;\n    left: 24px; }\n  [class^=\"eds-alert-region-\"][class*=\"top-center\"] {\n    top: 24px;\n    left: 24px;\n    right: 24px; }\n    [class^=\"eds-alert-region-\"][class*=\"top-center\"] eds-alert {\n      max-width: 50%;\n      margin-left: auto;\n      margin-right: auto; }\n  [class^=\"eds-alert-region-\"][class*=\"top-right\"] {\n    top: 24px;\n    right: 24px; }\n  [class^=\"eds-alert-region-\"][class*=\"bottom-left\"] {\n    bottom: 24px;\n    left: 24px;\n    flex-direction: column-reverse; }\n  [class^=\"eds-alert-region-\"][class*=\"bottom-center\"] {\n    bottom: 24px;\n    left: 24px;\n    right: 24px;\n    flex-direction: column-reverse; }\n    [class^=\"eds-alert-region-\"][class*=\"bottom-center\"] eds-alert {\n      max-width: 50%;\n      margin-left: auto;\n      margin-right: auto; }\n  [class^=\"eds-alert-region-\"][class*=\"bottom-right\"] {\n    bottom: 24px;\n    right: 24px;\n    flex-direction: column-reverse; }\n\neds-alert[hidden] {\n  transform: scale(0);\n  opacity: 0;\n  max-height: 0;\n  margin: 0;\n  border: 0; }\n"

/***/ })
/******/ ]);