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

const tag = 'eds-textarea';
const css = __webpack_require__(1);
const html = __webpack_require__(2);

const mirroredInputAttributes = {
  default: [
    'autofocus',
    'cols',
    'dirname',
    'form',
    { formaction: 'formAction' },
    { formenctype: 'formEnctype' },
    { formmethod: 'formMethod' },
    { formnovalidate: 'formNoValidate' },
    { formtarget: 'formTarget' },
    'maxlength',
    'name',
    'placeholder',
    'rows',
    'wrap'
  ],
  flags: [
    'disabled',
    'readonly',
    'required'
  ],
  get all() {
    return this.default.concat(this.flags);
  }
};

class EDSTextareaElement extends EDSElement {
  static get observedAttributes() {
    return EDSTextareaElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'label', 'value', 'mode'
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      label: this.$('label'),
      inputWrap: this.$('.input-wrap'),
      input: this.$('textarea')
    };
    this.defineDefaultProperties(mirroredInputAttributes.default);
    this.defineFlagProperties(mirroredInputAttributes.flags);

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#Methods
    this.proxyNativeMethods([
      'focus', 'blur', 'select', 'click', 'setSelectionRange',
      'setCustomValidity', 'checkValidity', 'reportValidity'
    ], this._refs.input);
  }

  connectedCallback() {
    this._refs.input.addEventListener('focus', () => this._refs.inputWrap.classList.add('focus'));
    this._refs.input.addEventListener('blur', () => this._refs.inputWrap.classList.remove('focus'));
    this.bubbleShadowEvents(this._refs.input, ['change']);

    super.connectedCallback();
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    this._refs.input.setAttribute(name, value);
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    this._refs.input.removeAttribute(name);
  }

  get label() {
    return this.shadowRoot.querySelector('label').textContent;
  }

  set label(value) {
    if (value) this._refs.label.classList.add('show');
    else this._refs.label.classList.remove('show');
    this._refs.label.textContent = value;
  }

  get value() {
    return this._refs.input.value;
  }

  set value(val) {
    this._refs.input.value = val;
  }
}

customElements.define(tag, EDSTextareaElement);
window.EDSTextareaElement = EDSTextareaElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-textarea {\n  position: relative;\n  display: inline-block; }\n  eds-textarea .input-wrap {\n    pointer-events: none;\n    position: relative;\n    border: 1px solid #939393;\n    border-radius: 4px;\n    display: inline-flex; }\n    eds-textarea .input-wrap::after {\n      content: '';\n      position: absolute;\n      top: -2px;\n      left: -2px;\n      right: -2px;\n      bottom: -2px;\n      border-radius: 4px;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    eds-textarea .input-wrap.focus::after, eds-textarea .input-wrap:focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease;\n      border-color: #426da9;\n      z-index: 900; }\n  eds-textarea[noborder] .input-wrap {\n    border-color: transparent; }\n  eds-textarea[noborder] textarea {\n    border: none; }\n    eds-textarea[noborder] textarea.focus input, eds-textarea[noborder] textarea:focus input {\n      background-color: #ffffff; }\n  eds-textarea label {\n    display: none;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 16px;\n    margin-bottom: 10px; }\n    eds-textarea label.show {\n      display: block; }\n  eds-textarea textarea {\n    pointer-events: auto;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    padding: 5px 10px;\n    line-height: 22.4px;\n    outline: none;\n    border: none;\n    border-radius: 4px; }\n  eds-textarea[disabled] {\n    cursor: not-allowed; }\n    eds-textarea[disabled] .input-wrap {\n      border-color: #b9b9b9;\n      border-style: dotted; }\n"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<label></label>\n<div class=\"input-wrap\">\n  <textarea></textarea>\n</div>"

/***/ })
/******/ ]);