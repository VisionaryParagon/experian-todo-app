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
/***/ (function(module, exports, __webpack_require__) {

const tag = 'eds-breadcrumbs';
const html = __webpack_require__(1);
const css = __webpack_require__(2);

class EDSBreadcrumbsElement extends EDSElement {
  static get observedAttributes() {
    return ['separator'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
  }

  get separator() {
    return this._separator || '/';
  }

  set separator(value) {
    this._separator = value;
  }

  connectedCallback() {
    Array.from(this.querySelectorAll('a')).forEach(el => {
      el.setAttribute('data-separator-symbol', this.separator);
    });

    super.connectedCallback();
  }
}

customElements.define(tag, EDSBreadcrumbsElement);
window.EDSBreadcrumbsElement = EDSBreadcrumbsElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<slot></slot>"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-breadcrumbs {\n  display: flex;\n  align-items: center;\n  height: 48px;\n  border-bottom: 1px solid #cccccc;\n  font-size: 14px;\n  padding-left: 40px;\n  background-color: #ffffff; }\n  eds-breadcrumbs[background='gray'] {\n    background-color: #f6f6f6; }\n  eds-breadcrumbs a {\n    text-decoration: none;\n    color: #426da9; }\n    eds-breadcrumbs a:before {\n      content: attr(data-separator-symbol);\n      color: #bcbcbc;\n      padding: 0 12px; }\n    eds-breadcrumbs a:first-child eds-icon {\n      margin: 0;\n      line-height: 0.8; }\n    eds-breadcrumbs a:first-child:before {\n      content: \"\";\n      padding: 0; }\n    eds-breadcrumbs a:last-child {\n      color: #333333;\n      font-weight: 500; }\n    eds-breadcrumbs a:not(last-child) {\n      cursor: pointer; }\n"

/***/ })
/******/ ]);