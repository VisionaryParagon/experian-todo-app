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

const tag = 'eds-switch';
const html = `
  <label>
    <div class="label"></div>
    <input type="checkbox" />
    <div class="switch-components api-switch">
      <div class="outline"></div>
      <div class="marker"></div>
    </div>
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

class EDSSwitchElement extends EDSElement {
  static get observedAttributes() {
    return EDSSwitchElement.normalizeObservedAttributes(mirroredInputAttributes.all.concat([
      'checked',
      'label',
      { tabindex: 'tabIndex' }
    ]));
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(mirroredInputAttributes.standard);
    this.defineFlagProperties(mirroredInputAttributes.flag);

    const input = this.$('input');
    const label = this.$('.label');
    const components = this.$('.switch-components');
    this._refs = { input, label, components };

    this.addEventListener('focus', () => components.classList.add('focus'));
    this.addEventListener('blur', () => components.classList.remove('focus'));

    input.addEventListener('change', () => this.checked = input.checked); // eslint-disable-line no-return-assign
    input.addEventListener('click', e => e.stopPropagation());

    this.bubbleShadowEvents(this._refs.input, ['change']);
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

  toggle() {
    this.checked = !this.checked;
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this._refs.label.innerText = value;
  }

  get checked() {
    return this._refs.input.checked;
  }

  set checked(value) {
    // Removed attributes have a null value
    if (value === null) return;
    if (value === false) {
      this.removeAttribute('checked');
      this._refs.input.checked = value;
    } else {
      this.setAttribute('checked');
      this._refs.input.checked = true;
    }
  }

  get tabIndex() {
    return this._refs.input.getAttribute('tabIndex');
  }

  set tabIndex(value) {
    // Removed attributes have a null value
    if (value === null) return;
    this._refs.input.setAttribute('tabIndex', value);
    this.removeAttribute('tabIndex');
  }
}

customElements.define(tag, EDSSwitchElement);
window.EDSSwitchElement = EDSSwitchElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-switch {\n  display: inline-block;\n  outline: none; }\n  eds-switch label {\n    display: table;\n    color: #333333; }\n  eds-switch .label {\n    font-size: 14px;\n    padding-right: 14px; }\n  eds-switch .label, eds-switch .switch-components {\n    display: table-cell;\n    vertical-align: middle; }\n  eds-switch .switch-components {\n    display: block;\n    position: relative;\n    min-width: 44px;\n    height: 22px; }\n    eds-switch .switch-components .outline, eds-switch .switch-components .marker {\n      position: absolute; }\n    eds-switch .switch-components .outline {\n      top: 0;\n      bottom: 0; }\n    eds-switch .switch-components .outline {\n      right: 0;\n      left: 0;\n      box-sizing: border-box;\n      border: 1px solid #888888;\n      border-radius: 11px;\n      transition: border-color 0.15s, background-color 0.15s; }\n    eds-switch .switch-components .marker {\n      position: absolute;\n      width: 16px;\n      height: 16px;\n      top: 3px;\n      border-radius: 50%;\n      transition: left 0.15s, background-color 0.15s; }\n  eds-switch input:not(:checked) + .switch-components .marker {\n    left: 3px; }\n  eds-switch:not([disabled]) input:not(:checked) + .switch-components .marker {\n    background: #888888; }\n  eds-switch input:checked + .switch-components .marker {\n    left: calc(100% - 16px - 3px); }\n  eds-switch:not([disabled]) input:checked + .switch-components .outline {\n    background: #426da9; }\n  eds-switch:not([disabled]) input:checked + .switch-components .marker {\n    background: #ffffff; }\n  eds-switch[disabled] input:checked + .switch-components .outline {\n    background: #DFDFDF; }\n  eds-switch[disabled] input:checked + .switch-components .marker {\n    background: #ffffff; }\n  eds-switch:not([disabled]) input:checked + .switch-components .outline {\n    border-color: #ffffff; }\n  eds-switch:active .switch-components .outline {\n    border-color: #888888; }\n  eds-switch:active .switch-components .marker {\n    background: #1d4f91; }\n  eds-switch:not([disabled]) .switch-components::after {\n    content: '';\n    position: absolute;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    border-radius: 16px;\n    border: 2px solid #426da9;\n    opacity: 0;\n    transition: opacity 0.15s ease; }\n  eds-switch:not([disabled]) .switch-components.focus::after, eds-switch:not([disabled]) .switch-components:focus::after {\n    opacity: 1;\n    transition: opacity 0.15s ease;\n    border-color: #426da9;\n    z-index: 900; }\n  eds-switch[disabled] .switch-components .outline {\n    border-color: #DFDFDF; }\n  eds-switch[disabled] .switch-components .marker {\n    background: #DFDFDF; }\n  eds-switch input {\n    position: absolute;\n    left: -10000px; }\n"

/***/ })
/******/ ]);