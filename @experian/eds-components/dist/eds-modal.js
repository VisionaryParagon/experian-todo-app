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

const tag = 'eds-modal';
const html = __webpack_require__(1);
const css = __webpack_require__(2);

class EDSModalElement extends EDSElement {
  static get observedAttributes() {
    return EDSModalElement.normalizeObservedAttributes(
      [{ 'arialabelclose': 'ariaLabelClose' }, 'closable']
    );
  }

  get defaults() {
    return {
      ariaLabelClose: 'close'
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);

    this._refs = {
      box: this.$('.eds-modal-box'),
      closeIcon: this.$('.eds-close-modal')
    };

    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');

    // ensure aria-label for close icon has a label
    this.ariaLabelClose = this.ariaLabelClose;
  }

  connectedCallback() {
    this.addEventListener('click', e => {
      if (e.composedPath()[0] === this && this.closable) this.hide();
    });
    this._refs.closeIcon.addEventListener('click', () => {
      if (this.closable) this.hide();
    });
    this._refs.closeIcon.addEventListener('keydown', e => {
      if (e.key === 'Enter' && this.closable) this.hide();
    });
    this._handleKeydown = this._handleKeydown.bind(this);

    super.connectedCallback();
  }

  disconnectedCallback() {
    document.body.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _handleKeydown(e) {
    if (e.key === 'Escape' && this.closable) this.hide();
  }

  get ariaLabelClose() {
    return this.getAttribute('arialabelclose') || this.defaults.ariaLabelClose;
  }

  set ariaLabelClose(value) {
    this.setAttribute('arialabelclose', value);
    this._refs.closeIcon.setAttribute('aria-label', value);
  }

  get closable() {
    const attribute = this._refs.box.getAttribute('closable');
    return (attribute !== false && attribute !== 'false');
  }

  set closable(value) {
    this._refs.box.setAttribute('closable', value);
  }

  show() {
    document.body.classList.add('no-scroll');
    this.classList.add('eds-modal-show');
    document.body.addEventListener('keydown', this._handleKeydown);

    // Allow enough time for all css transitions to complete
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('show'));
    }, 200);
  }

  hide() {
    document.body.classList.remove('no-scroll');
    this.classList.remove('eds-modal-show');
    document.body.removeEventListener('keydown', this._handleKeydown);

    // Allow enough time for all css transitions to complete
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('hide'));
    }, 200);
  }
}

customElements.define(tag, EDSModalElement);
window.EDSModalElement = EDSModalElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<div class=\"eds-modal-box api-modal\" closable=\"true\">\n  <button class=\"eds-close-modal\" tabindex=\"0\" type=\"button\" aria-label=\"\">&times;</button>\n  <section>\n    <slot></slot>\n  </section>\n</div>"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-modal {\n  transition: transform 0ms ease 200ms, opacity 150ms ease 50ms; }\n  eds-modal.eds-modal-show {\n    transition: transform 0ms ease 0ms, opacity 150ms ease 0ms; }\n    eds-modal.eds-modal-show .eds-modal-box {\n      transition: transform 100ms ease 0ms, opacity 75ms ease 25ms; }\n  eds-modal .eds-modal-box {\n    transition: transform 150ms ease 0ms, opacity 75ms ease 0ms; }\n\neds-modal {\n  position: fixed;\n  overflow: scroll;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  background: rgba(255, 255, 255, 0.8);\n  opacity: 0;\n  transform: scale(0); }\n  eds-modal.eds-modal-show {\n    opacity: 1;\n    transform: scale(1); }\n    eds-modal.eds-modal-show .eds-modal-box {\n      opacity: 1;\n      transform: scale(1) translate(-50%); }\n  eds-modal .eds-modal-box {\n    position: absolute;\n    display: block;\n    margin-left: 50%;\n    top: 10%;\n    min-width: 300px;\n    max-width: 80%;\n    background: white;\n    border-radius: 6px;\n    border: 1px solid #d8d8d8;\n    background-clip: border-box;\n    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    padding: 26px 30px;\n    opacity: 0;\n    transform: scale(0.75) translate(-60%); }\n    eds-modal .eds-modal-box .eds-close-modal {\n      display: none; }\n    eds-modal .eds-modal-box[closable=\"true\"] .eds-close-modal {\n      display: block;\n      position: absolute;\n      top: 15px;\n      right: 26px;\n      line-height: 16px;\n      font-size: 30px;\n      font-weight: 300;\n      color: #426da9;\n      cursor: pointer;\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      line-height: normal;\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      -webkit-appearance: none; }\n    eds-modal .eds-modal-box header {\n      font-size: 18px;\n      font-weight: bold;\n      padding: 0;\n      margin-bottom: 20px; }\n    eds-modal .eds-modal-box footer {\n      margin-top: 20px; }\n"

/***/ })
/******/ ]);