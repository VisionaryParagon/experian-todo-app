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

const tag = 'eds-tree-item';
const html = __webpack_require__(1);
const css = __webpack_require__(2);

const DEFAULT_INDENT = 20;

class EDSTreeItemElement extends EDSElement {
  static get observedAttributes() {
    return ['expanded', 'icon', 'iconLibrary', 'selected'];
  }

  // Custom override to prevent double execution of 'expanded' setter
  // (maybe can be adopted into eds-core, but requires conforming flag to bools systematically)
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'expanded') {
      if (Boolean(this.flagAttributeIsTruthy(newValue)) == Boolean(this.expanded)) return;
    }
    oldValue !== newValue && (this[name] = newValue);
  }

  init() {
    this.initShadowDOM(tag, html, css);

    this._refs = {
      children: this.$('.eds-tree-item-children'),
      main: this.$('.eds-tree-item-main'),
      toggle: this.$('.eds-tree-item-toggle'),
      icon: this.$('eds-icon')
    };

    this._expanded = false;
    this._hasChildren = false;
    this._edsParentItems = this._edsParentItems || [];

    this._refs.main.addEventListener('click', this._handleItemClick.bind(this));
    this._refs.toggle.addEventListener('click', this._handleToggleClick.bind(this));
    this.addEventListener('_internalitemclick', this._handleInternalItemClick.bind(this));
  }

  connectedCallback() {
    this._renderIndent();
    this._handleSlottedChildren();

    // JS was ultimately required to get smooth animations
    // (setting heights explicitly made a huge difference)
    this.querySelectorAll('eds-tree-item').forEach(menu => {
      menu.addEventListener('heightchange', this._handleHeightChange.bind(this));
    });

    super.connectedCallback();
  }

  _autoExpand() {
    if (!this.selected) return;
    this._edsParentItems.forEach(el => el.expanded = true);
  }

  _handleItemClick(e) {
    if (e.target === this._refs.main) {
      const event = new CustomEvent('_internalitemclick', { detail: this, bubbles: true, cancelable: true });
      this.dispatchEvent(event);
    }
  }

  _handleInternalItemClick(e) {
    // Only fire public events from the root node - simplifies things for listeners
    if (!this.isChildItem) {
      e.stopPropagation();
      const event = new CustomEvent('itemclick', { detail: e.detail, bubbles: true, cancelable: true });
      this.dispatchEvent(event);
    }
  }

  _handleToggleClick(e) {
    if (e.target === this._refs.toggle) {
      if (this._hasChildren) this.expanded = !this.expanded;
    }
  }

  _handleHeightChange(e) {
    if (e.detail !== 0) {
      const height = +this._refs.children.style.height.replace('px', '') || this._refs.children.scrollHeight;
      this._refs.children.style['height'] = `${+height + e.detail}px`;
    }
  }

  _handleSlottedChildren() {
    const slot = this.$('slot').assignedNodes();
    if (slot.length && slot[0].nodeType === Node.TEXT_NODE) {
      this.setAttribute('data-content', slot[0].nodeValue);
    }

    const slotted = this.$('slot[name="children"]').assignedNodes();
    if (slotted.length) {
      this._hasChildren = true;
      this._refs.toggle.classList.add('show');
      this.classList.add('has-children');
      const children = slotted[0].children;

      children.forEach(node => {
        if (node.tagName == 'EDS-TREE-ITEM') {
          node.isChildItem = true;
          node._edsParentItems = this._edsParentItems.concat([this]);
          node.indent = this.indent + DEFAULT_INDENT;
        }
      });
    }
  }

  get icon() {
    return this._refs.icon.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
    this._refs.icon.setAttribute('icon', value);
  }

  get iconLibrary() {
    return this._refs.icon.getAttribute('library');
  }

  set iconLibrary(value) {
    this.setAttribute('iconLibrary', value);
    this._refs.icon.setAttribute('library', value);
  }

  _renderIndent() {
    this.indent = this.indent || DEFAULT_INDENT;
    this._refs.main.style['padding-left'] = `${this.indent}px`;
  }

  get hasChildren() {
    return this._hasChildren;
  }

  get expanded() {
    return this._expanded;
  }

  set expanded(value) {
    // Required to support inital renders
    // css styling hasn't been applied yet (unfortunately) when initializing with expanded
    setTimeout(() => {
      const delta = +this._refs.children.style.height.replace('px', '') || this._refs.children.scrollHeight;
      const val = this.flagAttributeIsTruthy(value);
      this._expanded = val;
      this.dispatchEvent(new CustomEvent('heightchange', { detail: val ? +delta : -delta }));
      this._refs.children.style['height'] = val ? `${delta}px` : 0;
      this.setOrRemoveFlagAttribute('expanded', val);
    });
  }

  get selected() {
    return this.hasAttribute('selected');
  }

  set selected(value) {
    this.setOrRemoveFlagAttribute('selected', value);
    this._autoExpand();
  }
}

customElements.define(tag, EDSTreeItemElement);
window.EDSTreeItemElement = EDSTreeItemElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<div class='eds-tree-item-main'>\n  <span class='eds-tree-item-toggle'></span><eds-icon></eds-icon><slot></slot>\n</div>\n<div class='eds-tree-item-children'>\n  <slot name='children'></slot>\n</div>"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-tree-item.has-children > .eds-tree-item-children {\n  transition: transform 150ms ease 0ms, height 150ms ease 0ms, opacity 130ms ease 0ms;\n  transform-origin: 0 0; }\n\neds-tree-item.has-children[expanded] > .eds-tree-item-children {\n  transition: transform 150ms ease 0ms, height 150ms ease 0ms, opacity 130ms ease 0ms;\n  transform-origin: 0 0; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n[background='gray'] eds-tree-item {\n  background-color: #f6f6f6; }\n  [background='gray'] eds-tree-item[selected] > .eds-tree-item-main {\n    background-color: #ffffff; }\n    [background='gray'] eds-tree-item[selected] > .eds-tree-item-main::before {\n      border-color: #ffffff; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n.eds-item-compact eds-tree-item > .eds-tree-item-main {\n  padding: 0.40em 0; }\n\neds-tree-item {\n  display: block;\n  position: relative;\n  background-color: #ffffff;\n  font-weight: 400;\n  color: #426da9;\n  cursor: pointer; }\n  eds-tree-item .eds-tree-item-main {\n    padding: 0.6em 0;\n    z-index: 90;\n    position: relative; }\n    eds-tree-item .eds-tree-item-main .eds-tree-item-toggle {\n      display: none; }\n      eds-tree-item .eds-tree-item-main .eds-tree-item-toggle.show {\n        display: inline-block;\n        margin-right: 4px;\n        width: 16px;\n        height: 16px;\n        background-repeat: no-repeat;\n        background-size: contain;\n        transform: translateY(3px); }\n  eds-tree-item.has-children {\n    font-weight: 500;\n    color: #426da9; }\n    eds-tree-item.has-children .eds-tree-item-toggle {\n      background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDkuMyAoNTExNjcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5leHBhbmQxNjwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iZXhwYW5kMTYiIHN0cm9rZT0iIzQyNkRBOSI+DQogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLUNvcHkiIHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHJ4PSIzIj48L3JlY3Q+DQogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTItQ29weS0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgOC4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtOC4wMDAwMDAsIC04LjAwMDAwMCkgIiB4PSI3LjUiIHk9IjQuNSIgd2lkdGg9IjEiIGhlaWdodD0iNyIgcng9IjAuNSI+PC9yZWN0Pg0KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yLUNvcHktMyIgeD0iNy41IiB5PSI0LjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjciIHJ4PSIwLjUiPjwvcmVjdD4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg==\"); }\n    eds-tree-item.has-children[expanded] > .eds-tree-item-main > .eds-tree-item-toggle {\n      background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDkuMyAoNTExNjcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5jb2xsYXBzZTE2PC90aXRsZT4NCiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIGlkPSJjb2xsYXBzZTE2IiBzdHJva2U9IiM0MjZEQTkiPg0KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgcng9IjMiPjwvcmVjdD4NCiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgOC4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtOC4wMDAwMDAsIC04LjAwMDAwMCkgIiB4PSI3LjUiIHk9IjQuNSIgd2lkdGg9IjEiIGhlaWdodD0iNyIgcng9IjAuNSI+PC9yZWN0Pg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+\"); }\n    eds-tree-item.has-children[expanded] > .eds-tree-item-children {\n      opacity: 1;\n      transform: scaleY(1); }\n    eds-tree-item.has-children > .eds-tree-item-children {\n      opacity: 0;\n      transform: scaleY(0);\n      overflow: hidden;\n      height: 0; }\n    eds-tree-item.has-children eds-icon {\n      display: none;\n      margin-left: 10px; }\n  eds-tree-item:hover {\n    color: #163c6f; }\n  eds-tree-item:first-child {\n    margin-top: 4px; }\n  eds-tree-item:last-child {\n    margin-bottom: 4px; }\n  eds-tree-item[selected] {\n    color: #333333; }\n    eds-tree-item[selected] > .eds-tree-item-main {\n      background-color: #f6f6f6; }\n      eds-tree-item[selected] > .eds-tree-item-main::after {\n        content: '';\n        display: block;\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        width: 4px;\n        background-color: #e63888;\n        z-index: 120;\n        pointer-events: none; }\n  eds-tree-item eds-icon {\n    display: none;\n    margin-right: 10px; }\n  eds-tree-item[icon] eds-icon {\n    display: inline-block; }\n"

/***/ })
/******/ ]);