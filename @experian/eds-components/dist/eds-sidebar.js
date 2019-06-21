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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_sidebar_group__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_sidebar_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__eds_sidebar_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eds_sidebar__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eds_sidebar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__eds_sidebar__);
// eds-sidebar-group (must come first)




/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const tag = 'eds-sidebar-group';
const html = __webpack_require__(2);
const css = __webpack_require__(3);
const COLLAPSED_HEIGHT = '42px';
const ANIMATION_MS = 200;

class EDSSidebarGroupElement extends EDSElement {
  static get observedAttributes() {
    return ['collapsed', 'icon', 'iconLibrary'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = { icon: this.$('eds-icon') };
  }

  get icon() {
    return this._refs.icon.getAttribute('icon');
  }

  set icon(val) {
    this._refs.icon.setAttribute('icon', val);
  }

  get iconLibrary() {
    return this._refs.icon.getAttribute('library');
  }

  set iconLibrary(value) {
    this.setAttribute('iconLibrary', value);
    this._refs.icon.setAttribute('library', value);
  }

  setHeightSnapshot() {
    const height = `${this.offsetHeight}px`;
    this._heightSnapshot = height;
    this.style.height = height;
  }

  get collapsed() {
    return this.hasAttribute('collapsed');
  }

  set collapsed(value) {
    this.setOrRemoveFlagAttribute('collapsed', value);

    if (this.flagAttributeIsTruthy(value)) {
      // Required for animations to take correctly
      setTimeout(() => this.style.height = COLLAPSED_HEIGHT); // eslint-disable-line no-return-assign
    } else {
      this.style.height = this._heightSnapshot || this.style.height;
      setTimeout(() => {
        this.style.height = '';
        this._heightSnapshot = null;
      }, ANIMATION_MS);
    }
  }
};

customElements.define(tag, EDSSidebarGroupElement);
window.EDSSidebarGroupElement = EDSSidebarGroupElement;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<div class=\"eds-sidebar-group-content api-sidebar-group\"><slot></slot></div><eds-icon></eds-icon>"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-sidebar-group {\n  transition: height 200ms ease 0ms; }\n  eds-sidebar-group > eds-icon {\n    transition: transform 200ms ease 0ms, opacity 200ms ease 0ms; }\n  eds-sidebar-group .eds-sidebar-group-content {\n    transform-origin: 0 0;\n    transition: transform 200ms ease 0ms, opacity 200ms ease 0ms; }\n  eds-sidebar-group[collapsed] {\n    transition: height 200ms ease 0ms; }\n    eds-sidebar-group[collapsed] > eds-icon {\n      transition: transform 200ms ease 0ms, opacity 200ms ease 0ms; }\n    eds-sidebar-group[collapsed] .eds-sidebar-group-content {\n      transform-origin: 0 0;\n      transition: transform 200ms ease 0ms, opacity 200ms ease 0ms; }\n\neds-sidebar-group {\n  display: block;\n  position: relative; }\n  eds-sidebar-group > eds-icon {\n    position: absolute;\n    top: 20px;\n    left: 20px;\n    color: #426da9;\n    opacity: 0;\n    transform: scale(0); }\n  eds-sidebar-group .eds-sidebar-group-content {\n    opacity: 1;\n    transform: scaleY(1); }\n  eds-sidebar-group[collapsed] {\n    cursor: pointer; }\n    eds-sidebar-group[collapsed] > eds-icon {\n      opacity: 1;\n      transform: scale(1); }\n      eds-sidebar-group[collapsed] > eds-icon:hover {\n        color: #163c6f; }\n    eds-sidebar-group[collapsed] .eds-sidebar-group-content {\n      opacity: 0;\n      transform: scaleY(0); }\n"

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const tag = 'eds-sidebar';
const html = __webpack_require__(5);
const css = __webpack_require__(6);
const ANIMATION_MS = 250;

class EDSSidebarElement extends EDSElement {
  static get observedAttributes() {
    return ['background', 'collapsable', 'collapsed', 'compact', 'selectedItem'];
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineFlagProperties(['collapsable']);

    this._refs = {
      content: this.$('.eds-sidebar-content'),
      toggle: this.$('.eds-sidebar-toggle')
    };

    this._handleToggleClick = this._handleToggleClick.bind(this);
    this._handleToggleKeydown = this._handleToggleKeydown.bind(this);
    this._handleItemClick = this._handleItemClick.bind(this);
  }

  connectedCallback() {
    this._setupEvents();
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._teardownEvents();
    super.disconnectedCallback();
  }

  _setupEvents() {
    this._refs.toggle.addEventListener('click', this._handleToggleClick);
    this._refs.toggle.addEventListener('keydown', this._handleToggleKeydown);
    this.addEventListener('itemclick', this._handleItemClick);
    this.addEventListener('click', this._handleClick);
  }

  _handleToggleClick(e) {
    e.stopPropagation();
    this.collapsed = !this.collapsed;
  }

  _handleToggleKeydown(e) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        e.stopPropagation();
        this.collapsed = !this.collapsed;
        break;
    }
  }

  _handleClick({ target: node }) {
    if (node.tagName === 'EDS-SIDEBAR-GROUP') this.collapsed = false;
    else if (node.tagName === 'EDS-MENU-ITEM' && node.slottedChildren.length && this.collapsed) this.collapsed = false;
  }

  _handleItemClick({ detail: node }) {
    switch (node.tagName) {
      case 'EDS-MENU-ITEM':
        if (!node.slottedChildren.length) this.selectItem(node);
        break;
      case 'EDS-TREE-ITEM':
        this.selectItem(node);
        if (node.hasChildren && this.collapsed) this.collapsed = false;
        break;
    }
  }

  _teardownEvents() {
    this._refs.toggle.removeEventListener('click', this._handleToggleClick);
    this._refs.toggle.removeEventListener('keydown', this._handleToggleKeydown);
    this.removeEventListener('itemclick', this._handleItemClick);
    this.removeEventListener('click', this._handleClick);
  }

  onFirstVisible() {
    // Explicit width is required for animation, if not set we derive it automatically
    if (!this.style.width || this.style.width === 'auto') {
      this.style.width = window.getComputedStyle(this).getPropertyValue('width');
    }
    this.visibleOnce = true; // always set true in this method
  }

  get collapsed() {
    return this._collapsed || false;
  }

  set collapsed(value) {
    // Close all top level tree menus & sidebar groups
    Array.from(this.children).forEach(child => {
      const collapsed = this.flagAttributeIsTruthy(value);
      switch (child.tagName) {
        case 'EDS-SIDEBAR-GROUP':
          if (collapsed) {
            child.setHeightSnapshot();
            child.collapsed = true;
          } else {
            child.collapsed = false;
          }
          break;
        case 'EDS-MENU-ITEM':
        case 'EDS-TREE-ITEM':
          if (collapsed) child.expanded = false;
          break;
      }
    });

    if (this.collapsed !== this.flagAttributeIsTruthy(value)) {
      this.dispatchEvent(new CustomEvent('collapsed', { detail: value }));
    }
    this._collapsed = this.flagAttributeIsTruthy(value);
    this.setOrRemoveFlagAttribute('collapsed', value);

    // Results in unavoidable, but minor, animation jank
    if (!value && this._resetWidthOnNextExpand) setTimeout(() => this.resetWidth(), ANIMATION_MS);
  }

  get compact() {
    return this.hasAttribute('compact');
  }

  set compact(value) {
    this.setOrRemoveFlagAttribute('compact', value);
    if (this.hasAttribute('compact')) this.classList.add('eds-item-compact');
    else this.classList.remove('eds-item-compact');
  }

  _deselectItems() {
    Array.from(this.querySelectorAll('[selected]')).forEach(el => {
      el.selected = false;
    });
  }

  selectItem(el) {
    this._deselectItems();
    el.selected = true;
  }

  get selectedItem() {
    return this.querySelector('[selected]');
  }

  set selectedItem(el) {
    this._deselectItems();
    if (typeof el === 'string') el = this.querySelector(`[data-content=${el}]`);
    el.selected = true;
  }

  // Convenience method for cases where you need to re-detect the width
  // (for example, after localizing content)
  resetWidth() {
    if (this.collapsable && this.collapsed) {
      this._resetWidthOnNextExpand = true;
    } else {
      this._resetWidthOnNextExpand = false;
      this.style.width = 'auto';
      setTimeout(() => this.style.width = window.getComputedStyle(this).getPropertyValue('width'));
    }
  }
};

customElements.define(tag, EDSSidebarElement);
window.EDSSidebarElement = EDSSidebarElement;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"eds-sidebar-content api-sidebar\"><slot></slot></div>\n<div class='eds-sidebar-toggle' tabindex='0'>\n  <div class='eds-sidebar-toggle-arrow'></div>\n</div>"

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-sidebar {\n  transition: width 200ms ease 0ms, flex-grow 200ms ease 0ms, flex-shrink 200ms ease 0ms, flex-basis 200ms ease 0ms; }\n  eds-sidebar .eds-sidebar-content {\n    transition: width 0ms ease 200ms; }\n    eds-sidebar .eds-sidebar-content h3, eds-sidebar .eds-sidebar-content h4, eds-sidebar .eds-sidebar-content h5 {\n      transition: opacity 200ms ease 0ms, font-size 200ms ease 0ms, margin 200ms ease 0ms; }\n    eds-sidebar .eds-sidebar-content eds-icon {\n      transition: margin 200ms ease 0ms, transform 200ms ease 0ms; }\n  eds-sidebar .eds-sidebar-toggle-arrow {\n    transition: transform 200ms ease 0ms; }\n  eds-sidebar[collapsed] {\n    transition: width 200ms ease 0ms, flex-grow 200ms ease 0ms, flex-shrink 200ms ease 0ms, flex-basis 200ms ease 0ms; }\n    eds-sidebar[collapsed] .eds-sidebar-content {\n      transition: width 0ms ease 0ms; }\n      eds-sidebar[collapsed] .eds-sidebar-content h3, eds-sidebar[collapsed] .eds-sidebar-content h4, eds-sidebar[collapsed] .eds-sidebar-content h5 {\n        transition: opacity 200ms ease 0ms, font-size 200ms ease 0ms, margin 200ms ease 0ms; }\n      eds-sidebar[collapsed] .eds-sidebar-content eds-icon {\n        transition: margin 200ms ease 0ms, transform 200ms ease 0ms; }\n    eds-sidebar[collapsed] .eds-sidebar-toggle-arrow {\n      transition: transform 200ms ease 0ms; }\n\neds-sidebar {\n  display: block;\n  position: relative;\n  border: 1px solid #d8d8d8;\n  padding-bottom: 0;\n  min-width: 58px;\n  overflow: hidden;\n  background-color: #ffffff; }\n  eds-sidebar[background='gray'] {\n    background-color: #f6f6f6; }\n  eds-sidebar .eds-sidebar-content {\n    width: 100%;\n    height: 100%;\n    overflow: auto; }\n    eds-sidebar .eds-sidebar-content h3, eds-sidebar .eds-sidebar-content h4, eds-sidebar .eds-sidebar-content h5 {\n      opacity: 1;\n      padding: 0 20px;\n      margin-bottom: 8px; }\n  eds-sidebar[collapsed] {\n    width: 58px !important;\n    flex-grow: 0.001 !important;\n    flex-shrink: 0.001 !important;\n    flex-basis: 58px !important; }\n    eds-sidebar[collapsed] .eds-sidebar-content {\n      width: 600px; }\n      eds-sidebar[collapsed] .eds-sidebar-content h3, eds-sidebar[collapsed] .eds-sidebar-content h4, eds-sidebar[collapsed] .eds-sidebar-content h5 {\n        opacity: 0;\n        font-size: 0;\n        margin: 0;\n        line-height: 0; }\n      eds-sidebar[collapsed] .eds-sidebar-content eds-icon {\n        margin-right: 60px;\n        transform: scale(1.14); }\n    eds-sidebar[collapsed] .eds-sidebar-toggle-arrow {\n      transform: rotate(180deg);\n      right: 14px !important; }\n  eds-sidebar .eds-sidebar-toggle {\n    display: none; }\n  eds-sidebar[collapsable] {\n    padding-bottom: 33px; }\n    eds-sidebar[collapsable] .eds-sidebar-toggle {\n      display: block;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 32px;\n      background-color: #ffffff;\n      border-top: 1px solid #d8d8d8;\n      cursor: pointer;\n      outline: none; }\n      eds-sidebar[collapsable] .eds-sidebar-toggle::after {\n        content: '';\n        position: absolute;\n        top: 1px;\n        left: 1px;\n        right: 1px;\n        bottom: 1px;\n        border-radius: 4px;\n        border: 2px solid #426da9;\n        opacity: 0;\n        transition: opacity 0.15s ease; }\n      eds-sidebar[collapsable] .eds-sidebar-toggle.focus::after, eds-sidebar[collapsable] .eds-sidebar-toggle:focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease;\n        border-color: #426da9;\n        z-index: 900; }\n      eds-sidebar[collapsable] .eds-sidebar-toggle .eds-sidebar-toggle-arrow {\n        position: absolute;\n        right: 8px;\n        width: 30px;\n        height: 100%;\n        background-size: 15px;\n        background-repeat: no-repeat;\n        background-position: 6px 10px;\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjE1cHgiIGhlaWdodD0iMTBweCIgdmlld0JveD0iMCAwIDE1IDEwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDguMiAoNDczMjcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5Hcm91cDwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9Ikdyb3VwIiBmaWxsPSIjMUQ0RjkxIj4NCiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy4wMDAwMDAsIDUuMDAwMDAwKSByb3RhdGUoLTkwLjAwMDAwMCkgdHJhbnNsYXRlKC0zLjAwMDAwMCwgLTUuMDAwMDAwKSAiIHBvaW50cz0iMyAyIDggOCAtMiA4Ij48L3BvbHlnb24+DQogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiB4PSI0IiB5PSIzIiB3aWR0aD0iMTEiIGhlaWdodD0iNCIgcng9IjEiPjwvcmVjdD4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg==\"); }\n"

/***/ })
/******/ ]);