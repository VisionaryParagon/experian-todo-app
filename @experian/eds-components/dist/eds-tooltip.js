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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eds_core_uniqueId__ = __webpack_require__(2);


const tag = 'eds-tooltip';
const html = `<div class='eds-tooltip-wrapper'>
                <div class='eds-tooltip-content api-tooltip'>
                  <div class='eds-tooltip-arrow' x-arrow></div>
                  <slot></slot>
                </div>
              </div>`;
const css = __webpack_require__(3);

Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["b" /* setEDSValue */])('tooltips.defaults.delay', 0);
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["b" /* setEDSValue */])('tooltips.defaults.position', 'top');
Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["b" /* setEDSValue */])('tooltips.manager', {
  onmouseover: e => {
    let target = e.target;
    let startTime, endTime, ms;
    if (window.EDS.tooltips.debug) {
      startTime = window.performance.now();
      console.log(' ');
      console.log('[DEBUG: eds-tooltip] checking target for matches:');
      console.log(target);
      console.log(`[DEBUG: eds-tooltip] tooltip array size: ${Object.keys(window.EDS.tooltips.tracking).length}`);
    }
    let tracking = window.EDS.tooltips.tracking;
    Object.keys(tracking).forEach(tooltip => {
      tracking[tooltip].processTarget(target);
    });
    if (window.EDS.tooltips.debug) {
      endTime = window.performance.now();
      ms = endTime - startTime;
      console.log(`[DEBUG: eds-tooltip] execution cost: ${ms}ms`);
      console.log(' ');
    }
  }
});

class EDSTooltipElement extends EDSElement {
  static get observedAttributes() {
    return EDSTooltipElement.normalizeObservedAttributes([
      { targetclass: 'targetClass' }, 'position', 'delay'
    ]);
  }

  get defaults() {
    return {
      delay: window.EDS.tooltips.defaults.delay,
      position: window.EDS.tooltips.defaults.position
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(['position', 'delay']);

    this._onMouseenter = this._onMouseenter.bind(this);
    this._onMouseleave = this._onMouseleave.bind(this);

    this._refs = {
      content: this.$('.eds-tooltip-content'),
      wrapper: this.$('.eds-tooltip-wrapper')
    };

    this.setAttribute('aria-role', 'tooltip');

    this._id = Object(__WEBPACK_IMPORTED_MODULE_1__eds_core_uniqueId__["a" /* uniqueId */])();
  }

  connectedCallback() {
    // Reset external tracking - in some cases element remains in memory when disconnected
    // reconnecting will not follow the same execution path as initialization
    this.targetClass = this.targetClass;
    this.targetElements = this.targetElements;

    this._listenForTriggers();
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._stopListeningForTriggers();
    super.disconnectedCallback();
  }

  _listenForTriggers() {
    // Setup mouse events on the tooltip itself
    this.addEventListener('mouseenter', e => {
      if (this === e.target || this.contains(e.target)) {
        if (this._waiting) clearTimeout(this._waiting);
      }
    });

    this.addEventListener('mouseleave', e => {
      this.hide();
    });
  }

  _stopListeningForTriggers() {
    // Clear target listeners
    this.targetElements.forEach(target => {
      target.removeEventListener('mouseenter', this._onMouseenter);
      target.removeEventListener('mouseleave', this._onMouseleave);
    });

    // Stop tracking
    Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["a" /* deleteEDSValue */])(`tooltips.tracking.${this._id}`);

    // Clear global listener if no other tooltips
    if (!Object.keys(window.EDS.tooltips.tracking).length) {
      document.removeEventListener('mouseover', window.EDS.tooltips.manager.onmouseover);
      Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["b" /* setEDSValue */])('tooltips.manager.listening', false);
    }
  }

  set targetClass(value) {
    this.setAttribute('targetclass', value);
    Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["b" /* setEDSValue */])(`tooltips.tracking.${this._id}`, this);

    // Track globally when targetClass is provided
    if (!window.EDS.tooltips.manager.listening) {
      document.addEventListener('mouseover', window.EDS.tooltips.manager.onmouseover);
      Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_set_eds_value__["b" /* setEDSValue */])('tooltips.manager.listening', true);
    }
  }

  get targetClass() {
    return this.getAttribute('targetclass');
  }

  set targetElements(value) {
    if (!Array.isArray(value)) throw Error('targetElements must be an array');
    this._targetElements = value;

    // Bind directly to target elements
    value.forEach(target => {
      target.addEventListener('mouseenter', this._onMouseenter);
      target.addEventListener('mouseleave', this._onMouseleave);
    });
  }

  get targetElements() {
    return this._targetElements ? this._targetElements : [];
  }

  _onMouseenter(e) {
    this.show(e.target);
  }

  _onMouseleave(e) {
    this.hide();
  }

  processTarget(target) {
    if (this === target || this.contains(target)) {
      if (this._waiting) clearTimeout(this._waiting);
    } else if (target.closest && target.closest(`.${this.targetClass}`)) { // eslint-disable-line no-cond-assign
      target = target.closest(`.${this.targetClass}`);
      this.show(target);
    } else {
      this.hide();
    }
  }

  show(target) {
    if (this._showing) clearTimeout(this._showing);
    if (this.beforeShow && (this.beforeShow(target) === false)) return;
    if (this.delay && !this._refs.content.classList.contains('show')) {
      this._showing = setTimeout(() => {
        this._showImmediate(target);
      }, this.delay);
    } else {
      this._showImmediate(target);
    }
  }

  _showImmediate(target) {
    if (!target) return;
    this._clearTimers();
    if (this._popper) this._popper.destroy();
    this._refs.wrapper.classList.add('show');

    const options = {
      placement: this.position
    };

    this._popper = new Popper(target, this._refs.wrapper, options); // eslint-disable-line no-new
    this._refs.content.classList.add('show');
    this._currentTarget = target;
    this.dispatchEvent(new CustomEvent('show', { detail: target }));
  }

  _clearTimers() {
    if (this._showing) clearTimeout(this._showing);
    if (this._waiting) clearTimeout(this._waiting);
    if (this._hiding) clearTimeout(this._hiding);
  }

  hide() {
    this._clearTimers();
    if (!this._popper) return;
    // First timer allows enough time to move mouse cursor into the tooltip
    this._waiting = setTimeout(() => {
      // Second timer kills the actual tooltip
      this._hiding = setTimeout(() => {
        this._refs.wrapper.classList.remove('show');
        this._popper.destroy();
        this.dispatchEvent(new CustomEvent('hide', { detail: this._currentTarget }));
      }, 100);
      this._refs.content.classList.remove('show');
    }, 75);
  }
}

customElements.define(tag, EDSTooltipElement);
window.EDSTooltipElement = EDSTooltipElement;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setEDSValue;
/* harmony export (immutable) */ __webpack_exports__["a"] = deleteEDSValue;
const getPathLeaf = function(path) {
  let obj = window.EDS;
  const parts = path.split('.');

  while (parts.length > 1) {
    const part = parts.shift();
    obj[part] = obj[part] || {};
    obj = obj[part];
  }

  return obj;
};

function setEDSValue(path, value) {
  const parts = path.split('.');
  const obj = getPathLeaf(path);

  obj[parts.pop()] = value;
}

function deleteEDSValue(path) {
  const parts = path.split('.');
  const obj = getPathLeaf(path.slice(0, -1));

  delete obj[parts.pop()];
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = uniqueId;
function uniqueId() {
  // Credit: https://gist.github.com/gordonbrander/2230317
  return '_' + Math.random().toString(36).substr(2, 9);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-tooltip .eds-tooltip-content {\n  transition: transform 250ms ease 0ms, opacity 85ms ease 15ms; }\n  eds-tooltip .eds-tooltip-content.show {\n    transition: transform 130ms ease 0ms, opacity 50ms ease 50ms; }\n\neds-tooltip .eds-tooltip-wrapper {\n  position: absolute;\n  display: none;\n  z-index: 1000; }\n  eds-tooltip .eds-tooltip-wrapper.show {\n    display: block; }\n  eds-tooltip .eds-tooltip-wrapper[x-placement^=\"top\"] {\n    margin-bottom: 16px; }\n    eds-tooltip .eds-tooltip-wrapper[x-placement^=\"top\"] [x-arrow] {\n      border-width: 8px 8px 0 8px;\n      border-left-color: transparent;\n      border-right-color: transparent;\n      border-bottom-color: transparent;\n      bottom: -8px;\n      left: calc(50% - 8px);\n      margin-top: 0;\n      margin-bottom: 0; }\n  eds-tooltip .eds-tooltip-wrapper[x-placement^=\"right\"] {\n    margin-left: 16px; }\n    eds-tooltip .eds-tooltip-wrapper[x-placement^=\"right\"] [x-arrow] {\n      border-width: 8px 8px 8px 0;\n      border-left-color: transparent;\n      border-top-color: transparent;\n      border-bottom-color: transparent;\n      left: -8px;\n      top: calc(50% - 8px);\n      margin-left: 0;\n      margin-right: 0; }\n  eds-tooltip .eds-tooltip-wrapper[x-placement^=\"bottom\"] {\n    margin-top: 16px; }\n    eds-tooltip .eds-tooltip-wrapper[x-placement^=\"bottom\"] [x-arrow] {\n      border-width: 0 8px 8px 8px;\n      border-left-color: transparent;\n      border-right-color: transparent;\n      border-top-color: transparent;\n      top: -8px;\n      left: calc(50% - 8px);\n      margin-top: 0;\n      margin-bottom: 0; }\n  eds-tooltip .eds-tooltip-wrapper[x-placement^=\"left\"] {\n    margin-right: 16px; }\n    eds-tooltip .eds-tooltip-wrapper[x-placement^=\"left\"] [x-arrow] {\n      border-width: 8px 0 8px 8px;\n      border-top-color: transparent;\n      border-right-color: transparent;\n      border-bottom-color: transparent;\n      right: -8px;\n      top: calc(50% - 8px);\n      margin-left: 0;\n      margin-right: 0; }\n\neds-tooltip .eds-tooltip-content {\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  padding: 10px 20px;\n  font-size: 14px;\n  color: #fff;\n  border-radius: 4px;\n  background-color: #333333;\n  box-sizing: border-box;\n  opacity: 0;\n  border: 1px solid #d8d8d8;\n  background-clip: border-box;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);\n  border: none;\n  transform: scale(0); }\n  eds-tooltip .eds-tooltip-content [x-arrow] {\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-color: #333333;\n    position: absolute;\n    margin: 8px; }\n  eds-tooltip .eds-tooltip-content.show {\n    transform: scale(1);\n    opacity: 1; }\n  eds-tooltip .eds-tooltip-content a, eds-tooltip .eds-tooltip-content a:hover {\n    color: #ffffff; }\n"

/***/ })
/******/ ]);