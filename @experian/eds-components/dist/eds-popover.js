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

const tag = 'eds-popover';
const html = __webpack_require__(2);
const css = __webpack_require__(3);

Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["a" /* setEDSValue */])('popovers.defaults.position', 'top');

class EDSPopoverElement extends EDSElement {
  static get observedAttributes() {
    return EDSPopoverElement.normalizeObservedAttributes([
      { targetclass: 'targetClass' }, 'position', 'padding', 'visible'
    ]);
  }

  get defaults() {
    return {
      position: window.EDS.popovers.defaults.position
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(['position', 'targetClass']);
    this.defineFlagProperties(['padding']);

    this._refs = {
      content: this.$('.eds-popover-content'),
      wrapper: this.$('.eds-popover-wrapper')
    };

    this.contentid = this._randomNumber();
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() {
    this._listenForTriggers();
    super.connectedCallback();
  }

  onFirstVisible() {
    if (this.visible) this.visible = true; // Forces a refresh
    this.visibleOnce = true; // always set true in this method
  }

  disconnectedCallback() {
    this._stopListeningForTriggers();
    super.disconnectedCallback();
  }

  _listenForTriggers() {
    document.addEventListener('click', this._onClick);
  }

  _stopListeningForTriggers() {
    document.removeEventListener('click', this._onClick);
  }

  _onClick(e) {
    let el = e.composedPath ? e.composedPath()[0] : e.target;

    if (this === el || this.contains(el) || this._containsFromEvent(e, el)) {
      if (this._waiting) clearTimeout(this._waiting);
    } else if (el = el.closest(`.${this.targetClass}`)) { // eslint-disable-line no-cond-assign
      if (el === this._currentEl && this._visible) this._hide();
      else {
        this._currentEl = el;
        this._show(el);
      }
    } else {
      if (this._popper) this._hide();
    }
  }

  // Due to a bug in webcomponents polyfill we need to search the composedPath
  // manually to see if this element is inside the popover.
  // In some cases the 'Oc' object is missing references to parentNode & parentElement
  _containsFromEvent(e, el) {
    return e.composedPath().some(el => el === this);
  }

  _clearTimers() {
    if (this._waiting) clearTimeout(this._waiting);
    if (this._hiding) clearTimeout(this._hiding);
  }

  _hide() {
    this._clearTimers();
    // First timer allows enough time to move mouse cursor into the tooltip
    this._waiting = setTimeout(() => {
      // Second timer kills the actual tooltip
      this._hiding = setTimeout(() => {
        this._refs.wrapper.classList.remove('show');
        this._popper.destroy();
        this._visible = false;
        this._removeAriaAttributes();
        this.dispatchEvent(new CustomEvent('hide', { detail: this._currentEl }));
      }, 100);
      this._refs.content.classList.remove('show');
    }, 75);
  }

  _setAriaAttributes() {
    // TODO: reinvestigate the value of `role` here.
    // While technically not an alert, we are using the role of `alert`.
    this.setAttribute('role', 'alert');
    this.setAttribute('aria-describedby', this._getContentId());
    this._refs.wrapper.setAttribute('id', this._getContentId());
  }

  _removeAriaAttributes() {
    this.removeAttribute('role');
    this.removeAttribute('aria-describedby');
  }

  _show(el) {
    if (!el) return;
    this._clearTimers();
    if (this._popper) this._popper.destroy();
    this._refs.wrapper.classList.add('show');

    const options = {
      placement: this.position
    };

    this._popper = new Popper(el, this._refs.wrapper, options); // eslint-disable-line no-new
    this._refs.content.classList.add('show');
    this._visible = true;
    this._setAriaAttributes();
    this.dispatchEvent(new CustomEvent('show', { detail: el }));
  }

  _toggle() {
    if (this.visible) this._hide();
    else this._show();
  }

  _randomNumber() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  _getContentId() {
    return this._refs.wrapper.id || `eds-popover-content-${this.contentid}`;
  }

  get visible() {
    return this.hasAttribute('visible');
  }

  set visible(value) {
    this.setOrRemoveFlagAttribute('visible', value);

    // Show this popover on the first matching target
    const el = document.querySelector(`.${this.targetClass}`);
    if (this.flagAttributeIsTruthy(value)) this._show(el);
    else this._hide();
  }

  show(callback, el) {
    setTimeout(() => {
      if (el) this._show(el);
      else this.visible = true;
      if (callback) callback();
    });
  }

  hide(callback) {
    setTimeout(() => {
      this.visible = false;
      if (callback) callback();
    });
  }
}

customElements.define(tag, EDSPopoverElement);
window.EDSPopoverElement = EDSPopoverElement;


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

module.exports = "<div class=\"eds-popover-wrapper\">\n  <div class=\"eds-popover-content api-popover\">\n    <div class=\"eds-popover-arrow\" x-arrow></div>\n    <div class=\"eds-popover-content-inner\">\n      <slot></slot>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-popover .eds-popover-content {\n  transition: transform 250ms ease 0ms, opacity 85ms ease 15ms; }\n  eds-popover .eds-popover-content.show {\n    transition: transform 130ms ease 0ms, opacity 50ms ease 50ms; }\n\neds-popover .eds-popover-wrapper {\n  position: absolute;\n  display: none;\n  z-index: 90; }\n  eds-popover .eds-popover-wrapper.show {\n    display: block; }\n  eds-popover .eds-popover-wrapper[x-placement^=\"top\"] {\n    margin-bottom: 16px; }\n    eds-popover .eds-popover-wrapper[x-placement^=\"top\"] [x-arrow], eds-popover .eds-popover-wrapper[x-placement^=\"top\"] [x-arrow]:before {\n      border-width: 8px 8px 0 8px;\n      border-left-color: transparent;\n      border-right-color: transparent;\n      border-bottom-color: transparent;\n      bottom: -8px;\n      left: calc(50% - 8px);\n      margin-top: 0;\n      margin-bottom: 0; }\n    eds-popover .eds-popover-wrapper[x-placement^=\"top\"] [x-arrow]:before {\n      bottom: -1px; }\n  eds-popover .eds-popover-wrapper[x-placement^=\"right\"] {\n    margin-left: 16px; }\n    eds-popover .eds-popover-wrapper[x-placement^=\"right\"] [x-arrow], eds-popover .eds-popover-wrapper[x-placement^=\"right\"] [x-arrow]:before {\n      border-width: 8px 8px 8px 0;\n      border-left-color: transparent;\n      border-top-color: transparent;\n      border-bottom-color: transparent;\n      left: -8px;\n      top: calc(50% - 8px);\n      margin-left: 0;\n      margin-right: 0; }\n    eds-popover .eds-popover-wrapper[x-placement^=\"right\"] [x-arrow]:before {\n      left: -1px; }\n  eds-popover .eds-popover-wrapper[x-placement^=\"bottom\"] {\n    margin-top: 16px; }\n    eds-popover .eds-popover-wrapper[x-placement^=\"bottom\"] [x-arrow], eds-popover .eds-popover-wrapper[x-placement^=\"bottom\"] [x-arrow]:before {\n      border-width: 0 8px 8px 8px;\n      border-left-color: transparent;\n      border-right-color: transparent;\n      border-top-color: transparent;\n      top: -8px;\n      left: calc(50% - 8px);\n      margin-top: 0;\n      margin-bottom: 0; }\n    eds-popover .eds-popover-wrapper[x-placement^=\"bottom\"] [x-arrow]:before {\n      top: -1px; }\n  eds-popover .eds-popover-wrapper[x-placement^=\"left\"] {\n    margin-right: 16px; }\n    eds-popover .eds-popover-wrapper[x-placement^=\"left\"] [x-arrow], eds-popover .eds-popover-wrapper[x-placement^=\"left\"] [x-arrow]:before {\n      border-width: 8px 0 8px 8px;\n      border-top-color: transparent;\n      border-right-color: transparent;\n      border-bottom-color: transparent;\n      right: -8px;\n      top: calc(50% - 8px);\n      margin-left: 0;\n      margin-right: 0; }\n    eds-popover .eds-popover-wrapper[x-placement^=\"left\"] [x-arrow]:before {\n      right: -1px; }\n\neds-popover .eds-popover-content {\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  min-width: 215px;\n  border-radius: 4px;\n  border: 1px solid #d8d8d8;\n  background-clip: border-box;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);\n  background-color: #ffffff;\n  box-sizing: border-box;\n  padding: 20px;\n  transform: scale(0);\n  opacity: 0; }\n  eds-popover .eds-popover-content [x-arrow] {\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-color: #ffffff;\n    position: absolute;\n    margin: 8px; }\n    eds-popover .eds-popover-content [x-arrow]:before {\n      content: '';\n      border-color: #cccccc;\n      border-style: solid;\n      position: absolute;\n      z-index: -1; }\n  eds-popover .eds-popover-content.show {\n    transform: scale(1);\n    opacity: 1; }\n  eds-popover .eds-popover-content .eds-popover-content-inner {\n    border-radius: 6px;\n    overflow: hidden; }\n\neds-popover[padding=\"false\"] .eds-popover-content {\n  padding: 0; }\n"

/***/ })
/******/ ]);