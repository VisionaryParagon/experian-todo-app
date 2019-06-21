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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eds_step__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eds_step___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__eds_step__);



const tag = 'eds-step-sequence';
const html = __webpack_require__(5);
const css = __webpack_require__(6);

Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["a" /* setEDSValue */])('stepSequence.defaults.previousStepARIALabel', 'previous');
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["a" /* setEDSValue */])('stepSequence.defaults.currentStepARIALabel', 'current');
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["a" /* setEDSValue */])('stepSequence.defaults.nextStepARIALabel', 'next');

class EDSStepSequenceElement extends EDSElement {
  static get observedAttributes() {
    return EDSStepSequenceElement.normalizeObservedAttributes([
      { previoussteparialabel: 'previousStepARIALabel' },
      { currentsteparialabel: 'currentStepARIALabel' },
      { nextsteparialabel: 'nextStepARIALabel' }
    ]);
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.setAttribute('role', 'tablist');

    this._refs = {
      previousStepLabel: this.$('.eds-previous-step-label'),
      currentStepLabel: this.$('.eds-current-step-label'),
      nextStepLabel: this.$('.eds-next-step-label')
    };

    // Ensure values
    this.previousStepARIALabel = this.previousStepARIALabel;
    this.currentStepARIALabel = this.currentStepARIALabel;
    this.nextStepARIALabel = this.nextStepARIALabel;

    this.$('slot').addEventListener('slotchange', this._handleSlottedChildren.bind(this));
  }

  get defaults() {
    return {
      previousStepARIALabel: window.EDS.stepSequence.defaults.previousStepARIALabel,
      currentStepARIALabel: window.EDS.stepSequence.defaults.currentStepARIALabel,
      nextStepARIALabel: window.EDS.stepSequence.defaults.nextStepARIALabel
    };
  }

  _handleSlottedChildren() {
    this._setARIALabels();
  }

  _setARIALabels() {
    let state = 'previous';
    let label = this.previousStepARIALabel;

    Array.from(this.querySelectorAll('eds-step')).forEach(el => {
      if (el.active) state = 'current';
      if (state === 'current') {
        label = this.currentStepARIALabel;
        state = 'next';
      } else if (state === 'next') {
        label = this.nextStepARIALabel;
      }

      el.setAttribute('aria-label', [el.innerHTML, label].join(', '));
    });
  }

  _getLabel(which) {
    return this.getAttribute(which) || this.defaults[which];
  }

  _setLabel(which, value) {
    this.setAttribute(which, value);
    this._setARIALabels();
  }

  get previousStepARIALabel() {
    return this._getLabel('previousStepARIALabel');
  }

  set previousStepARIALabel(value) {
    this._setLabel('previousStepARIALabel', value);
  }

  get currentStepARIALabel() {
    return this._getLabel('currentStepARIALabel');
  }

  set currentStepARIALabel(value) {
    this._setLabel('currentStepARIALabel', value);
  }

  get nextStepARIALabel() {
    return this._getLabel('nextStepARIALabel');
  }

  set nextStepARIALabel(value) {
    this._setLabel('nextStepARIALabel', value);
  }
};

customElements.define(tag, EDSStepSequenceElement);
window.EDSStepSequenceElement = EDSStepSequenceElement;


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
/***/ (function(module, exports, __webpack_require__) {

const tag = 'eds-step';
const html = __webpack_require__(3);
const css = __webpack_require__(4);

customElements.define(tag, class EDSStep extends EDSElement {
  static get observedAttributes() {
    return ['active'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.setAttribute('role', 'tab');
    this.setAttribute('aria-disabled', true);
  }

  set active(value) {
    this.setOrRemoveFlagAttribute('active', value);
    this._active = this.flagAttributeIsTruthy(value);

    this.setOrRemoveFlagAttribute('aria-selected', this._active);
    this.setOrRemoveFlagAttribute('aria-disabled', !this._active);
  }

  get active() {
    return this._active;
  }
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<span class=\"step-icon\"></span>\n<span class=\"step-text\">\n    <slot></slot>\n</span>\n"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-step {\n  flex: 1 0 0;\n  display: inline-flex;\n  justify-content: flex-start;\n  color: #426da9;\n  font-size: 14px;\n  font-weight: 500;\n  padding-bottom: 38px;\n  position: relative;\n  text-align: left; }\n  eds-step .step-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: #426da9;\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' style=''%3E%3Crect id='backgroundrect' width='100%25' height='100%25' x='0' y='0' fill='none' stroke='none'/%3E%3Cg class='currentLayer' style=''%3E%3Ctitle%3ELayer 1%3C/title%3E%3Cpath d='M0,0 h24 v24 H0 z' fill='none' id='svg_1' class=''/%3E%3Cpath d='M9,16.17 L4.83,12 l-1.42,1.4100000000000001 L9,19 L21,7 l-1.4100000000000001,-1.4100000000000001 z' id='svg_2' class='' fill='%23ffffff' fill-opacity='1'/%3E%3C/g%3E%3C/svg%3E\");\n    background-size: 18px 18px;\n    border-radius: 50%;\n    bottom: 0;\n    box-sizing: border-box;\n    height: 18px;\n    left: 0;\n    position: absolute;\n    transform: translateX(-50%);\n    width: 18px;\n    z-index: 20; }\n  eds-step::after {\n    background-color: #426da9;\n    bottom: 8px;\n    content: '';\n    height: 2px;\n    left: 0;\n    position: absolute;\n    width: 100%;\n    z-index: 10; }\n  eds-step:first-child .step-icon {\n    transform: translateX(0); }\n  eds-step:last-child {\n    justify-content: flex-end;\n    flex: 0 1 0px;\n    transform: translateX(0);\n    width: 0;\n    z-index: 30; }\n    eds-step:last-child .step-icon {\n      transform: translateX(-100%); }\n  eds-step:last-child::after {\n    display: none; }\n  eds-step[active] {\n    color: #333333; }\n    eds-step[active] .step-icon {\n      background-color: #ffffff;\n      border: 3px solid #e63888; }\n      eds-step[active] .step-icon i {\n        display: none; }\n    eds-step[active]::after {\n      background-color: #cccccc; }\n  eds-step[active] ~ eds-step {\n    color: #cccccc; }\n    eds-step[active] ~ eds-step .step-icon {\n      background-color: #ffffff;\n      border: 3px solid #cccccc; }\n      eds-step[active] ~ eds-step .step-icon i {\n        display: none; }\n    eds-step[active] ~ eds-step::after {\n      background-color: #cccccc; }\n  eds-step span.step-text {\n    white-space: nowrap; }\n  eds-step + eds-step:not(:last-child) span.step-text {\n    transform: translateX(-50%); }\n  eds-step + eds-step:last-child span.step-text {\n    transform: translateX(0); }\n"

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<slot></slot>\n"

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-step-sequence {\n  display: flex;\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n"

/***/ })
/******/ ]);