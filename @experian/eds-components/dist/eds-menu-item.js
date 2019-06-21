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

const tag = 'eds-menu-item';
const html = __webpack_require__(1);
const css = __webpack_require__(2);

const DEFAULT_INDENT = 20;

class EDSMenuItemElement extends EDSElement {
  static get observedAttributes() {
    return ['expanded', 'href', 'icon', 'iconLibrary', 'selected', 'target'];
  }

  // Custom override to prevent double execution of 'expanded' setter
  // (maybe can be adopted into eds-core, but requires conforming flag to bools systematically)
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'expanded') {
      if (Boolean(this.flagAttributeIsTruthy(newValue)) === Boolean(this.expanded)) return;
    }
    oldValue !== newValue && (this[name] = newValue);
  }

  init() {
    this.initShadowDOM(tag, html, css);

    this._refs = {
      children: this.$('.eds-menu-item-children'),
      main: this.$('.eds-menu-item-main'),
      caret: this.$('.eds-menu-item-caret'),
      icon: this.$('eds-icon')
    };

    this._expanded = false;
    this._children = [];
    this._hasChildren = false;
    this._ancestors = this._ancestors || [];

    this.addEventListener('click', this._handleItemClick.bind(this));
    this.addEventListener('_internalitemclick', this._handleInternalItemClick.bind(this));
  }

  connectedCallback() {
    this._renderIndent();
    this._setAriaLevel();
    this._handleSlottedChildren();

    this.addEventListener('keydown', this._onKeydown.bind(this));

    // JS was ultimately required to get smooth animations
    // (setting heights explicitly made a huge difference)
    Array.from(this.querySelectorAll('eds-menu-item')).forEach(menu => {
      menu.addEventListener('heightchange', this._handleHeightChange.bind(this));
    });

    super.connectedCallback();
  }

  onFirstVisible() {
    // Ensure only visible items are keyboard navigable
    // NOTE: Unfortunately this method may fire if an ancestor is visible but
    // the decendant is not (ancestor not expanded) so we must check that condition here
    if (!this._isTopLevel()) {
      if (this._ancestors[this._ancestors.length - 1].expanded) {
        this._refs.main.setAttribute('tabindex', '0');
      }
    } else {
      this._refs.main.setAttribute('tabindex', '0');
    }

    // Only apply when expanding (ignore the default state)
    // Also only apply to top level item - ignore children - the purpose of this
    // method is to handle initial render states only
    if (this.expanded && this._isTopLevel()) this.refresh();
    this.visibleOnce = true; // always set true in this method
  }

  _isTopLevel() {
    return !this._ancestors.length;
  }

  // Public method always causes entire tree to refresh regardless of where
  // 'refresh' is called from (i.e. from a child)
  refresh() {
    const topAncestor = this._ancestors[0] || this;
    topAncestor._refresh();
  }

  // Forces a refresh, required in rare cases (children are expanded before parent is visible)
  _refresh() {
    const children = Array.from(this.slottedChildren);
    if (children.length && this.expanded) {
      this._expand();
      Array.from(children).forEach(el => el._refresh());
    }
  }

  _onKeydown(e) {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        this._navigateItem(e);
        break;
      case 'Enter':
        this._handleItemClick(e);
        break;
      case ' ':
        e.preventDefault();
        this._handleItemClick(e);
        break;
      default:
        // do nothing
    }
  }

  _navigateItem(e) {
    e.stopPropagation();

    if (e.key === 'ArrowDown') {
      // If children are present, navigate to the first child
      if (this.slottedChildren.length) {
        if (!this.expanded) this.expanded = true;
        this._children[0].focus();
      } else {
        // Otherwise, look for the next sibling
        const sibling = this.nextElementSibling;
        if (sibling && sibling.tagName === 'EDS-MENU-ITEM') sibling.focus();
      }
    } else if (e.key === 'ArrowUp') {
      // Move to previous sibling if available, otherwise to parent
      const sibling = this.previousElementSibling;
      if (sibling && sibling.tagName === 'EDS-MENU-ITEM') sibling.focus();
      else {
        const parent = this._ancestors[this._ancestors.length - 1];
        if (parent) parent.focus();
      }
    }
  }

  _autoExpand() {
    if (this._isTopLevel()) return;
    Array.from(this._ancestors).forEach(el => el.expanded = true);
  }

  _handleItemClick(e) {
    if (e.target === this) {
      const event = new CustomEvent('_internalitemclick', { detail: this, bubbles: true, cancelable: true });
      if (!this.slottedChildren.length) this.dispatchEvent(event);
      if (this.slottedChildren.length && !event.defaultPrevented) this.expanded = !this.expanded;
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

  _handleHeightChange(e) {
    const height = +this._refs.children.style.height.replace('px', '') || this._refs.children.scrollHeight;
    this._refs.children.style['height'] = `${+height + e.detail}px`;
  }

  _handleSlottedChildren() {
    const slot = this.$('slot').assignedNodes();
    if (slot.length && slot[0].nodeType === Node.TEXT_NODE) {
      this.setAttribute('data-content', slot[0].nodeValue);
    }

    const slotted = this.$('slot[name="children"]').assignedNodes();
    if (slotted.length) {
      this._hasChildren = true;
      this._refs.caret.classList.add('show');
      this.classList.add('has-children');
      this._children = slotted[0].children;
      this.setAttribute('aria-expanded', Boolean(this.expanded));
      this._removeInternalLinkAttributes();

      Array.from(this._children).forEach(node => {
        if (node.tagName === 'EDS-MENU-ITEM') {
          node.indent = this.indent + DEFAULT_INDENT;
          node._ancestors = this._ancestors.concat([this]);
        }
      });
    }
  }

  get href() {
    return this.getAttribute('href');
  }

  set href(value) {
    if (this.slottedChildren.length) this._removeInternalLinkAttributes();
    else this._refs.main.setAttribute('href', value);
    this.setAttribute('href', value);
  }

  get target() {
    return this.getAttribute('target');
  }

  set target(value) {
    if (this.slottedChildren.length) this._removeInternalLinkAttributes();
    else this._refs.main.setAttribute('target', value);
    this.setAttribute('target', value);
  }

  _removeInternalLinkAttributes() {
    this._refs.main.removeAttribute('href');
    this._refs.main.removeAttribute('target');
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

  _setAriaLevel() {
    this.setAttribute('aria-level', this.level.toString());
  }

  // Read-only property
  get slottedChildren() {
    return this._children;
  }

  get hasChildren() {
    if (console && console.warn) console.warn('hasChildren is deprecated, use slottedChildren.length instead');
    return this._hasChildren;
  }

  get expanded() {
    return this._expanded;
  }

  set expanded(value) {
    const val = this.flagAttributeIsTruthy(value);

    // Optimization
    if (this._expanded === val) return;
    this._expanded = val;

    if (val) this._expand();
    else this._collapse();

    this.setOrRemoveFlagAttribute('expanded', val);

    if (val) {
      this.setAttribute('aria-expanded', 'true');
      this._enableDescendantTabIndex();
      this._showDescendantItems();
    } else {
      this.setAttribute('aria-expanded', 'false');
      this._disableDescendantTabIndex();
      this._hideDescendantItems();
    }
  }

  _expand() {
    const delta = +this._refs.children.style.height.replace('px', '') || this._refs.children.scrollHeight;
    if (delta !== 0) {
      this.dispatchEvent(new CustomEvent('heightchange', { detail: +delta }));
      this._refs.children.style['height'] = `${delta}px`;
      this.dispatchEvent(new CustomEvent('toggle', { bubbles: true, cancelable: true }));
    }
  }

  _collapse() {
    const delta = +this._refs.children.style.height.replace('px', '') || this._refs.children.scrollHeight;
    if (delta !== 0) {
      this.dispatchEvent(new CustomEvent('heightchange', { detail: -delta }));
      this._refs.children.style['height'] = 0;
      this.dispatchEvent(new CustomEvent('toggle', { bubbles: true, cancelable: true }));
    }
  }

  // Take hidden decendants out of normal tabindex
  // Allows tab key to skip collapsed nested items
  _disableDescendantTabIndex() {
    Array.from(this._children).forEach(child => {
      child._refs.main.removeAttribute('tabindex');
      child._disableDescendantTabIndex();
    });
  }

  // Hide descendants from screen readers
  _hideDescendantItems() {
    Array.from(this._children).forEach(child => {
      child.setAttribute('aria-hidden', 'true');
    });
  }

  _enableDescendantTabIndex() {
    Array.from(this._children).forEach(child => {
      if (child._refs) child._refs.main.setAttribute('tabindex', '0');
      if (child.expanded) child._enableDescendantTabIndex();
    });
  }

  _showDescendantItems() {
    Array.from(this._children).forEach(child => {
      child.removeAttribute('aria-hidden');
    });
  }

  get selected() {
    return this.hasAttribute('selected');
  }

  set selected(value) {
    this.setOrRemoveFlagAttribute('selected', value);
    this._autoExpand();
  }

  // Read-only property
  get level() {
    if (this._isTopLevel()) return 1;
    return this._ancestors[this._ancestors.length - 1].level + 1;
  }

  focus() {
    this._autoExpand();
    this._refs.main.focus();
  }
}

customElements.define(tag, EDSMenuItemElement);
window.EDSMenuItemElement = EDSMenuItemElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<a class='eds-menu-item-main'>\n  <eds-icon></eds-icon><slot></slot><span class='eds-menu-item-caret'></span>\n</a>\n<div class='eds-menu-item-children'>\n  <slot name='children'></slot>\n</div>"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-menu-item.has-children > .eds-menu-item-children {\n  transition: transform 150ms ease 0ms, height 150ms ease 0ms, opacity 130ms ease 0ms;\n  transform-origin: 0 0; }\n\neds-menu-item.has-children[expanded] > .eds-menu-item-children {\n  transition: transform 150ms ease 0ms, height 150ms ease 0ms, opacity 130ms ease 0ms;\n  transform-origin: 0 0; }\n\neds-menu-item.has-children > .eds-menu-item-main > .eds-menu-item-caret {\n  transition: transform 150ms ease 0ms; }\n\neds-menu-item.has-children[expanded] > .eds-menu-item-main > .eds-menu-item-caret {\n  transition: transform 150ms ease 0ms; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n[background='gray'] eds-menu-item {\n  background-color: #f6f6f6; }\n  [background='gray'] eds-menu-item[selected] {\n    background-color: #ffffff; }\n    [background='gray'] eds-menu-item[selected] .eds-menu-item-main::before {\n      border-color: #ffffff; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\n.eds-item-compact eds-menu-item > .eds-menu-item-main {\n  padding: 0.40em 0; }\n\n.eds-item-compact eds-menu-item.has-children > .eds-menu-item-main {\n  padding: 0.6em 0; }\n\n.eds-item-compact eds-menu-item[selected] .eds-menu-item-main::before {\n  right: 0;\n  top: 0px;\n  bottom: 0px; }\n\n.eds-item-compact eds-menu-item[selected]::after {\n  top: 0px;\n  bottom: 0px; }\n\neds-menu-item {\n  display: block;\n  position: relative;\n  background-color: #ffffff;\n  font-weight: 400;\n  color: #426da9;\n  cursor: pointer; }\n  eds-menu-item .eds-menu-item-main {\n    display: block;\n    padding: 0.6em;\n    z-index: 90;\n    position: relative;\n    outline: none;\n    text-decoration: none; }\n    eds-menu-item .eds-menu-item-main::after {\n      content: '';\n      position: absolute;\n      top: 0px;\n      left: 0px;\n      right: 0px;\n      bottom: 0px;\n      border-radius: 0;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    eds-menu-item .eds-menu-item-main.focus::after, eds-menu-item .eds-menu-item-main:focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease;\n      border-color: #426da9;\n      z-index: 900; }\n    eds-menu-item .eds-menu-item-main .eds-menu-item-caret {\n      display: none; }\n      eds-menu-item .eds-menu-item-main .eds-menu-item-caret.show {\n        display: inline-block;\n        margin-left: 10px;\n        margin-right: 1em;\n        width: 12px;\n        height: 8px;\n        background-repeat: no-repeat;\n        background-size: contain;\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjEycHgiIGhlaWdodD0iN3B4IiB2aWV3Qm94PSIwIDAgMTIgNyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4LjIgKDQ3MzI3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4NCiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9Ikdyb3VwLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCAxLjAwMDAwMCkgcm90YXRlKC00NS4wMDAwMDApIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC0xLjAwMDAwMCkgdHJhbnNsYXRlKDIuMDAwMDAwLCAtMy4wMDAwMDApIiBmaWxsPSIjNDI2REE5Ij4NCiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgeD0iMCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iOCIgcng9IjEiPjwvcmVjdD4NCiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0Pg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+\"); }\n  eds-menu-item.has-children {\n    font-weight: 500;\n    color: #426da9; }\n    eds-menu-item.has-children[expanded] > .eds-menu-item-main > .eds-menu-item-caret {\n      transform: rotate(180deg); }\n    eds-menu-item.has-children[expanded] > .eds-menu-item-children {\n      opacity: 1;\n      transform: scaleY(1); }\n    eds-menu-item.has-children > .eds-menu-item-children {\n      opacity: 0;\n      transform: scaleY(0);\n      overflow: hidden;\n      height: 0; }\n  eds-menu-item:hover {\n    color: #163c6f; }\n  eds-menu-item:first-child {\n    margin-top: 4px; }\n  eds-menu-item:last-child {\n    margin-bottom: 4px; }\n  eds-menu-item[selected] {\n    background-color: #f6f6f6; }\n    eds-menu-item[selected] .eds-menu-item-main {\n      color: #333333; }\n      eds-menu-item[selected] .eds-menu-item-main::before {\n        content: '';\n        display: block;\n        position: absolute;\n        left: 0;\n        right: 0;\n        top: -2px;\n        bottom: -2px;\n        border: 2px solid #f6f6f6;\n        z-index: 100; }\n    eds-menu-item[selected]::after {\n      content: '';\n      display: block;\n      position: absolute;\n      left: 0;\n      top: -2px;\n      bottom: -2px;\n      width: 4px;\n      background-color: #e63888;\n      z-index: 120; }\n  eds-menu-item eds-icon {\n    display: none;\n    margin-right: 10px; }\n  eds-menu-item[icon] eds-icon {\n    display: inline-block; }\n"

/***/ })
/******/ ]);