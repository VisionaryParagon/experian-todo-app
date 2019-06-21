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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderers__ = __webpack_require__(1);

const tag = 'eds-icon';
const html = "<i class='api-icon-element'></i>";
const css = __webpack_require__(2);

window.EDS.icons = window.EDS.icons || {};
window.EDS.icons.renderers = window.EDS.icons.renderers || {};

// Provide some default renderers
window.EDS.icons.renderers[__WEBPACK_IMPORTED_MODULE_0__renderers__["c" /* materialIconFontRenderer */].name] = __WEBPACK_IMPORTED_MODULE_0__renderers__["c" /* materialIconFontRenderer */];
window.EDS.icons.renderers[__WEBPACK_IMPORTED_MODULE_0__renderers__["a" /* farSVGRenderer */].name] = __WEBPACK_IMPORTED_MODULE_0__renderers__["a" /* farSVGRenderer */];
window.EDS.icons.renderers[__WEBPACK_IMPORTED_MODULE_0__renderers__["b" /* fasSVGRenderer */].name] = __WEBPACK_IMPORTED_MODULE_0__renderers__["b" /* fasSVGRenderer */];

// Disallow autoreplace if font awesome is used, this must be included before fontawesome
window.FontAwesomeConfig = {
  autoReplaceSvg: false
};

class EDSIconElement extends EDSElement {
  static get observedAttributes() {
    return ['border', 'icon', 'library', 'spin'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._iconEl = this.shadowRoot.querySelector('i');
    this.defineFlagProperties(['spin', 'border']);
  }

  _reset() {
    this.shadowRoot.innerHTML = html;
    this._iconEl = this.shadowRoot.querySelector('i');
  }

  get icon() {
    return this._icon;
  }

  set icon(val) {
    this._icon = val;
    this._render();
  }

  _render() {
    // set the library attribute if not specified
    if (!this._library) {
      if (!this.getAttribute('library')) this.setAttribute('library', window.EDS.icons.defaultLibrary);
      else this._library = this.getAttribute('library');
    }

    const renderer = window.EDS.icons.renderers[this._library];
    if (!renderer) throw new Error(`We couldn't find the ${this._library} renderer. Did you register it?`);

    this._reset();
    renderer.render(this._icon, this._iconEl, this);
  }

  get library() {
    return this._library;
  }

  set library(val) {
    this._library = val;
    this.setAttribute('library', val);
    this._render();
  }
}

customElements.define(tag, EDSIconElement);
window.EDSIconElement = EDSIconElement;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return materialIconFontRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return farSVGRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fasSVGRenderer; });
/* global FontAwesome */
const materialIconFontRenderer = {
  name: 'material-icon-font',
  render: (val, el, host) => {
    el.classList.add('material-icons');
    el.innerHTML = val;
    // Removes whitespace around material font (rough average)
    // Normalizes size with font-awesome svg
    el.style.transform = 'scale(1.35)';
  }
};

const farSVGRenderer = {
  name: 'far-svg',
  render: (val, el, host) => {
    el.classList.add('far', 'fa-fw', `fa-${val}`);
    const def = FontAwesome.findIconDefinition({prefix: 'far', iconName: val});
    const html = def ? FontAwesome.icon(def).html[0] : '';
    host.shadowRoot.innerHTML = html;
  }
};

const fasSVGRenderer = {
  name: 'fas-svg',
  render: (val, el, host) => {
    el.classList.add('fas', 'fa-fw', `fa-${val}`);
    const def = FontAwesome.findIconDefinition({prefix: 'fas', iconName: val});
    const html = def ? FontAwesome.icon(def).html[0] : '';
    host.shadowRoot.innerHTML = html;
  }
};




/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-icon[spin] {\n  animation: eds-spin 2s infinite linear; }\n\n@keyframes eds-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\neds-icon {\n  display: inline-block;\n  line-height: 0 !important;\n  margin: 0 6px 0 0;\n  vertical-align: text-bottom; }\n  eds-icon .material-icons {\n    font-size: inherit; }\n  eds-icon > * {\n    font-size: inherit; }\n  eds-icon.s18 > * {\n    font-size: 18px;\n    vertical-align: bottom; }\n  eds-icon.s24 > * {\n    font-size: 24px;\n    vertical-align: bottom; }\n  eds-icon.s36 > * {\n    font-size: 36px;\n    vertical-align: bottom; }\n  eds-icon.s48 > * {\n    font-size: 48px;\n    vertical-align: bottom; }\n  eds-icon.s60 > * {\n    font-size: 60px;\n    vertical-align: bottom; }\n  eds-icon[border] {\n    padding: 12px;\n    border: 4px solid #d8d8d8;\n    border-radius: 3px; }\n"

/***/ })
/******/ ]);