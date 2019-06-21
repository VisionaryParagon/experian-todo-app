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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_accordion_panel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_accordion_panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__eds_accordion_panel__);


const tag = 'eds-accordion';
const html = '<slot></slot>';
const css = __webpack_require__(2);

class EDSAccordionElement extends EDSElement {
  static get observedAttributes() {
    return ['multiple', 'wide'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.setAttribute('role', 'tablist');
    this.defineFlagProperties(['multiple', 'wide']);

    this.addEventListener('eds-accordion-panel-toggle', e => {
      e.stopPropagation();

      // Close other panels if needed
      if (!this.multiple && e.detail.active) {
        Array.from(this.querySelectorAll('eds-accordion-panel')).forEach(el => {
          if (el !== e.detail && el.active) el.active = false;
        });
      }
    });
  }
};

customElements.define(tag, EDSAccordionElement);
window.EDSAccordionElement = EDSAccordionElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const tag = 'eds-accordion-panel';
const html = `
  <button class='eds-accordion-panel-header'>
    <span class='eds-accordion-panel-label'></span>
    <span class='eds-accordion-panel-sublabel'></span>
    <span class='eds-accordion-panel-caret'></span>
  </button>
  <div class='eds-accordion-panel-content'>
    <slot></slot>
  </div>
`;
const css = '';
const ANIMATION_MS = 150;

class EDSAccordionPanelElement extends EDSElement {
  static get observedAttributes() {
    return ['active', 'label', 'expandedLabel', 'subLabel'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.setAttribute('role', 'tab');

    this._refs = {
      header: this.$('.eds-accordion-panel-header'),
      label: this.$('.eds-accordion-panel-label'),
      subLabel: this.$('.eds-accordion-panel-sublabel'),
      caret: this.$('.eds-accordion-panel-caret'),
      content: this.$('.eds-accordion-panel-content')
    };

    this.toggle = this.toggle.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
  }

  connectedCallback() {
    this._refs.header.addEventListener('click', this.toggle);
    this._refs.header.addEventListener('focus', this._handleFocus);
    this._refs.header.addEventListener('blur', this._handleBlur);
  }

  disconnectedCallback() {
    this._refs.header.removeEventListener('click', this.toggle);
    this._refs.header.removeEventListener('focus', this._handleFocus);
    this._refs.header.removeEventListener('blur', this._handleBlur);
  }

  _handleFocus() {
    this.classList.add('focus');
  }

  _handleBlur(e) {
    this.classList.remove('focus');
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this._resolveLabel();
  }

  _resolveLabel() {
    if (this.active) {
      this._refs.label.innerHTML = this.expandedLabel || this.label;
    } else {
      this._refs.label.innerHTML = this.label;
    }
  }

  get expandedLabel() {
    return this.getAttribute('expandedlabel');
  }

  set expandedLabel(value) {
    this.setAttribute('expandedlabel', value);
    this._resolveLabel();
  }

  get subLabel() {
    return this.getAttribute('sublabel');
  }

  set subLabel(value) {
    this.setAttribute('sublabel', value);
    this._refs.subLabel.innerHTML = value;
  }

  toggle() {
    this.active = !this.active;
  }

  get active() {
    return this.flagAttributeIsTruthy(this.getAttribute('active'));
  }

  set active(value) {
    if (this.flagAttributeIsTruthy(value)) {
      this._refs.content.style.display = 'block'; // prevent tabbing to children
      this.setAttribute('aria-expanded', true);
      setTimeout(() => { this.classList.add('active'); });
    } else {
      setTimeout(() => { this._refs.content.style.display = 'none'; }, ANIMATION_MS);
      this.setAttribute('aria-expanded', false);
      this.classList.remove('active');
    }
    this.setOrRemoveFlagAttribute('active', value);
    this._resolveLabel();
    this.dispatchEvent(new CustomEvent('eds-accordion-panel-toggle', { detail: this, bubbles: true }));
  }
};

customElements.define(tag, EDSAccordionPanelElement);
window.EDSAccordionPanelElement = EDSAccordionPanelElement;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-accordion eds-accordion-panel .eds-accordion-panel-content {\n  transition: padding 100ms ease 0ms, opacity 75ms ease 25ms; }\n\neds-accordion eds-accordion-panel .eds-accordion-panel-caret {\n  transition: transform 150ms ease 0ms; }\n\neds-accordion eds-accordion-panel.active .eds-accordion-panel-content {\n  transition: padding 150ms ease 0ms; }\n\neds-accordion {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #cccccc;\n  border-radius: 6px;\n  background-color: #ffffff; }\n  eds-accordion eds-accordion-panel {\n    border-top: 1px solid #cccccc;\n    position: relative;\n    display: flex;\n    flex-direction: column; }\n    eds-accordion eds-accordion-panel::after {\n      content: '';\n      position: absolute;\n      top: -2px;\n      left: -2px;\n      right: -2px;\n      bottom: -2px;\n      border-radius: 4px;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    eds-accordion eds-accordion-panel.focus::after, eds-accordion eds-accordion-panel:focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease;\n      border-color: #426da9;\n      z-index: 900; }\n    eds-accordion eds-accordion-panel::after {\n      pointer-events: none !important; }\n    eds-accordion eds-accordion-panel .eds-accordion-panel-header {\n      text-align: left;\n      border: 0;\n      height: 40px;\n      padding: 10px 20px;\n      background-color: #f6f6f6;\n      font-weight: 500;\n      font-size: 14px;\n      cursor: pointer; }\n      eds-accordion eds-accordion-panel .eds-accordion-panel-header:focus, eds-accordion eds-accordion-panel .eds-accordion-panel-header:active {\n        outline: none; }\n      eds-accordion eds-accordion-panel .eds-accordion-panel-header .eds-accordion-panel-caret {\n        position: absolute;\n        right: 20px;\n        top: 16px;\n        width: 12px;\n        height: 8px;\n        background-repeat: no-repeat;\n        background-size: contain;\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxMiA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDEuMDAwMDAwKSByb3RhdGUoLTQ1LjAwMDAwMCkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTEuMDAwMDAwKSB0cmFuc2xhdGUoMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMwRTZFQjciPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\"); }\n    eds-accordion eds-accordion-panel .eds-accordion-panel-content {\n      padding: 0 20px;\n      margin: 0;\n      font-size: 14px;\n      max-height: 0;\n      opacity: 0; }\n    eds-accordion eds-accordion-panel.active {\n      min-height: 200px; }\n      eds-accordion eds-accordion-panel.active .eds-accordion-panel-header {\n        background-color: transparent;\n        border-bottom: 1px solid #cccccc;\n        margin: 0 20px;\n        padding: 10px 0 9px;\n        width: auto; }\n        eds-accordion eds-accordion-panel.active .eds-accordion-panel-header .eds-accordion-panel-caret {\n          transform: rotate(180deg); }\n      eds-accordion eds-accordion-panel.active .eds-accordion-panel-content {\n        max-height: none;\n        padding: 24px 20px;\n        opacity: 1; }\n    eds-accordion eds-accordion-panel:first-child {\n      border: 0; }\n  eds-accordion[wide], eds-accordion[wide=\"true\"] {\n    border-radius: 0; }\n    eds-accordion[wide] eds-accordion-panel .eds-accordion-panel-header, eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-panel-header {\n      padding: 10px 50px; }\n      eds-accordion[wide] eds-accordion-panel .eds-accordion-panel-header .eds-accordion-panel-label, eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-panel-header .eds-accordion-panel-label {\n        text-transform: uppercase;\n        color: #6d2077; }\n      eds-accordion[wide] eds-accordion-panel .eds-accordion-panel-header .eds-accordion-panel-caret, eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-panel-header .eds-accordion-panel-caret {\n        top: 16px;\n        left: 19px; }\n    eds-accordion[wide] eds-accordion-panel .eds-accordion-panel-content, eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-panel-content {\n      padding: 0 50px; }\n    eds-accordion[wide] eds-accordion-panel.active .eds-accordion-panel-header, eds-accordion[wide=\"true\"] eds-accordion-panel.active .eds-accordion-panel-header {\n      border: 0;\n      padding: 11px 0;\n      margin: 0 50px; }\n    eds-accordion[wide] eds-accordion-panel.active .eds-accordion-panel-content, eds-accordion[wide=\"true\"] eds-accordion-panel.active .eds-accordion-panel-content {\n      padding: 24px 50px 48px 50px; }\n"

/***/ })
/******/ ]);