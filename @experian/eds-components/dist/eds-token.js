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

const tag = 'eds-token';
const html = `<slot></slot><button class="close">&times;</button>`;
const css = __webpack_require__(1);

class EDSTokenElement extends EDSElement {
  static get observedAttributes() {
    return ['closable'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
  }

  close(e) {
    const closeEvent = new CustomEvent('close', {
      bubbles: true
    });

    this.dispatchEvent(closeEvent);
  }

  connectedCallback() {
    this.$('.close').addEventListener('click', this.close.bind(this));
    super.connectedCallback();
  }

  set closable(value) {
    if (this.flagAttributeIsTruthy(value)) {
      this.$('.close').classList.add('show');
    } else {
      this.$('.close').classList.remove('show');
    }

    this.setOrRemoveFlagAttribute('closable', value);
  }

  get closable() {
    return this.hasAttribute('closable');
  }
}

customElements.define(tag, EDSTokenElement);
window.EDSTokenElement = EDSTokenElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-token {\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  display: inline-block;\n  padding: 4px 10px;\n  font-size: 14px;\n  color: #333333;\n  border-radius: 4px;\n  border: 1px solid transparent;\n  background-color: #d2e8f9;\n  line-height: 1 !important; }\n  eds-token .close {\n    color: #426da9;\n    line-height: 1;\n    font-size: 22px;\n    font-weight: 300;\n    position: absolute;\n    top: -3px;\n    right: 10px;\n    display: none;\n    cursor: pointer;\n    border: none;\n    margin: 0;\n    padding: 0;\n    width: auto;\n    overflow: visible;\n    background: transparent;\n    line-height: normal;\n    -webkit-font-smoothing: inherit;\n    -moz-osx-font-smoothing: inherit;\n    -webkit-appearance: none; }\n    eds-token .close.show {\n      display: block; }\n    eds-token .close:hover {\n      color: #1d4f91;\n      font-weight: bold; }\n  eds-token strong {\n    font-weight: bold; }\n  eds-token[closable] {\n    position: relative;\n    padding-right: 32px; }\n"

/***/ })
/******/ ]);