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

const tag = 'eds-checkbox';
const html = `
  <label>
    <input type="checkbox" />
    <div class="box">
      <svg class="check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
      </svg>
    </div>
    <span class="label"></span>
  </label>`;
const css = __webpack_require__(1);

const mirroredInputAttributes = {
  standard: [
    'autofocus',
    'form',
    { formaction: 'formAction' },
    { formenctype: 'formEnctype' },
    { formmethod: 'formMethod' },
    { formnovalidate: 'formNoValidate' },
    { formtarget: 'formTarget' },
    'name',
    'value'
  ],
  flag: [
    'disabled'
  ],
  get all() {
    const { standard, flag } = this;
    return standard.concat(flag);
  }
};

class EDSCheckboxElement extends EDSElement {
  static get observedAttributes() {
    return EDSCheckboxElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'checked',
      'label',
      { tabindex: 'tabIndex' }
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(mirroredInputAttributes.standard);
    this.defineFlagProperties(mirroredInputAttributes.flag);

    this._label = this.shadowRoot.querySelector('.label');
    this._input = this.shadowRoot.querySelector('input');
    this._box = this.shadowRoot.querySelector('.box');

    this.addEventListener('focus', () => this._box.classList.add('focus'));
    this.addEventListener('blur', () => this._box.classList.remove('focus'));
    this._input.addEventListener('change', () => this.checked = this._input.checked); // eslint-disable-line no-return-assign

    // Prevent two click events
    this._input.addEventListener('click', e => e.stopPropagation());

    this.bubbleShadowEvents(this._input, ['change']);
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    ~mirroredInputAttributes.all.indexOf(name) && this._input.setAttribute(name, value);
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    ~mirroredInputAttributes.all.indexOf(name) && this._input.removeAttribute(name);
  }

  focus() {
    this._input.focus();
  }

  blur() {
    this._input.blur();
  }

  toggle() {
    this.checked = !this.checked;
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this._label.innerText = value;
  }

  get checked() {
    return this._input.checked;
  }

  set checked(value) {
    // Removed attributes have a null value
    if (value === null) return;
    if (value === false) {
      this.removeAttribute('checked');
      this._input.checked = value;
    } else {
      this.setAttribute('checked');
      this._input.checked = true;
    }
  }

  get tabIndex() {
    return this._input.getAttribute('tabIndex');
  }

  set tabIndex(value) {
    // Removed attributes have a null value
    if (value === null) return;
    this._input.setAttribute('tabIndex', value);
    this.removeAttribute('tabIndex');
  }
}

customElements.define(tag, EDSCheckboxElement);
window.EDSCheckboxElement = EDSCheckboxElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-checkbox {\n  display: inline-block;\n  outline: none; }\n  eds-checkbox .box {\n    box-sizing: border-box;\n    width: 18px;\n    height: 18px;\n    border-radius: 3px;\n    border: 1px solid #939393;\n    display: inline-block;\n    background: #ffffff;\n    position: relative; }\n    eds-checkbox .box .check {\n      position: absolute;\n      width: 12px;\n      height: 12px;\n      fill: #426da9;\n      top: 2px;\n      left: 2px; }\n  eds-checkbox .label {\n    display: inline-block;\n    font-size: 14px;\n    position: relative;\n    top: -4px; }\n  eds-checkbox:not([checked]) .box .check {\n    display: none; }\n  eds-checkbox[checked] .box {\n    border-color: #426da9;\n    background-color: #426da9; }\n    eds-checkbox[checked] .box .check {\n      fill: #ffffff; }\n  eds-checkbox[disabled] {\n    color: #888888; }\n    eds-checkbox[disabled] .box {\n      border-color: #cccccc; }\n      eds-checkbox[disabled] .box .check {\n        fill: #cccccc; }\n    eds-checkbox[disabled][checked] .box {\n      background: #cccccc; }\n      eds-checkbox[disabled][checked] .box .check {\n        fill: #ffffff; }\n    eds-checkbox[disabled] label {\n      cursor: not-allowed; }\n  eds-checkbox:not([disabled]) .box::after {\n    content: '';\n    position: absolute;\n    top: -2px;\n    left: -2px;\n    right: -2px;\n    bottom: -2px;\n    border-radius: 4px;\n    border: 2px solid #426da9;\n    opacity: 0;\n    transition: opacity 0.15s ease; }\n  eds-checkbox:not([disabled]) .box.focus::after, eds-checkbox:not([disabled]) .box:focus::after {\n    opacity: 1;\n    transition: opacity 0.15s ease;\n    border-color: #426da9;\n    z-index: 900; }\n  eds-checkbox input {\n    position: absolute;\n    left: -10000px; }\n"

/***/ })
/******/ ]);