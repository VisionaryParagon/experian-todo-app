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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_styles__ = __webpack_require__(1);


const tag = 'eds-card';
const html = '<slot></slot>';
const css = __webpack_require__(2);

// Expose CSS for CSS only use.
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_styles__["a" /* addStyle */])(tag, css);

class EDSCardElement extends EDSElement {
  static get observedAttributes() {
    return ['background'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    if (console && console.warn) console.warn('using eds-card as an element is deprecated, apply as a class or attribute instead.');
  }
};

customElements.define(tag, EDSCardElement);
window.EDSCardElement = EDSCardElement;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addStyle;
function insertStyle(container, id, stylesheet) {
  if (!container.querySelector(`style[data-id="${id}"]`)) {
    const style = document.createElement('style');
    style.setAttribute('data-id', id);
    style.appendChild(document.createTextNode(stylesheet));
    container.appendChild(style);
  }
}

function addStyle(id, stylesheet, element) {
  let container;

  if (element && element.closest('html')) container = element.closest('html').querySelector('head');
  else container = document.head;

  insertStyle(container, id, stylesheet);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-card, .eds-card, [eds-card] {\n  display: block;\n  padding: 20px;\n  margin: 20px 0;\n  border: 1px solid #d8d8d8;\n  border-radius: 6px;\n  background-color: #ffffff; }\n  eds-card[background='gray'], .eds-card[background='gray'], [eds-card][background='gray'] {\n    background-color: #f6f6f6; }\n  eds-card > h1, eds-card > h2, eds-card > h3, eds-card > h4, eds-card > h5, eds-card > h6, eds-card p, .eds-card > h1, .eds-card > h2, .eds-card > h3, .eds-card > h4, .eds-card > h5, .eds-card > h6, .eds-card p, [eds-card] > h1, [eds-card] > h2, [eds-card] > h3, [eds-card] > h4, [eds-card] > h5, [eds-card] > h6, [eds-card] p {\n    margin-top: 0; }\n  eds-card p:last-child, .eds-card p:last-child, [eds-card] p:last-child {\n    margin-bottom: 0; }\n  eds-card header, .eds-card header, [eds-card] header {\n    margin: -20px -20px 20px;\n    padding: 12px 20px;\n    border-bottom: 1px solid #d8d8d8; }\n    eds-card header > h1, eds-card header > h2, eds-card header > h3, eds-card header > h4, eds-card header > h5, eds-card header > h6, eds-card header p, .eds-card header > h1, .eds-card header > h2, .eds-card header > h3, .eds-card header > h4, .eds-card header > h5, .eds-card header > h6, .eds-card header p, [eds-card] header > h1, [eds-card] header > h2, [eds-card] header > h3, [eds-card] header > h4, [eds-card] header > h5, [eds-card] header > h6, [eds-card] header p {\n      margin: 0; }\n    eds-card header.flush, .eds-card header.flush, [eds-card] header.flush {\n      padding: 0; }\n      eds-card header.flush eds-toolbar, .eds-card header.flush eds-toolbar, [eds-card] header.flush eds-toolbar {\n        border-bottom: 0; }\n  eds-card footer, .eds-card footer, [eds-card] footer {\n    margin: 20px -20px -20px;\n    padding: 15px 20px;\n    border-top: 1px solid #d8d8d8; }\n    eds-card footer p:last-child, .eds-card footer p:last-child, [eds-card] footer p:last-child {\n      margin: 0; }\n    eds-card footer.flush, .eds-card footer.flush, [eds-card] footer.flush {\n      padding: 0; }\n      eds-card footer.flush eds-toolbar, .eds-card footer.flush eds-toolbar, [eds-card] footer.flush eds-toolbar {\n        border-bottom: 0; }\n"

/***/ })
/******/ ]);