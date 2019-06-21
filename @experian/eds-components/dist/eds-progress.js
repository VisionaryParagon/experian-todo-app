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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_value_or__ = __webpack_require__(1);

const tag = 'eds-progress';
const html = __webpack_require__(2);
const css = __webpack_require__(3);

class EDSProgressElement extends EDSElement {
  static get observedAttributes() {
    return EDSProgressElement.normalizeObservedAttributes([
      'max', 'value', 'motif',
      { baselinevalue: 'baselineValue' }
    ]);
  }

  get defaults() {
    return {
      baselineValue: 0,
      max: 1
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      baseFill: this.$('.eds-progress-baseline-fill'),
      fill: this.$('.eds-progress-fill'),
      indeterminate: this.$('.eds-progress-indeterminate')
    };
  }

  connectedCallback() {
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', 0);
    this.setAttribute('aria-valuemax', this.max);
    super.connectedCallback();
  }

  get max() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_value_or__["a" /* valueOr */])(this._max, this.defaults.max);
  }

  set max(value) {
    if (value < 0) throw Error('max must be greater than zero');
    this._max = parseFloat(value);
    this.setAttribute('max', value);
    this.setAttribute('aria-valuemax', value);
    this._refresh();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = parseFloat(value);

    if (isNaN(this._value)) {
      this._refs.indeterminate.style.display = 'block';
      this.removeAttribute('value');
      this.removeAttribute('aria-valuenow');
    } else {
      this._refs.indeterminate.style.display = 'none';
      // Follow native <progress> behavior, auto set value when out of bounds
      if (this._value > this.max) this._value = this.max;
      if (this._value < 0) this._value = 0;
      this.setAttribute('value', this._value);
      this.setAttribute('aria-valuenow', this._value);
    }

    this._refresh();
  }

  get baselineValue() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_value_or__["a" /* valueOr */])(this._baselineValue, this.defaults.baselineValue);
  }

  set baselineValue(value) {
    this._baselineValue = parseFloat(value);

    if (isNaN(this._baselineValue)) this._baselineValue = 0;
    this.setAttribute('baselineValue', this._baselineValue);
    // Follow native <progress> behavior, auto set value when out of bounds
    if (this._baselineValue > this.max) this._baselineValue = this.max;
    if (this._baselineValue < 0) this._baselineValue = 0;
    this._refresh();
  }

  _refresh() {
    this._refs.baseFill.style.width = `${(this.baselineValue / this.max) * 100}%`;
    this._refs.fill.style.width = `${(this.value / this.max) * 100}%`;
  }
}

customElements.define(tag, EDSProgressElement);
window.EDSProgressElement = EDSProgressElement;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = valueOr;
// Uses 'value' unless null or undefined, then uses 'or'
// Allows for conditional checks that include valid falsey values such as 0
function valueOr(value, or) {
  // double equal intentional here to check for undefined as well
  return (value == null) ? or : value;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<div class='eds-progress-baseline-fill'></div>\n<div class='eds-progress-fill eds-indeterminate'></div>\n<div class='eds-progress-indeterminate'></div>"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-progress:not([motif]), eds-progress[motif='magenta'] {\n  border: 1px solid #e63888; }\n  eds-progress:not([motif]) .eds-progress-baseline-fill, eds-progress[motif='magenta'] .eds-progress-baseline-fill {\n    background-color: #e63888; }\n  eds-progress:not([motif]) .eds-progress-fill, eds-progress[motif='magenta'] .eds-progress-fill {\n    background-color: #e63888; }\n  eds-progress:not([motif]) .eds-progress-indeterminate, eds-progress[motif='magenta'] .eds-progress-indeterminate {\n    background-image: linear-gradient(-45deg, #e63888 0px, #f8c3db 40px, #e63888 80px, #f8c3db 120px); }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-progress[motif='purple'] {\n  border: 1px solid #6d2077; }\n  eds-progress[motif='purple'] .eds-progress-baseline-fill {\n    background-color: #6d2077; }\n  eds-progress[motif='purple'] .eds-progress-fill {\n    background-color: #6d2077; }\n  eds-progress[motif='purple'] .eds-progress-indeterminate {\n    background-image: linear-gradient(-45deg, #6d2077 0px, #d3bcd6 40px, #6d2077 80px, #d3bcd6 120px); }\n\neds-progress .eds-progress-baseline-fill {\n  transition: width 150ms ease; }\n\neds-progress .eds-progress-fill {\n  transition: width 150ms ease; }\n\n@keyframes animate-gradient {\n  100% {\n    background-position: 120px 0px; } }\n\neds-progress .eds-progress-indeterminate {\n  animation: animate-gradient 0.5s linear infinite; }\n\neds-progress {\n  display: inline-block;\n  position: relative;\n  height: 8px;\n  border-radius: 4px;\n  background-color: #ffffff;\n  min-width: 100px; }\n  eds-progress .eds-progress-baseline-fill {\n    z-index: 0;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    opacity: 0.3; }\n  eds-progress .eds-progress-fill {\n    z-index: 1;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 0; }\n  eds-progress .eds-progress-indeterminate {\n    z-index: 2;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-size: 120px 100%; }\n"

/***/ })
/******/ ]);