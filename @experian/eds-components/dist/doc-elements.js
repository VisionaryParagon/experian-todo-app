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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const template = `
  <div class="api-item-container">
    <div class="api-item">
      {{replace}}
    </div>
    <div class="summary"><slot></slot></div>
    <div class="clear"></div>
  </div>
`;

class APIElement extends EDSElement {
  static get observedAttributes() {
    return APIElement.normalizeObservedAttributes([
      'name', 'type', 'default', 'args', 'required', 'deprecated', 'detail',
      { returntype: 'returnType' },
      { attributeonly: 'attributeOnly' },
      { propertyonly: 'propertyOnly' },
      { readonly: 'readOnly' }
    ]);
  }

  init() {
    this.template = template;
  }

  connectedCallback() {
    const el = this.shadowRoot.querySelector('.api-item-container .api-item');
    el.addEventListener('click', this.onItemClick.bind(this));

    super.connectedCallback();
  }

  getTemplate(html) {
    return this.template.replace('{{replace}}', html);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const el = this.shadowRoot.querySelector(`.${name}`);
    if (el) el.innerHTML = newValue;
    this[name] = newValue;
  }

  set deprecated(val) {
    const el = this.shadowRoot.querySelector('.deprecated');
    if (!el) return;
    el.innerHTML = 'DEPRECATED';
    el.style.display = 'inline-block';
  }

  set required(val) {
    const el = this.shadowRoot.querySelector('.required');
    if (!el) return;
    el.innerHTML = '(required)';
    el.style.display = 'inline-block';
  }

  onItemClick() {
    const el = this.shadowRoot.querySelector('.api-item-container');
    el.classList.toggle('expanded');
  }

  expand() {
    const el = this.shadowRoot.querySelector('.api-item-container');
    el.classList.add('expanded');
  }

  collapse() {
    const el = this.shadowRoot.querySelector('.api-item-container');
    el.classList.remove('expanded');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = APIElement;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_items__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doc_header__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doc_header___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__doc_header__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doc_note__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doc_note___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__doc_note__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__doc_guideline__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__doc_guideline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__doc_guideline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mdn_doc_link__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mdn_doc_link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__mdn_doc_link__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__on_first_visible__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__on_first_visible___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__on_first_visible__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__eds_core_styles__ = __webpack_require__(15);








const css = __webpack_require__(16);

Object(__WEBPACK_IMPORTED_MODULE_6__eds_core_styles__["a" /* addStyle */])('doc-code', css);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_method__ = __webpack_require__(6);





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_element__ = __webpack_require__(0);

// HACK: styles for all api elements are hoisted only once in api-option.
const css = __webpack_require__(4);
const tag = 'api-option';
const template = `
  <span class='api-name name'></span>
  <span class='required'></span>:
  <span class='type option-type'></span>
  <span class='default'></span>
  <span class='deprecated'></span>
  <span class='property-only'></span>
  <span class='attribute-only'></span>
  <span class='read-only'></span>
`;

customElements.define(tag, class _ extends __WEBPACK_IMPORTED_MODULE_0__api_element__["a" /* default */] {
  init() {
    super.init();
    this.initShadowDOM(tag, this.getTemplate(template), css);
  }

  set default(val) {
    const el = this.shadowRoot.querySelector('.default');
    el.innerHTML = `= ${val}`;
    el.style.display = 'inline-block';
  }

  set propertyOnly(val) {
    const el = this.shadowRoot.querySelector('.property-only');
    if (!el) return;
    el.innerHTML = 'Property Only';
    el.style.display = 'inline-block';
  }

  set attributeOnly(val) {
    const el = this.shadowRoot.querySelector('.attribute-only');
    if (!el) return;
    el.innerHTML = 'Attribute Only';
    el.style.display = 'inline-block';
  }

  set readOnly(val) {
    const el = this.shadowRoot.querySelector('.read-only');
    if (!el) return;
    el.innerHTML = 'Read Only';
    el.style.display = 'inline-block';
  }
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n.api-item-container {\n  display: block;\n  border-top: 1px solid #d8d8d8;\n  margin-top: 1em;\n  padding-bottom: 1em;\n  background-color: transparent;\n  box-sizing: border-box;\n  max-height: 65px;\n  overflow: hidden;\n  -webkit-transition: max-height 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), background-color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n  -moz-transition: max-height 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), background-color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n  transition: max-height 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), background-color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1); }\n  .api-item-container .code-live {\n    display: none;\n    box-sizing: border-box; }\n  .api-item-container.expanded {\n    max-height: 2000px;\n    background-color: #f9fcff;\n    padding-left: 1em;\n    padding-right: 1em;\n    margin-left: -1em;\n    margin-right: -1em;\n    -webkit-transition: max-height 0.22s cubic-bezier(0.55, 0.085, 0.68, 0.53), background-color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    -moz-transition: max-height 0.22s cubic-bezier(0.55, 0.085, 0.68, 0.53), background-color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    transition: max-height 0.22s cubic-bezier(0.55, 0.085, 0.68, 0.53), background-color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1); }\n    .api-item-container.expanded .code-live {\n      display: block;\n      width: 100%;\n      float: none;\n      background-color: white;\n      padding: 1.5em;\n      border: 1px solid #e6e6e6;\n      border-bottom: none;\n      border-top-left-radius: 2px;\n      border-top-right-radius: 2px;\n      margin-top: 1em; }\n    .api-item-container.expanded .api-item:before {\n      left: 0;\n      width: 100%;\n      background-color: #426da9;\n      opacity: 1;\n      -webkit-transition: left 0.1s, width 0.1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.1s;\n      -moz-transition: left 0.1s, width 0.1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.1s;\n      transition: left 0.1s, width 0.1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.1s; }\n    .api-item-container.expanded .api-item, .api-item-container.expanded .api-item:hover {\n      background-color: transparent;\n      padding-left: 1em;\n      padding-right: 1em;\n      margin-left: -1em;\n      margin-right: -1em; }\n      .api-item-container.expanded .api-item:after, .api-item-container.expanded .api-item:hover:after {\n        content: 'collapse';\n        display: block;\n        float: right;\n        padding: 0px 10px;\n        font-size: 0.8em;\n        color: #426da9;\n        font-weight: 400;\n        font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n    .api-item-container.expanded .summary {\n      color: #333333; }\n  .api-item-container .api-item {\n    position: relative;\n    cursor: pointer;\n    font-family: Consolas, Monaco, \"Andale Mono\", \"Ubuntu Mono\", monospace;\n    font-weight: 300;\n    font-size: 15px;\n    padding: 10px 0; }\n    .api-item-container .api-item:before {\n      content: '';\n      display: block;\n      position: absolute;\n      top: 0;\n      left: 50%;\n      width: 0%;\n      height: 2px;\n      background-color: #426da9;\n      opacity: 0;\n      -webkit-transition: left 0.1s, width 0.1s cubic-bezier(0.39, 0.575, 0.565, 1), opacity 0.1s;\n      -moz-transition: left 0.1s, width 0.1s cubic-bezier(0.39, 0.575, 0.565, 1), opacity 0.1s;\n      transition: left 0.1s, width 0.1s cubic-bezier(0.39, 0.575, 0.565, 1), opacity 0.1s; }\n    .api-item-container .api-item:hover {\n      background-color: #f6f6f6; }\n      .api-item-container .api-item:hover:after {\n        display: block;\n        float: right;\n        padding: 0px 10px;\n        font-size: 0.8em;\n        content: 'expand';\n        color: #426da9;\n        font-weight: 400;\n        font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n    .api-item-container .api-item > span {\n      display: inline-block; }\n    .api-item-container .api-item ul, .api-item-container .api-item li {\n      margin: 0;\n      list-style: none; }\n    .api-item-container .api-item .api-name {\n      font-weight: 500;\n      font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n      font-size: 16px;\n      color: #1d4f91; }\n    .api-item-container .api-item .required {\n      display: none; }\n    .api-item-container .api-item .default {\n      display: none;\n      color: #555; }\n    .api-item-container .api-item .deprecated {\n      display: none;\n      color: red;\n      font-weight: 700;\n      padding-left: 1em; }\n  .api-item-container .summary {\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    color: #b9b9b9;\n    line-height: 1.6rem; }\n  .api-item-container:not(.expanded) code {\n    color: #b9b9b9; }\n  .api-item-container .clear {\n    clear: both; }\n  .api-item-container .code-highlight {\n    border: 1px solid #e6e6e6; }\n  .api-item-container .code-live + .code-highlight {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    margin: 0; }\n\n.api-item-container .api-item .option-type {\n  color: #a064af; }\n\n.api-item-container .api-item .attribute-only, .api-item-container .api-item .property-only, .api-item-container .api-item .read-only {\n  display: none;\n  font-size: 12px;\n  font-weight: 400;\n  padding: 1px 10px;\n  border-radius: 14px;\n  margin-left: 1rem;\n  font-family: Roboto; }\n\n.api-item-container .api-item .property-only {\n  background-color: #FEECB1;\n  color: #B25B00; }\n\n.api-item-container .api-item .attribute-only {\n  background-color: #FEECB1;\n  color: #B25B00; }\n\n.api-item-container .api-item .read-only {\n  background-color: #dcdcdc;\n  color: #333333; }\n\n.api-item-container .api-item .event-name {\n  margin-right: 3px; }\n\n.api-item-container .api-item .event-type {\n  margin-left: 3px;\n  color: #a064af; }\n\n.api-item-container .api-item .event-detail {\n  margin-left: 3px;\n  color: #9b6a16; }\n  .api-item-container .api-item .event-detail:before {\n    color: #333333;\n    content: 'e.detail = '; }\n\n.api-item-container .api-item .method-arg {\n  color: #9b6a16; }\n\n.api-item-container .api-item .method-arg-type {\n  color: #a064af; }\n\n.api-item-container .api-item .method-return-type {\n  color: #555; }\n"

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_element__ = __webpack_require__(0);

const tag = 'api-event';
const template = `
  <span class='api-name name event-name'></span>
  &rarr;
  <span class='type event-type'>CustomEvent</span>
  <span class='detail event-detail'>null</span>
  <span class='deprecated'></span>
`;

customElements.define(tag, class _ extends __WEBPACK_IMPORTED_MODULE_0__api_element__["a" /* default */] {
  init() {
    super.init();
    this.initShadowDOM(tag, this.getTemplate(template));
  }
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_element__ = __webpack_require__(0);

const tag = 'api-method';
const template = `
  <span class='api-name name'></span>
  <span>(</span><span class='method-args'></span><span>) :</span>
  <span class='method-return-type returnType'>void</span>
  <span class='deprecated'></span>
`;

customElements.define(tag, class _ extends __WEBPACK_IMPORTED_MODULE_0__api_element__["a" /* default */] {
  init() {
    super.init();
    this.initShadowDOM(tag, this.getTemplate(template));
  }

  set args(val) {
    const el = this.shadowRoot.querySelector('.method-args');
    el.innerHTML = this.formatArgs(val);
  }

  formatArgs(args) {
    if (!args.length) return [];
    let arrayArgs = args.split(',');
    arrayArgs = arrayArgs.map(arg => {
      if (arg.length) {
        let html = arg.trim().split(':');
        if (html.length) return `<span class='method-arg'>${html[0]}</span> : <span class='method-arg-type'>${html[1]}</span>`;
        return `<span class='method-arg'>${html[0]}</span>`;
      }
      return arg;
    });

    return arrayArgs.join(', ');
  }
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const tag = 'doc-header';
const template = '<slot></slot>';
const css = __webpack_require__(8);

customElements.define(tag, class _ extends EDSElement {
  init() {
    this.initShadowDOM(tag, template, css);
  }
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\ndoc-header {\n  display: block;\n  margin: 2rem 0 1rem;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  color: #333333;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-size: 18px;\n  color: #333333;\n  font-weight: bold; }\n  doc-header[caps] {\n    text-transform: uppercase;\n    font-size: 14px;\n    color: #6d2077;\n    font-weight: 400; }\n"

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const tag = 'doc-note';
const template = '<slot></slot>';
const css = __webpack_require__(10);

customElements.define(tag, class _ extends EDSElement {
  static get observedAttributes() {
    return ['motif'];
  }

  init() {
    this.initShadowDOM(tag, template, css);
  }
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\ndoc-note {\n  display: block;\n  margin: 1rem 0;\n  padding: 1rem;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  color: #333333;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  border-radius: 6px;\n  border: 1px solid #d8d8d8;\n  background-color: white; }\n\ndoc-note[motif='warning'] {\n  border-color: #fceedb;\n  background-color: #fef9f3; }\n"

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const tag = 'doc-guideline';
const template = `
  <div class="doc-guideline-example">
    <slot name="example"></slot>
  </div>
  <div class="doc-guideline-motif"></div>
  <div class='doc-guideline-guideline'>
    <slot name="guideline"></slot>
  </div>
`;
const css = __webpack_require__(12);

customElements.define(tag, class _ extends EDSElement {
  static get observedAttributes() {
    return ['motif'];
  }

  init() {
    this.initShadowDOM(tag, template, css);

    this._refs = {
      motif: this.$('.doc-guideline-motif')
    };

    this.motif = this.motif;
  }

  get motif() {
    return this.getAttribute('motif') || 'success';
  }

  set motif(value) {
    this.setAttribute('motif', value);

    switch (value) {
      case 'error':
        this._refs.motif.innerHTML = 'DON\'T';
        break;
      case 'warning':
        this._refs.motif.innerHTML = 'CAUTION';
        break;
      case 'success':
      default:
        this._refs.motif.innerHTML = 'DO';
    }
  }
});


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\ndoc-guideline {\n  display: block;\n  margin: 2rem 0;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  color: #333333;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n  doc-guideline .doc-guideline-example {\n    border-radius: 4px;\n    background: #f6f6f6;\n    padding: 1rem;\n    overflow: hidden; }\n  doc-guideline .doc-guideline-motif {\n    border-radius: 4px;\n    padding: 4px 12px 4px 40px;\n    font-weight: bold;\n    position: relative;\n    margin: 1rem 0; }\n    doc-guideline .doc-guideline-motif::after {\n      content: \"\";\n      width: 16px;\n      height: 16px;\n      display: block;\n      background-size: contain;\n      position: absolute;\n      top: 7px;\n      left: 12px; }\n  doc-guideline .doc-guideline-guideline {\n    font-size: 16px; }\n\ndoc-guideline:not([motif]) .doc-guideline-motif, doc-guideline[motif='success'] .doc-guideline-motif {\n  background-color: #cdf4d2;\n  color: #007A3B; }\n  doc-guideline:not([motif]) .doc-guideline-motif::after, doc-guideline[motif='success'] .doc-guideline-motif::after {\n    background-image: url(\"data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDA3QTNCIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+DQogICAgPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0yIDE1bC01LTUgMS40MS0xLjQxTDEwIDE0LjE3bDcuNTktNy41OUwxOSA4bC05IDl6Ii8+DQo8L3N2Zz4=\"); }\n\ndoc-guideline[motif='warning'] .doc-guideline-motif {\n  background-color: #fceeba;\n  color: #ad5700; }\n  doc-guideline[motif='warning'] .doc-guideline-motif::after {\n    background-image: url(\"data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjQjI1QjAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xIDIxaDIyTDEyIDIgMSAyMXptMTItM2gtMnYtMmgydjJ6bTAtNGgtMnYtNGgydjR6Ii8+Cjwvc3ZnPg==\"); }\n\ndoc-guideline[motif='error'] .doc-guideline-motif {\n  background-color: #ffdce2;\n  color: #cd0026; }\n  doc-guideline[motif='error'] .doc-guideline-motif::after {\n    background-image: url(\"data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRTQwMDJCIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+DQogICAgPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTEgMTVoLTJ2LTJoMnYyem0wLTRoLTJWN2gydjZ6Ii8+DQo8L3N2Zz4=\"); }\n"

/***/ }),
/* 13 */
/***/ (function(module, exports) {

const tag = 'mdn-doc-link';
const baseUrl = 'https://developer.mozilla.org/en-US/docs/Web/';
const template = `<a target="_blank"><slot></slot></a>`;

customElements.define(tag, class _ extends EDSElement {
  static get observedAttributes() {
    return ['url'];
  }

  init() {
    this.initShadowDOM(tag, template);
    this._anchor = this.shadowRoot.querySelector('a');
  }

  get url() {
    return this._anchor.href;
  }

  set url(value) {
    this._anchor.href = `${baseUrl}${value}`;
  }
});


/***/ }),
/* 14 */
/***/ (function(module, exports) {

const tag = 'on-first-visible';
const template = `
<api-method name='onFirstVisible'>
  Corrects rendering artifacts that result when this element is initially rendered in a hidden element.

  <doc-note motif='warning'>
    <b>NOTE:</b> In modern browsers you won't need to call this method. Any browser that supports <a href='https://caniuse.com/#feat=intersectionobserver'>IntersectionObserver</a> will call this method automatically when the element first becomes visible. However, if you need to support older browsers you'll need to call this method manually or polyfill <code>IntersectionObserver</code>.
  </doc-note>
</api-method>`;
const css = '';

customElements.define(tag, class _ extends EDSElement {
  init() {
    this.initShadowDOM(tag, template, css);
  }
});


/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\ncode {\n  font-family: Consolas, Monaco, \"Andale Mono\", \"Ubuntu Mono\", monospace;\n  color: #cd0026;\n  background-color: #f6f6f6; }\n\ndoc-code .code-live {\n  display: block;\n  width: 100%;\n  float: none;\n  background-color: white;\n  padding: 1.5em;\n  border: 1px solid #e6e6e6;\n  border-bottom: none;\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n  margin-top: 1em; }\n\ndoc-code .code-highlight {\n  border: 1px solid #e6e6e6; }\n\ndoc-code .code-live + .code-highlight {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  margin: 0; }\n\ndoc-code .code-highlight {\n  border-radius: 2px;\n  margin: 1em 0;\n  background: #f5f5f5;\n  position: relative;\n  padding: 1em;\n  overflow: auto; }\n  doc-code .code-highlight code, doc-code .code-highlight kbd, doc-code .code-highlight pre, doc-code .code-highlight samp {\n    font-family: Consolas, Monaco, \"Andale Mono\", \"Ubuntu Mono\", monospace;\n    text-shadow: 0 1px white; }\n  doc-code .code-highlight pre {\n    margin: 0;\n    padding: 0; }\n    doc-code .code-highlight pre:after {\n      content: attr(data-language);\n      position: absolute;\n      top: 5px;\n      right: 7px;\n      font-size: 0.8em;\n      font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n      color: #aaa; }\n  doc-code .code-highlight code {\n    font-size: 100%; }\n"

/***/ })
/******/ ]);