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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_icon_tab__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_icon_tab___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__eds_icon_tab__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eds_tab__ = __webpack_require__(2);



const tag = 'eds-tabs';
const html = '<ul class="tab-labels" role="tablist"></ul><slot></slot>';
const css = __webpack_require__(5);

class EDSTabsElement extends EDSElement {
  static get observedAttributes() {
    return EDSTabsElement.normalizeObservedAttributes([ { arialabelclose: 'ariaLabelClose' }, 'vertical' ]);
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(['ariaLabelClose']);
    this.defineFlagProperties(['vertical']);

    this._refs = {
      tabLabels: this.$('ul.tab-labels')
    };

    this._refs.tabLabels.addEventListener('click', this._handleTabClick.bind(this));
    this.addEventListener('eds-tab-select', e => {
      e.stopPropagation();
      this._showTab(e.detail);
    });
    this.addEventListener('eds-tab-label', e => {
      e.stopPropagation();
      this._updateTabLabel(e.detail);
    });

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
      this._handleSlottedChildren();
    });
  }

  connectedCallback() {
    this._showTab = this._showTab.bind(this);
    super.connectedCallback();
  }

  _handleTabClick(e) {
    const anchor = getAnchor(e.target);
    if (anchor) {
      e.preventDefault();
      const edsTab = this.querySelector(`[_id='${anchor.getAttribute('href').replace('#', '')}']`);
      if (edsTab) this._showTab(edsTab);
    }

    function getAnchor(el) {
      if (!el) return null;
      if (el.tagName === 'A') return el;
      return getAnchor(el.parentElement);
    }
  }

  _handleSlottedChildren() {
    this._refreshTabs();
    this._resolveSelection();
  }

  _uniqueId() {
    // Credit: https://gist.github.com/gordonbrander/2230317
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  _refreshTabs() {
    // Iterate over each eds-tab/eds-icon-tab element and insert the label into the UL that controls the tabs
    const labels = this._refs.tabLabels;
    while (labels.firstChild) labels.removeChild(labels.firstChild);

    this.tabs.forEach(edsTab => {
      const li = document.createElement('li');
      li.setAttribute('role', 'presentation');

      // Create the tab label anchor
      const a = document.createElement('a');
      if (edsTab.icon) {
        a.appendChild(edsTab.icon.cloneNode(true));
        li.classList.add('icon-tab');
      } else {
        a.innerHTML = edsTab.label;
      }
      li.appendChild(a);

      if (edsTab.closable) {
        const closeButton = document.createElement('button');
        closeButton.setAttribute('aria-label', this.ariaLabelClose || 'Close');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => this.removeChild(edsTab));
        li.appendChild(closeButton);
      }

      this._refs.tabLabels.appendChild(li);

      // Set the necessary attributes
      const id = edsTab._id || (edsTab._id = this._uniqueId());
      this._setTabLabelAttributes(a, id);
      this._setEdsTabAttributes(edsTab, id);
    });

    if (this.tabs.filter(({ icon }) => !!icon).length) {
      this._refs.tabLabels.classList.add('has-icon-tab');
    } else {
      this._refs.tabLabels.classList.remove('has-icon-tab');
    }
  }

  _setTabLabelAttributes(el, id) {
    el.setAttribute('_id', `tab-${id}`);
    el.setAttribute('aria-controls', `tab-panel-${id}`);
    el.setAttribute('href', `#tab-panel-${id}`);
    el.setAttribute('role', 'tab');
  }

  _setEdsTabAttributes(el, id) {
    el.setAttribute('_id', `tab-panel-${id}`);
    el.setAttribute('aria-labelledby', `tab-${id}`);

    // Move these to eds-tab?
    el.setAttribute('aria-hidden', !el.selected);
    el.setAttribute('role', 'tabpanel');
  }

  _resolveSelection() {
    // If no tab is selected, default to the first
    const selected = this.tabs.find(el => el.hasAttribute('selected')) || this.tabs.find(el => el.getAttribute('_id') === this._previousId);

    if (!selected && this.tabs.length) this.selectTab(0);
    else if (selected) this._showTab(selected);
  }

  _updateTabLabel(edsTab) {
    const id = edsTab.getAttribute('_id').replace('tab-panel-', '');
    const label = this._refs.tabLabels.querySelector(`a[_id='tab-${id}']`);
    if (edsTab.icon) {
      label.innerHTML = '';
      label.appendChild(edsTab.icon.cloneNode(true));
    } else {
      label.innerHTML = edsTab.label;
    }
  }

  _showTab(edsTab) {
    const previous = this.tabs.find(el => el.hasAttribute('selected'));

    // Deselect
    if (previous) {
      if (previous !== edsTab) previous.selected = false;
      const previousId = this._previousId = previous.getAttribute('_id');
      const previousLabel = this._refs.tabLabels.querySelector(`a[href='#${previousId}']`);
      previousLabel.parentElement.classList.remove('selected');
      previousLabel.setAttribute('aria-selected', false);
    }

    // Select
    const currentId = edsTab.getAttribute('_id');
    const label = this._refs.tabLabels.querySelector(`a[href='#${currentId}']`);
    label.parentElement.classList.add('selected');
    edsTab.selected = true;
    label.setAttribute('aria-selected', true);
  }

  get tabs() {
    return Array.from(this.children).filter(el => ['EDS-ICON-TAB', 'EDS-TAB'].indexOf(el.tagName) !== -1);
  }

  selectTab(index) {
    if (this.tabs[index]) this._showTab(this.tabs[index]);
  }
}

customElements.define(tag, EDSTabsElement);
window.EDSTabsElement = EDSTabsElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const tag = 'eds-icon-tab';
const html = '<div style="display:none"><slot name="icon"></slot></div><slot></slot>';

class EDSIconTabElement extends EDSElement {
  static get observedAttributes() {
    return ['selected'];
  }

  init() {
    this._unlisteners = [];
    this.defineFlagProperties(['closable']);
    this.initShadowDOM(tag, html, '');
  }

  connectedCallback() {
    super.connectedCallback();
    this.addListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }

  addListeners() {
    const slotchangeListener = () =>
      this.dispatchEvent(new CustomEvent('eds-tab-label', { detail: this, bubbles: true, cancelable: true }));
    this.addEventListener('slotchange', slotchangeListener);
    this._unlisteners.push(() => this.removeEventListener('slotchange', slotchangeListener));
  }

  removeListeners() {
    this._unlisteners.forEach(unlisten => unlisten());
    this._unlisteners = [];
  }

  get icon() {
    return this.shadowRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
  }

  set selected(value) {
    const val = this.flagAttributeIsTruthy(value);

    if (val === this.selected) return;

    if (val) {
      this.setAttribute('aria-hidden', false);
      this._selected = true;
      this.dispatchEvent(new CustomEvent('eds-tab-select', { detail: this, bubbles: true, cancelable: true }));
    } else {
      this.setAttribute('aria-hidden', true);
      this._selected = false;
    }

    this.setOrRemoveFlagAttribute('selected', val);
  }

  get selected() {
    return this._selected || false;
  }
};

customElements.define(tag, EDSIconTabElement);
window.EDSIconTabElement = EDSIconTabElement;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_deprecate__ = __webpack_require__(3);

const tag = 'eds-tab';
const html = '<slot></slot>';
const css = __webpack_require__(4);

class EDSTabElement extends EDSElement {
  static get observedAttributes() {
    return ['active', 'closable', 'selected', 'label'];
  }

  init() {
    this.defineFlagProperties(['closable']);
    this.initShadowDOM(tag, html, css);
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
    this.dispatchEvent(new CustomEvent('eds-tab-label', { detail: this, bubbles: true, cancelable: true }));
  }

  set active(value) {
    Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_deprecate__["a" /* deprecate */])('active', "use 'selected' instead");
    this.selected = value;
  }

  get active() {
    return this._selected;
  }

  set selected(value) {
    const val = this.flagAttributeIsTruthy(value);

    if (val === this.selected) return;

    if (val) {
      this.setAttribute('aria-hidden', false);
      this._selected = true;
      this.dispatchEvent(new CustomEvent('eds-tab-select', { detail: this, bubbles: true, cancelable: true }));
    } else {
      this.setAttribute('aria-hidden', true);
      this._selected = false;
    }

    this.setOrRemoveFlagAttribute('selected', val);
  }

  get selected() {
    return this._selected || false;
  }
};

customElements.define(tag, EDSTabElement);
window.EDSTabElement = EDSTabElement;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deprecate;
function deprecate(item, message) {
  let log = `${item} is deprecated`;
  if (message) log += `, ${message}`;
  if (console && console.warn) console.warn(log);
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n"

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-tabs {\n  display: block; }\n  eds-tabs .tab-labels {\n    display: flex;\n    flex-flow: row nowrap;\n    width: 100%;\n    overflow-x: auto;\n    overflow-y: hidden;\n    margin: 0;\n    padding: 0; }\n    eds-tabs .tab-labels:not(.has-icon-tab) {\n      border-bottom: 1px solid #cccccc; }\n    eds-tabs .tab-labels li {\n      height: 46px;\n      line-height: 46px;\n      margin: 0;\n      padding: 0;\n      display: flex;\n      flex-flow: row nowrap;\n      align-items: center;\n      text-align: center;\n      border-bottom: 4px solid transparent; }\n      eds-tabs .tab-labels li:hover {\n        border-color: #d8d8d8;\n        color: #163c6f; }\n      eds-tabs .tab-labels li.selected {\n        border-color: #e63888;\n        color: #333333; }\n      eds-tabs .tab-labels li a {\n        padding: 0 0 0 20px;\n        width: 100%;\n        height: 100%;\n        font-size: 14px;\n        font-weight: 500;\n        display: flex;\n        align-items: center;\n        color: #426da9;\n        text-decoration: none; }\n      eds-tabs .tab-labels li > *:last-child {\n        padding-right: 20px; }\n      eds-tabs .tab-labels li .close-button {\n        margin-left: 10px;\n        border: 0;\n        border-bottom: 2px solid transparent;\n        background: transparent;\n        color: #426da9;\n        font-size: 24px;\n        cursor: pointer; }\n        eds-tabs .tab-labels li .close-button:hover {\n          color: #163c6f; }\n    eds-tabs .tab-labels.has-icon-tab li {\n      height: 26px;\n      line-height: 26px;\n      border-color: transparent; }\n      eds-tabs .tab-labels.has-icon-tab li.selected a {\n        color: #e63888; }\n  eds-tabs eds-tab, eds-tabs eds-icon-tab {\n    display: none;\n    opacity: 0;\n    transition: opacity .15s linear; }\n    eds-tabs eds-tab[selected], eds-tabs eds-icon-tab[selected] {\n      display: block;\n      opacity: 1; }\n    eds-tabs eds-tab:after, eds-tabs eds-tab:before, eds-tabs eds-icon-tab:after, eds-tabs eds-icon-tab:before {\n      content: \" \";\n      display: table; }\n  @media only screen and (max-width: 480px) {\n    eds-tabs {\n      display: flex; }\n      eds-tabs .tab-labels {\n        width: auto;\n        height: fit-content;\n        flex-flow: column nowrap; }\n        eds-tabs .tab-labels:not(.has-icon-tab) {\n          border: 1px solid #d8d8d8;\n          border-top: none;\n          border-bottom: none; }\n        eds-tabs .tab-labels li {\n          height: 50px;\n          line-height: 50px;\n          text-align: left;\n          overflow: hidden;\n          border-top: 1px solid #d8d8d8;\n          border-left: 4px solid transparent;\n          border-bottom-width: 0; }\n          eds-tabs .tab-labels li:last-child {\n            border-bottom-width: 1px; }\n          eds-tabs .tab-labels li:hover {\n            border-left-color: #d8d8d8; }\n          eds-tabs .tab-labels li.selected {\n            border-left-color: #e63888; }\n        eds-tabs .tab-labels.has-icon-tab li {\n          height: 32px;\n          line-height: 32px;\n          border: 0; }\n          eds-tabs .tab-labels.has-icon-tab li.selected a {\n            color: #e63888; } }\n  eds-tabs[vertical] {\n    display: flex; }\n    eds-tabs[vertical] .tab-labels {\n      width: auto;\n      height: fit-content;\n      flex-flow: column nowrap; }\n      eds-tabs[vertical] .tab-labels:not(.has-icon-tab) {\n        border: 1px solid #d8d8d8;\n        border-top: none;\n        border-bottom: none; }\n      eds-tabs[vertical] .tab-labels li {\n        height: 50px;\n        line-height: 50px;\n        text-align: left;\n        overflow: hidden;\n        border-top: 1px solid #d8d8d8;\n        border-left: 4px solid transparent;\n        border-bottom-width: 0; }\n        eds-tabs[vertical] .tab-labels li:last-child {\n          border-bottom-width: 1px; }\n        eds-tabs[vertical] .tab-labels li:hover {\n          border-left-color: #d8d8d8; }\n        eds-tabs[vertical] .tab-labels li.selected {\n          border-left-color: #e63888; }\n      eds-tabs[vertical] .tab-labels.has-icon-tab li {\n        height: 32px;\n        line-height: 32px;\n        border: 0; }\n        eds-tabs[vertical] .tab-labels.has-icon-tab li.selected a {\n          color: #e63888; }\n"

/***/ })
/******/ ]);