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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_deprecate__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eds_stage__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eds_stage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__eds_stage__);



const tag = 'eds-progress-indicator';
const html = __webpack_require__(5);
const css = __webpack_require__(6);

class EDSProgressIndicatorElement extends EDSElement {
  init() {
    this.initShadowDOM(tag, html, css);
    Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_deprecate__["a" /* deprecate */])('eds-progress-indicator', 'use eds-step-sequence instead');
  }
}

customElements.define(tag, EDSProgressIndicatorElement);
window.EDSProgressIndicatorElement = EDSProgressIndicatorElement;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deprecate;
function deprecate(item, message) {
  let log = `${item} is deprecated`;
  if (message) log += `, ${message}`;
  if (console && console.warn) console.warn(log);
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const tag = 'eds-stage';
const html = __webpack_require__(3);
const css = __webpack_require__(4);

customElements.define(tag, class _ extends EDSElement {
  static get observedAttributes() {
    return ['active'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
  }

  set active(value) {
    this.setOrRemoveFlagAttribute('active', value);
    this._active = this.flagAttributeIsTruthy(value);
  }

  get active() {
    return this._active;
  }
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<span class=\"stage-icon\"></span>\n<span class=\"stage-text\">\n    <slot></slot>\n</span>\n"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-stage {\n  flex: 1 0 0;\n  display: inline-flex;\n  justify-content: flex-start;\n  color: #426da9;\n  font-size: 14px;\n  font-weight: 500;\n  padding-bottom: 38px;\n  position: relative;\n  text-align: left; }\n  eds-stage .stage-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: #426da9;\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' style=''%3E%3Crect id='backgroundrect' width='100%25' height='100%25' x='0' y='0' fill='none' stroke='none'/%3E%3Cg class='currentLayer' style=''%3E%3Ctitle%3ELayer 1%3C/title%3E%3Cpath d='M0,0 h24 v24 H0 z' fill='none' id='svg_1' class=''/%3E%3Cpath d='M9,16.17 L4.83,12 l-1.42,1.4100000000000001 L9,19 L21,7 l-1.4100000000000001,-1.4100000000000001 z' id='svg_2' class='' fill='%23ffffff' fill-opacity='1'/%3E%3C/g%3E%3C/svg%3E\");\n    background-size: 18px 18px;\n    border-radius: 50%;\n    bottom: 0;\n    box-sizing: border-box;\n    height: 18px;\n    left: 0;\n    position: absolute;\n    transform: translateX(-50%);\n    width: 18px;\n    z-index: 20; }\n  eds-stage::after {\n    background-color: #426da9;\n    bottom: 8px;\n    content: '';\n    height: 2px;\n    left: 0;\n    position: absolute;\n    width: 100%;\n    z-index: 10; }\n  eds-stage:first-child .stage-icon {\n    transform: translateX(0); }\n  eds-stage:last-child {\n    justify-content: flex-end;\n    flex: 0 1 0px;\n    transform: translateX(0);\n    width: 0;\n    z-index: 30; }\n    eds-stage:last-child .stage-icon {\n      transform: translateX(-100%); }\n  eds-stage:last-child::after {\n    display: none; }\n  eds-stage[active] {\n    color: #333333; }\n    eds-stage[active] .stage-icon {\n      background-color: #ffffff;\n      border: 3px solid #e63888; }\n      eds-stage[active] .stage-icon i {\n        display: none; }\n    eds-stage[active]::after {\n      background-color: #cccccc; }\n  eds-stage[active] ~ eds-stage {\n    color: #333333;\n    font-weight: normal; }\n    eds-stage[active] ~ eds-stage .stage-icon {\n      background-color: #ffffff;\n      border: 3px solid #cccccc; }\n      eds-stage[active] ~ eds-stage .stage-icon i {\n        display: none; }\n    eds-stage[active] ~ eds-stage::after {\n      background-color: #cccccc; }\n  eds-stage span.stage-text {\n    white-space: nowrap; }\n  eds-stage + eds-stage:not(:last-child) span.stage-text {\n    transform: translateX(-50%); }\n  eds-stage + eds-stage:last-child span.stage-text {\n    transform: translateX(0); }\n"

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<slot></slot>\n"

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-progress-indicator {\n  display: flex; }\n"

/***/ })
/******/ ]);