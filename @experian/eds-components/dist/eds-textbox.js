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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_uniqueId__ = __webpack_require__(1);

const tag = 'eds-textbox';
const css = __webpack_require__(2);
const html = __webpack_require__(3);

const mirroredInputAttributes = {
  default: [
    'autocomplete',
    'autofocus',
    'form',
    { formaction: 'formAction' },
    { formenctype: 'formEnctype' },
    { formmethod: 'formMethod' },
    { formnovalidate: 'formNoValidate' },
    { formtarget: 'formTarget' },
    'inputmode',
    'list',
    'max',
    'maxlength',
    'min',
    'minlength',
    'name',
    'pattern',
    'spellcheck'
  ],
  flags: [
    'borderless',
    'disabled',
    'readonly',
    'required'
  ],
  get all() {
    return this.default.concat(this.flags);
  }
};

class EDSTextboxElement extends EDSElement {
  static get observedAttributes() {
    return EDSTextboxElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'label', 'placeholder', 'value', 'info', 'warning', 'error', 'mode'
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      label: this.$('label'),
      inputWrap: this.$('.input-wrap'),
      input: this.$('input'),
      inline: this.$('.eds-textbox-inline'),
      inlineSlot: this.$('.eds-textbox-inline-slot'),
      prepend: this.$('.eds-textbox-prepend'),
      prependSlot: this.$('.eds-textbox-prepend-slot'),
      messages: this.$('.eds-textbox-messages'),
      errorText: this.$('.error-text'),
      warningText: this.$('.warning-text'),
      infoText: this.$('.info-text')
    };
    this.defineDefaultProperties(mirroredInputAttributes.default);
    this.defineFlagProperties(mirroredInputAttributes.flags);

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Methods
    this.proxyNativeMethods([
      'focus', 'blur', 'select', 'click', 'setSelectionRange', 'setRangeText',
      'setCustomValidity', 'checkValidity', 'reportValidity'
    ], this._refs.input);

    this._refs.prependSlot.addEventListener('slotchange', () => {
      this._handlePrependSlot(this._refs.prependSlot.assignedNodes());
    });
    this._refs.inlineSlot.addEventListener('slotchange', () => {
      this._handleInlineSlot(this._refs.inlineSlot.assignedNodes());
    });

    const prepareMessageId = type => {
      const id = Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_uniqueId__["a" /* uniqueId */])();
      this._refs[type + 'Text'].setAttribute('id', id);
      return id;
    };

    this._refs.label.setAttribute('id', Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_uniqueId__["a" /* uniqueId */])());
    this._refs.input.setAttribute('aria-describedby', `${prepareMessageId('error')} ${prepareMessageId('warning')} ${prepareMessageId('info')}`);
  }

  connectedCallback() {
    this._refs.input.addEventListener('focus', () => this._refs.inputWrap.classList.add('focus'));
    this._refs.input.addEventListener('blur', () => this._refs.inputWrap.classList.remove('focus'));
    this.bubbleShadowEvents(this._refs.input, ['change']);

    super.connectedCallback();
  }

  _handlePrependSlot(els) {
    if (els.length) this._refs.prepend.classList.add('eds-show');
    else this._refs.prepend.classList.remove('eds-show');
  }

  _handleInlineSlot(els) {
    if (els.length) this._refs.inline.classList.add('eds-show');
    else this._refs.inline.classList.remove('eds-show');
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
    return this._refs.label.textContent;
  }

  set label(value) {
    if (value) this._refs.label.classList.add('show');
    else this._refs.label.classList.remove('show');
    this._refs.label.textContent = value;
    this._resolveAriaLabel();
  }

  get placeholder() {
    return this._refs.input.getAttribute('placeholder');
  }

  set placeholder(value) {
    this._refs.input.setAttribute('placeholder', value);
    this._resolveAriaLabel();
  }

  _resolveAriaLabel() {
    const input = this._refs.input;
    const labelledBy = this.getAttribute('aria-labelledby');
    if (labelledBy) input.setAttribute('aria-labelledby', labelledBy);
    else if (this.label) input.setAttribute('aria-labelledby', this._refs.label.getAttribute('id'));
    else if (this.placeholder) input.setAttribute('aria-label', this.placeholder);
  }

  get value() {
    return this._refs.input.value;
  }

  set value(val) {
    this._refs.input.value = val;
  }

  _refreshMessages() {
    if (this.error || this.warning || this.info) this._refs.messages.style.display = 'block';
    else this._refs.messages.style.display = 'none';
  }

  _getStatus(attr) {
    return this.getAttribute(attr);
  }

  _setStatus(attr, value) {
    if (!value) {
      this.removeAttribute(attr);
    } else {
      this.setAttribute(attr, value);
    }
    this._refs[attr + 'Text'].innerHTML = typeof value === 'string' ? value : '';
    this._refreshMessages();
  }

  get error() {
    return this._getStatus('error');
  }

  set error(value) {
    this._setStatus('error', value);
  }

  get warning() {
    return this._getStatus('warning');
  }

  set warning(value) {
    this._setStatus('warning', value);
  }

  get info() {
    return this._getStatus('info');
  }

  set info(value) {
    this._setStatus('info', value);
  }

  get mode() {
    return this.getAttribute('mode');
  }

  set mode(value) {
    this.setAttribute('mode', value);
    switch (value) {
      case 'password':
        this._refs.input.type = 'password';
        break;
      default:
        this._refs.input.type = 'text';
        break;
    }
  }
}

customElements.define(tag, EDSTextboxElement);
window.EDSTextboxElement = EDSTextboxElement;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = uniqueId;
function uniqueId() {
  // Credit: https://gist.github.com/gordonbrander/2230317
  return '_' + Math.random().toString(36).substr(2, 9);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-textbox {\n  position: relative;\n  display: inline-block; }\n  eds-textbox[warning] .input-wrap::after {\n    opacity: 1;\n    border-color: #f5a70a; }\n  eds-textbox[warning] .input-wrap input {\n    background-color: #fefaeb; }\n  eds-textbox[error] .input-wrap::after {\n    opacity: 1;\n    border-color: #e4002b; }\n  eds-textbox[error] .input-wrap input {\n    background-color: #fff5f7; }\n  eds-textbox .input-wrap {\n    pointer-events: none;\n    position: relative;\n    border: 1px solid #939393;\n    border-radius: 4px;\n    display: inline-flex; }\n    eds-textbox .input-wrap::after {\n      content: '';\n      position: absolute;\n      top: -2px;\n      left: -2px;\n      right: -2px;\n      bottom: -2px;\n      border-radius: 4px;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    eds-textbox .input-wrap.focus::after, eds-textbox .input-wrap:focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease;\n      border-color: #426da9;\n      z-index: 900; }\n  eds-textbox[noborder] .input-wrap {\n    border-color: transparent; }\n    eds-textbox[noborder] .input-wrap.focus input, eds-textbox[noborder] .input-wrap:focus input {\n      background-color: #ffffff; }\n  eds-textbox[noborder] input {\n    background-color: transparent; }\n  eds-textbox label {\n    display: none;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 16px;\n    margin-bottom: 10px; }\n    eds-textbox label.show {\n      display: block; }\n  eds-textbox input {\n    pointer-events: auto;\n    display: block;\n    background-color: white;\n    width: 100%;\n    box-sizing: border-box;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    padding: 5px 10px;\n    line-height: 22.4px;\n    outline: none;\n    border: none;\n    border-radius: 4px;\n    transition: border-color 0.15s ease; }\n    eds-textbox input:-moz-placeholder {\n      opacity: 1;\n      color: #b9b9b9;\n      font-weight: 400;\n      font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n    eds-textbox input:-ms-input-placeholder {\n      color: #b9b9b9;\n      font-weight: 400;\n      font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n    eds-textbox input::-webkit-input-placeholder {\n      color: #b9b9b9;\n      font-weight: 400;\n      font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n    eds-textbox input::-ms-clear, eds-textbox input::-ms-reveal {\n      display: none; }\n  eds-textbox[disabled] {\n    cursor: not-allowed; }\n    eds-textbox[disabled] .input-wrap {\n      border-color: #b9b9b9;\n      border-style: dotted; }\n    eds-textbox[disabled] input {\n      cursor: not-allowed;\n      color: #888888; }\n  eds-textbox .eds-textbox-messages {\n    padding-top: 5px;\n    display: none; }\n    eds-textbox .eds-textbox-messages .info-text, eds-textbox .eds-textbox-messages .warning-text, eds-textbox .eds-textbox-messages .error-text {\n      font-size: 13px; }\n    eds-textbox .eds-textbox-messages .warning-text {\n      color: #ad5700; }\n    eds-textbox .eds-textbox-messages .error-text {\n      color: #cd0026; }\n  eds-textbox .eds-textbox-prepend {\n    display: none;\n    border-top-left-radius: 4px;\n    border-bottom-left-radius: 4px;\n    border-right: 1px solid #d8d8d8;\n    background: #f6f6f6;\n    pointer-events: auto; }\n    eds-textbox .eds-textbox-prepend span {\n      display: inline-block;\n      color: #333333;\n      padding: 5px 10px 0; }\n    eds-textbox .eds-textbox-prepend eds-icon {\n      font-size: 14px;\n      color: #888888;\n      margin: 9px 10px 0; }\n    eds-textbox .eds-textbox-prepend.eds-show {\n      display: block; }\n  eds-textbox .eds-textbox-inline {\n    display: none;\n    color: #426da9;\n    pointer-events: auto; }\n    eds-textbox .eds-textbox-inline span {\n      display: inline-block;\n      padding: 5px 10px 0; }\n    eds-textbox .eds-textbox-inline eds-icon {\n      font-size: 14px;\n      margin: 9px 10px 0 2px; }\n    eds-textbox .eds-textbox-inline.eds-show {\n      display: block; }\n"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<label></label>\n<div class=\"input-wrap\">\n  <div class='eds-textbox-prepend'>\n    <slot name='prepend' class='eds-textbox-prepend-slot'></slot>\n  </div>\n  <input type=\"text\" />\n  <div class='eds-textbox-inline'>\n    <slot name='inline' class='eds-textbox-inline-slot'></slot>\n  </div>\n</div>\n<div class='eds-textbox-messages'>\n  <div class='error-text' role='alert'></div>\n  <div class='warning-text' role='alert'></div>\n  <div class='info-text' role='alert'></div>\n</div>"

/***/ })
/******/ ]);