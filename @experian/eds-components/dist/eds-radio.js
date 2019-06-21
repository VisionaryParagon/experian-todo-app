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

const tag = 'eds-radio';
const html = `
  <label>
    <input type="radio" />
    <div class="radio-components"></div>
    <div class="label"></div>
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
    'checked',
    'disabled'
  ],
  get all() {
    const { standard, flag } = this;
    return standard.concat(flag);
  }
};

class EDSRadioElement extends EDSElement {
  static get observedAttributes() {
    return EDSRadioElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'label'
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(mirroredInputAttributes.standard);
    this.defineFlagProperties(mirroredInputAttributes.flag);

    const input = this.$('input');
    const label = this.$('.label');
    this._refs = { input, label };

    input.addEventListener('focus', () => this.classList.add('focused'));
    input.addEventListener('blur', () => this.classList.remove('focused'));

    input.addEventListener('change', () => this.checked = input.checked); // eslint-disable-line no-return-assign
    input.addEventListener('click', e => e.stopPropagation());
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    ~mirroredInputAttributes.all.indexOf(name) && this._refs.input.setAttribute(name, value);
  }

  removeAttribute(name) {
    super.removeAttribute(name);
    ~mirroredInputAttributes.all.indexOf(name) && this._refs.input.removeAttribute(name);
  }

  focus() {
    this._refs.input.focus();
  }

  blur() {
    this._refs.input.blur();
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this._refs.label.innerText = value;
  }
}

customElements.define(tag, EDSRadioElement);
window.EDSRadioElement = EDSRadioElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-radio {\n  display: inline-block; }\n  eds-radio label {\n    display: flex;\n    align-items: center;\n    color: #333333; }\n  eds-radio .radio-components {\n    position: relative;\n    margin-right: 8px;\n    display: inline-block;\n    width: 18px;\n    height: 18px;\n    border-radius: 50%;\n    border: 1px solid #939393; }\n  eds-radio input + .radio-components::after {\n    content: '';\n    display: block;\n    background-color: #426da9;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    margin: 3px 0 0 3px;\n    opacity: 0; }\n  eds-radio input:checked + .radio-components {\n    border-color: #426da9; }\n    eds-radio input:checked + .radio-components::after {\n      opacity: 1; }\n  eds-radio[disabled] .label {\n    color: #888888; }\n  eds-radio[disabled] input + .radio-components {\n    border-color: #cccccc; }\n    eds-radio[disabled] input + .radio-components::after {\n      background-color: #cccccc; }\n  eds-radio .radio-components::before {\n    content: '';\n    position: absolute;\n    top: -2px;\n    left: -2px;\n    right: -2px;\n    bottom: -2px;\n    border-radius: 50%;\n    border: 2px solid #426da9;\n    opacity: 0;\n    transition: opacity 0.15s ease; }\n  eds-radio input:focus + .radio-components::before {\n    opacity: 1; }\n  eds-radio input {\n    position: absolute;\n    left: -10000px; }\n"

/***/ })
/******/ ]);