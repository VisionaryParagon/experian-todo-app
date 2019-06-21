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


const tag = 'eds-button';
const html = '<button><eds-icon class="eds-button-icon"></eds-icon><slot></slot></button>';
const css = __webpack_require__(2);

// Expose CSS for CSS only use.
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_styles__["a" /* addStyle */])('eds-button', css);

const mirroredButtonAttributes = [
  'autofocus',
  'form',
  { formaction: 'formAction' },
  { formenctype: 'formEnctype' },
  { formmethod: 'formMethod' },
  { formnovalidate: 'formNoValidate' },
  { formtarget: 'formTarget' },
  'name',
  'type',
  'value'
];

class EDSButtonElement extends EDSElement {
  static get observedAttributes() {
    return EDSButtonElement.normalizeObservedAttributes(mirroredButtonAttributes.concat([
      'disabled', 'motif', 'icon', 'inverse', { iconlibrary: 'iconLibrary' },
      { iconplacement: 'iconPlacement' }
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      button: this.$('button'),
      icon: this.$('.eds-button-icon')
    };

    this.defineDefaultProperties(mirroredButtonAttributes);
    this.defineFlagProperties(['inverse']);

    if (console && console.warn) console.warn('using eds-button as an element is deprecated, apply as an attribute instead.');
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    if (name !== 'id') this._refs.button.setAttribute(name, value);
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    if (name !== 'id') this._refs.button.removeAttribute(name);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    value || value === '' ? this.setAttribute('disabled', value) : this.removeAttribute('disabled');
  }

  get motif() {
    return this.getAttribute('motif') || 'basic';
  }

  set motif(value) {
    this.setAttribute('motif', value);
  }

  get icon() {
    return this._refs.icon.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
    this._refs.icon.setAttribute('icon', value);
  }

  get iconLibrary() {
    return this._refs.icon.getAttribute('library');
  }

  set iconLibrary(value) {
    this.setAttribute('iconLibrary', value);
    this._refs.icon.setAttribute('library', value);
  }

  get iconPlacement() {
    return this.classList._refs.button.contains('eds-icon-right');
  }

  set iconPlacement(value) {
    if (value === 'right') this._refs.button.classList.add('eds-icon-right');
    else this._refs.button.classList.remove('eds-icon-right');
  }
};

customElements.define(tag, EDSButtonElement);
window.EDSButtonElement = EDSButtonElement;


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

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-button {\n  display: inline-block; }\n\neds-button button, button[eds-button] {\n  text-align: center;\n  vertical-align: text-bottom;\n  touch-action: manipulation;\n  background-image: none;\n  white-space: nowrap;\n  outline: none;\n  position: relative;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  line-height: 16px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  padding: 8px 20px;\n  overflow: visible;\n  display: inline-flex;\n  align-items: flex-end;\n  transition: background-color 0.15s ease; }\n  eds-button button[disabled], button[eds-button][disabled] {\n    cursor: not-allowed; }\n  eds-button button .eds-button-icon, button[eds-button] .eds-button-icon {\n    display: none; }\n  eds-button button.icon-right, eds-button button.icon-left, button[eds-button].icon-right, button[eds-button].icon-left {\n    padding-left: 18px;\n    padding-right: 18px; }\n  eds-button button.icon-left eds-icon, button[eds-button].icon-left eds-icon {\n    margin-left: 0;\n    margin-right: 10px;\n    color: inherit; }\n  eds-button button.icon-right eds-icon, button[eds-button].icon-right eds-icon {\n    margin-left: 10px;\n    margin-right: 0;\n    color: inherit; }\n  eds-button button[icon], button[eds-button][icon] {\n    padding-left: 18px;\n    padding-right: 18px; }\n    eds-button button[icon] .eds-button-icon, button[eds-button][icon] .eds-button-icon {\n      display: inline-block;\n      margin-right: 10px;\n      color: inherit; }\n    eds-button button[icon].eds-icon-right, button[eds-button][icon].eds-icon-right {\n      flex-direction: row-reverse; }\n      eds-button button[icon].eds-icon-right .eds-button-icon, button[eds-button][icon].eds-icon-right .eds-button-icon {\n        margin-right: 0;\n        margin-left: 10px; }\n  eds-button button::after, button[eds-button]::after {\n    content: '';\n    position: absolute;\n    top: -2px;\n    left: -2px;\n    right: -2px;\n    bottom: -2px;\n    border-radius: 4px;\n    border: 2px solid transparent;\n    opacity: 0;\n    transition: opacity 0.15s ease; }\n  eds-button button:focus::after, button[eds-button]:focus::after {\n    opacity: 1; }\n\neds-button.icon-only button[icon],\nbutton[eds-button].icon-only {\n  padding: 2px 10px 0px !important;\n  min-height: 34px;\n  line-height: 1.4em; }\n  eds-button.icon-only button[icon] .eds-button-icon,\n  button[eds-button].icon-only .eds-button-icon {\n    margin-right: 0;\n    margin-left: 0; }\n  eds-button.icon-only button[icon] eds-icon,\n  button[eds-button].icon-only eds-icon {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-button:not([motif]) button,\neds-button[motif=\"basic\"] button,\nbutton[eds-button],\nbutton[eds-button][motif=\"basic\"] {\n  color: #426da9;\n  background-color: #EDF4FA;\n  border-color: rgba(0, 69, 144, 0.3); }\n  eds-button:not([motif]) button:hover,\n  eds-button[motif=\"basic\"] button:hover,\n  button[eds-button]:hover,\n  button[eds-button][motif=\"basic\"]:hover {\n    background-color: #DCEAF4; }\n  eds-button:not([motif]) button:active,\n  eds-button[motif=\"basic\"] button:active,\n  button[eds-button]:active,\n  button[eds-button][motif=\"basic\"]:active {\n    background-color: #CEE0ED; }\n  eds-button:not([motif]) button[disabled],\n  eds-button[motif=\"basic\"] button[disabled],\n  button[eds-button][disabled],\n  button[eds-button][motif=\"basic\"][disabled] {\n    color: #AAAAAA;\n    background-color: #F3F3F3;\n    border-color: #CCCCCC; }\n  eds-button:not([motif]) button::after,\n  eds-button[motif=\"basic\"] button::after,\n  button[eds-button]::after,\n  button[eds-button][motif=\"basic\"]::after {\n    border-color: #426da9; }\n\neds-button[inverse]:not([motif]) button,\neds-button[inverse][motif=\"basic\"] button,\nbutton[eds-button][inverse],\nbutton[eds-button][inverse][motif=\"basic\"] {\n  color: #ffffff;\n  background-color: rgba(255, 255, 255, 0.2);\n  border-color: rgba(255, 255, 255, 0.3); }\n  eds-button[inverse]:not([motif]) button:hover,\n  eds-button[inverse][motif=\"basic\"] button:hover,\n  button[eds-button][inverse]:hover,\n  button[eds-button][inverse][motif=\"basic\"]:hover {\n    color: #ffffff;\n    background-color: rgba(255, 255, 255, 0.25); }\n  eds-button[inverse]:not([motif]) button:active,\n  eds-button[inverse][motif=\"basic\"] button:active,\n  button[eds-button][inverse]:active,\n  button[eds-button][inverse][motif=\"basic\"]:active {\n    color: #ffffff;\n    background-color: rgba(255, 255, 255, 0.3); }\n  eds-button[inverse]:not([motif]) button:focus,\n  eds-button[inverse][motif=\"basic\"] button:focus,\n  button[eds-button][inverse]:focus,\n  button[eds-button][inverse][motif=\"basic\"]:focus {\n    color: #ffffff; }\n  eds-button[inverse]:not([motif]) button[disabled],\n  eds-button[inverse][motif=\"basic\"] button[disabled],\n  button[eds-button][inverse][disabled],\n  button[eds-button][inverse][motif=\"basic\"][disabled] {\n    color: rgba(255, 255, 255, 0.6);\n    background-color: rgba(255, 255, 255, 0.1);\n    border-color: rgba(255, 255, 255, 0.2); }\n    eds-button[inverse]:not([motif]) button[disabled] .eds-button-icon,\n    eds-button[inverse][motif=\"basic\"] button[disabled] .eds-button-icon,\n    button[eds-button][inverse][disabled] .eds-button-icon,\n    button[eds-button][inverse][motif=\"basic\"][disabled] .eds-button-icon {\n      color: rgba(255, 255, 255, 0.6); }\n  eds-button[inverse]:not([motif]) button::after,\n  eds-button[inverse][motif=\"basic\"] button::after,\n  button[eds-button][inverse]::after,\n  button[eds-button][inverse][motif=\"basic\"]::after {\n    border-color: #ffffff; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-button[motif=\"primary\"] button,\nbutton[eds-button][motif=\"primary\"] {\n  color: white;\n  background-color: #426da9;\n  border-color: #1d4f91; }\n  eds-button[motif=\"primary\"] button:hover,\n  button[eds-button][motif=\"primary\"]:hover {\n    background-color: #1d4f91; }\n  eds-button[motif=\"primary\"] button:active,\n  button[eds-button][motif=\"primary\"]:active {\n    background-color: #002F63; }\n  eds-button[motif=\"primary\"] button[disabled],\n  button[eds-button][motif=\"primary\"][disabled] {\n    color: #898989;\n    background-color: #E3E3E3;\n    border-color: #CCCCCC; }\n  eds-button[motif=\"primary\"] button::after,\n  button[eds-button][motif=\"primary\"]::after {\n    border-color: #1d4f91; }\n\neds-button[inverse][motif=\"primary\"] button,\nbutton[eds-button][inverse][motif=\"primary\"] {\n  color: #6d2077;\n  background-color: rgba(255, 255, 255, 0.8);\n  border-color: rgba(255, 255, 255, 0.9); }\n  eds-button[inverse][motif=\"primary\"] button:hover,\n  button[eds-button][inverse][motif=\"primary\"]:hover {\n    color: #6d2077;\n    background-color: rgba(255, 255, 255, 0.9); }\n  eds-button[inverse][motif=\"primary\"] button:active,\n  button[eds-button][inverse][motif=\"primary\"]:active {\n    color: #6d2077;\n    background-color: white; }\n  eds-button[inverse][motif=\"primary\"] button:focus,\n  button[eds-button][inverse][motif=\"primary\"]:focus {\n    color: #6d2077; }\n  eds-button[inverse][motif=\"primary\"] button[disabled],\n  button[eds-button][inverse][motif=\"primary\"][disabled] {\n    color: rgba(255, 255, 255, 0.6);\n    background-color: rgba(255, 255, 255, 0.1);\n    border-color: rgba(255, 255, 255, 0.2); }\n    eds-button[inverse][motif=\"primary\"] button[disabled] .eds-button-icon,\n    button[eds-button][inverse][motif=\"primary\"][disabled] .eds-button-icon {\n      color: rgba(255, 255, 255, 0.6); }\n  eds-button[inverse][motif=\"primary\"] button::after,\n  button[eds-button][inverse][motif=\"primary\"]::after {\n    border-color: #ffffff; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-button[motif=\"tertiary\"] button,\nbutton[eds-button][motif=\"tertiary\"] {\n  color: #426da9;\n  background-color: transparent;\n  border-color: transparent;\n  padding: 8px 14px; }\n  eds-button[motif=\"tertiary\"] button:hover,\n  button[eds-button][motif=\"tertiary\"]:hover {\n    color: #1d4f91; }\n  eds-button[motif=\"tertiary\"] button:active,\n  button[eds-button][motif=\"tertiary\"]:active {\n    color: #002F63;\n    background-color: #f3f8fc; }\n  eds-button[motif=\"tertiary\"] button:focus,\n  button[eds-button][motif=\"tertiary\"]:focus {\n    color: #1d4f91; }\n  eds-button[motif=\"tertiary\"] button[disabled],\n  button[eds-button][motif=\"tertiary\"][disabled] {\n    color: #898989; }\n    eds-button[motif=\"tertiary\"] button[disabled] .eds-button-icon,\n    button[eds-button][motif=\"tertiary\"][disabled] .eds-button-icon {\n      color: #E3E3E3; }\n  eds-button[motif=\"tertiary\"] button::after,\n  button[eds-button][motif=\"tertiary\"]::after {\n    border-color: #426da9; }\n\neds-button[inverse][motif=\"tertiary\"] button,\nbutton[eds-button][inverse][motif=\"tertiary\"] {\n  color: #ececec;\n  background-color: transparent;\n  border-color: transparent; }\n  eds-button[inverse][motif=\"tertiary\"] button:hover,\n  button[eds-button][inverse][motif=\"tertiary\"]:hover {\n    color: #ffffff; }\n  eds-button[inverse][motif=\"tertiary\"] button:active,\n  button[eds-button][inverse][motif=\"tertiary\"]:active {\n    color: #ffffff;\n    background-color: rgba(255, 255, 255, 0.2); }\n  eds-button[inverse][motif=\"tertiary\"] button:focus,\n  button[eds-button][inverse][motif=\"tertiary\"]:focus {\n    color: #ffffff; }\n  eds-button[inverse][motif=\"tertiary\"] button[disabled],\n  button[eds-button][inverse][motif=\"tertiary\"][disabled] {\n    color: rgba(255, 255, 255, 0.6); }\n    eds-button[inverse][motif=\"tertiary\"] button[disabled] .eds-button-icon,\n    button[eds-button][inverse][motif=\"tertiary\"][disabled] .eds-button-icon {\n      color: rgba(255, 255, 255, 0.6); }\n  eds-button[inverse][motif=\"tertiary\"] button::after,\n  button[eds-button][inverse][motif=\"tertiary\"]::after {\n    border-color: #ffffff; }\n"

/***/ })
/******/ ]);