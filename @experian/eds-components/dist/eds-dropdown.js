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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eds_core_deprecate__ = __webpack_require__(1);

const tag = 'eds-dropdown';
const css = __webpack_require__(2);
const html = __webpack_require__(3);

const getKey = ({ key }) => {
  switch (key) {
    case 'Down':
    case 'ArrowDown':
      return 'ArrowDown';
    case 'Up':
    case 'ArrowUp':
      return 'ArrowUp';
    case 'Spacebar':
    case ' ':
      return ' ';
    case 'Escape':
    case 'Esc':
      return 'Escape';
    default:
      return key;
  }
};

const mirroredSelectAttributes = {
  default: [
    'autofocus',
    'form',
    'name'
  ],
  flags: [
    'required'
  ],
  get all() {
    return this.default.concat(this.flags);
  }
};

class EDSDropdownElement extends EDSElement {
  static get observedAttributes() {
    return EDSDropdownElement.normalizeObservedAttributes(mirroredSelectAttributes.all.concat([
      { alignoptions: 'alignOptions' },
      'disabled',
      'label',
      'multiple',
      { optionwidth: 'optionWidth' },
      { optionswidth: 'optionsWidth' },
      'placeholder',
      'searchable',
      { searchplaceholder: 'searchPlaceholder' },
      'value',
      'info',
      'warning',
      'error'
    ]));
  }

  init() {
    this._value = [];

    this._ids = ['label', 'value']
      .map(key => ({ [key]: this._uniqueId() }))
      .reduce((ids, id) => Object.assign({}, ids, id));

    this._initShadowDOM();
    this._refs = {
      label: this.$('.label'),
      trigger: this.$('.eds-dropdown-trigger'),
      value: this.$('.eds-dropdown-value'),
      placeholder: this.$('.eds-dropdown-placeholder'),
      messages: this.$('.eds-dropdown-messages'),
      errorText: this.$('.error-text'),
      warningText: this.$('.warning-text'),
      infoText: this.$('.info-text'),
      options: this.$('.eds-dropdown-options'),
      optionsList: this.$('ul'),
      searchbox: this.$('.eds-dropdown-searchbox')
    };

    this.defineDefaultProperties(mirroredSelectAttributes.default);
    this.defineFlagProperties(mirroredSelectAttributes.flags);

    this._options = [];

    this.multiple = this.multiple; // Trigger aria-multiselectable attribute logic
    this.setAttribute('role', 'application');
  }

  _uniqueId() {
    // Credit: https://gist.github.com/gordonbrander/2230317
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  _initShadowDOM() {
    // Approximates string interpolation (but really the template should probably be a JavaScript function):
    const htmlEval = html.replace(/\$\{([^\{]+)\}/g, function(_, expr) {
      const _self = this; // eslint-disable-line no-unused-vars
      return eval(expr.replace('this.', '_self.')); // eslint-disable-line no-eval
    }.bind(this));

    this.initShadowDOM(tag, htmlEval, css);
  }

  _setupEvents() {
    this._handleExternalClick = this._handleExternalClick.bind(this);
    document.addEventListener('click', this._handleExternalClick);

    const filterFocusEvent = event => {
      this._refs.trigger.addEventListener(event, e => {
        if (!e.relatedTarget) return;
        if (!this.contains(e.relatedTarget) && !this._refs.options.contains(e.relatedTarget)) this.close();
        else e.stopPropagation();
      });
    };

    filterFocusEvent('focus');
    filterFocusEvent('blur');

    this._onTriggerKeydown = this._onTriggerKeydown.bind(this);
    this._refs.trigger.addEventListener('keydown', this._onTriggerKeydown);

    this._refs.trigger.addEventListener('click', e => this.toggle(e));
    this._refs.searchbox.addEventListener('keydown', this._onSearchKeydown.bind(this));
    this._refs.searchbox.addEventListener('keyup', this._renderOptions.bind(this));
    this._refs.searchbox.querySelector('input').addEventListener('focus', () => this._focusSearchbox());
    this._refs.searchbox.querySelector('input').addEventListener('blur', () => this._defocusSearchbox());
    this._refs.searchbox.addEventListener('click', e => {
      e.stopPropagation();
      this._focusSearchbox();
    });

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
      this._handleSlottedChildren();
    });
  }

  connectedCallback() {
    this._setupEvents();
    super.connectedCallback();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleExternalClick);
    super.disconnectedCallback();
  }

  onFirstVisible() {
    // Set widths as auto by default
    if (!this.style.width && !window.getComputedStyle(this).getPropertyValue('width')) {
      this.style.width = 'auto';
    }
    if (!this.optionWidth) this._refs.options.style.width = 'auto';
    this.visibleOnce = true; // always set true in this method
  }

  // This overwrites 'options', we don't support a merge between
  // property assignment and declarative assignment
  _handleSlottedChildren() {
    const options = Array.from(this.querySelectorAll('eds-option'));
    const newOptions = [];
    const selected = [];

    options.forEach(el => {
      const option = {
        value: el.getAttribute('value') === null ? el.innerHTML : el.getAttribute('value'),
        content: el.innerHTML
      };

      newOptions.push(option);
      if (el.hasAttribute('selected')) selected.push(option.value);
    });

    this.options = newOptions;

    // Last selection wins if not multiple
    if (selected.length > 1 && !this.multiple) this.value = selected[selected.length - 1];
    else this.value = selected;
  }

  _handleExternalClick(e) {
    const el = e.composedPath ? e.composedPath()[0] : e.target;
    if ((!this._open) || this === el || this.contains(el) || this._containsFromEvent(e, el)) return;

    this.close();
  }

  // Due to a bug in webcomponents polyfill we need to search the composedPath
  // manually to see if this element is inside a shadow DOM of another element.
  // In some cases the 'Oc' object is missing references to parentNode & parentElement
  _containsFromEvent(e, el) {
    return e.composedPath().some(el => el === this);
  }

  _onTriggerKeydown(e) {
    switch (getKey(e)) {
      case 'ArrowDown':
        e.preventDefault();
        this.open(e);
        break;
      case 'ArrowUp':
        e.preventDefault();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this._open) this.close(true);
        else this.open(e);
        break;
      case 'Tab':
        this._open && e.preventDefault();
        break;
      case 'Escape':
        this.close(true);
        break;
    }
  }

  _onSearchKeydown(e) {
    e.stopPropagation();
    switch (getKey(e)) {
      case 'ArrowDown':
        e.preventDefault();
        this._navigateOptions(-1, e);
        break;
      case 'ArrowUp':
      case 'Enter':
      case 'Escape':
        e.preventDefault();
        this.close(true);
        break;
      case 'Tab':
        e.preventDefault();
        break;
    }
  }

  _onOptionKeydown(option, index, e) {
    e.stopPropagation();
    switch (getKey(e)) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        this._navigateOptions(index, e);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.multiple) this.close(true);
        else this._onClickOption(option, e);
        break;
      case 'Escape':
        this.close(true);
        break;
      case ' ':
        e.preventDefault();
        this._onClickOption(option, e);
        break;
      case 'Tab':
        e.preventDefault();
        break;
    }
  }

  _focusOption(optionsListItem) {
    optionsListItem.focus();
  }

  _navigateOptions(index, e) {
    const options = this._refs.options.querySelectorAll('li');
    e.stopPropagation();

    let direction;
    const UP = 'up';
    const DOWN = 'down';

    switch (getKey(e)) {
      case 'ArrowDown':
        direction = DOWN;
        break;
      case 'ArrowUp':
        direction = UP;
        break;
    }

    if (direction === DOWN && index < options.length - 1) {
      this._focusOption(options[index + 1]);
    } else if (direction === UP) {
      if (index === 0) {
        if (this.searchable) this._focusSearchbox();
        else this.close(true);
      } else this._focusOption(options[index - 1]);
    }
  }

  open(e) {
    this._open = true;
    this._refs.options.classList.add('eds-dropdown-open');
    this._resolveOptionWidth();
    this._refs.trigger.setAttribute('aria-expanded', 'true');

    if (this.searchable) {
      this._refs.searchbox.querySelector('input').value = '';
      setTimeout(() => this._focusSearchbox());
    } else if (e) {
      setTimeout(() => {
        this._navigateOptions(-1, e);
      });
    }
    this._renderOptions();
    this.dispatchEvent(new CustomEvent('open'));
  }

  _resolveOptionWidth() {
    let _optionWidth;

    if (this.optionWidth) {
      if (this.optionWidth.indexOf('%') !== -1) {
        const _width = parseFloat(window.getComputedStyle(this).getPropertyValue('width').replace('px', ''));
        const BORDER_WIDTH = 2;
        _optionWidth = `${(parseInt(this.optionWidth.replace('%', ''), 10) * 0.01 * _width) + BORDER_WIDTH}px`;
      } else {
        _optionWidth = this.optionWidth;
      }
    } else {
      // Never allow options to be truncated implicitly
      const _width = parseFloat(window.getComputedStyle(this).getPropertyValue('width').replace('px', ''));
      this._refs.options.style.width = 'auto';
      _optionWidth = parseFloat(window.getComputedStyle(this._refs.options).getPropertyValue('width').replace('px', ''));
      if (_optionWidth < _width) _optionWidth = `${_width}px`;
      else _optionWidth = `${_optionWidth}px`;
    }

    this._refs.options.style.width = _optionWidth;
  }

  close(refocus) {
    this._open = false;
    this._refs.options.classList.remove('eds-dropdown-open');
    this._refs.trigger.setAttribute('aria-expanded', 'false');
    this.dispatchEvent(new CustomEvent('close'));
    if (refocus) this._refs.trigger.focus();
  }

  toggle(e) {
    e.preventDefault();
    if (this.disabled) return;
    if (this._open) this.close(true);
    else this.open();
  }

  focus() {
    this._refs.trigger.focus();
  }

  _focusSearchbox() {
    this._refs.searchbox.classList.add('focus');
    this._refs.searchbox.querySelector('input').focus();
  }

  _defocusSearchbox() {
    this._refs.searchbox.classList.remove('focus');
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.setOrRemoveFlagAttribute('disabled', value);
    if (this.flagAttributeIsTruthy(value)) {
      this._previousTabindex = `${this.tabIndex}`;
      this.tabIndex = -1;
    } else {
      this.tabIndex = this._previousTabindex || 0;
    }
    if (this._open) this.close();
  }

  get label() {
    return this._refs.label.textContent;
  }

  set label(value) {
    if (value) this._refs.label.classList.add('show');
    else this._refs.label.classList.remove('show');
    this._refs.label.textContent = value;
  }

  get multiple() {
    return this.hasAttribute('multiple');
  }

  set multiple(value) {
    this.setOrRemoveFlagAttribute('multiple', value);
    const { optionsList } = this._refs;
    optionsList && optionsList.setAttribute('aria-multiselectable', this.flagAttributeIsTruthy(value));
  }

  _refreshMessages() {
    if (this.error || this.warning || this.info) this._refs.messages.style.display = 'block';
    else this._refs.messages.style.display = 'none';
  }

  _getStatus(attr) {
    return this.getAttribute(attr);
  }

  _setStatus(attr, value) {
    if (!value) {
      this.removeAttribute(attr);
    } else {
      this.setAttribute(attr, value);
    }
    this._refs[attr + 'Text'].innerHTML = typeof value === 'string' ? value : '';
    this._refreshMessages();
  }

  get error() {
    return this._getStatus('error');
  }

  set error(value) {
    this._setStatus('error', value);
  }

  get warning() {
    return this._getStatus('warning');
  }

  set warning(value) {
    this._setStatus('warning', value);
  }

  get info() {
    return this._getStatus('info');
  }

  set info(value) {
    this._setStatus('info', value);
  }

  get alignOptions() {
    return this.getAttribute('alignOptions');
  }

  set alignOptions(value) {
    if (value === 'left' || value === 'right') this.setAttribute('alignOptions', value);
  }

  get optionsWidth() {
    Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_deprecate__["a" /* deprecate */])('optionsWidth', 'use optionWidth instead');
    return this.optionWidth;
  }

  set optionsWidth(value) {
    Object(__WEBPACK_IMPORTED_MODULE_0__eds_core_deprecate__["a" /* deprecate */])('optionsWidth', 'use optionWidth instead');
    this.optionWidth = value;
  }

  get optionWidth() {
    return this.getAttribute('optionWidth');
  }

  set optionWidth(value) {
    this._refs.options.style.width = value;
    this.setAttribute('optionWidth', value);
  }

  get options() {
    return this._options;
  }

  set options(value) {
    this._options = value;
    this._renderOptions();
  }

  get placeholder() {
    return this.getAttribute('placeholder');
  }

  set placeholder(value) {
    this._refs.placeholder.innerHTML = value;
    if (!this._value.length) this._refs.placeholder.classList.add('show');
  }

  get searchable() {
    return this.hasAttribute('searchable');
  }

  set searchable(value) {
    if (this.flagAttributeIsTruthy(value)) this._refs.searchbox.classList.add('show');
    else this._refs.searchbox.classList.remove('show');
    this.setOrRemoveFlagAttribute('searchable', value);
  }

  get searchPlaceholder() {
    return this.getAttribute('searchPlaceholder');
  }

  set searchPlaceholder(value) {
    this.setAttribute('searchPlaceholder', value);
    const searchInput = this._refs.searchbox.querySelector('input');
    if (searchInput) {
      searchInput.placeholder = value;
    }
  }

  get value() {
    if (this.multiple) return this._value;
    return this._value.length ? this._value[0] : '';
  }

  set value(value) {
    this._value = (Array.isArray(value)) ? value : [value];
    this._renderValue();
    if (this.multiple) this._refreshSelections();
  }

  _renderValue() {
    this._refs.value.innerHTML = this.formatter(this._value, this.options);
    if (!this._value.length) this._refs.placeholder.classList.add('show');
    else this._refs.placeholder.classList.remove('show');
    this._resolveOptionWidth();
  }

  get tabIndex() {
    return this._refs.trigger.getAttribute('tabIndex');
  }

  set tabIndex(value) {
    // Removed attributes have a null value
    if (value === null) return;
    this._refs.trigger.setAttribute('tabIndex', value);
    this.removeAttribute('tabIndex');
  }

  get formatter() {
    return this._formatter;
  }

  set formatter(fn) {
    this._formatter = fn;
    // Re-render
    this._refs.value.innerHTML = this.formatter(this._value, this.options);
  }

  _formatter(value, options) {
    if (!options.length) return '';
    return value.map(val => {
      const option = options.filter(option => option.value === val)[0];
      return option ? option.content : '';
    }).join(', ');
  }

  // Overwrite
  searchFunction(options, query) {
    return options.filter(option => {
      return option.content.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  add(option) {
    this.options.push(option);
    this._renderOptions();
  }

  _refreshSelections() {
    // Reset
    this._refs.options.querySelectorAll('li eds-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });
    // Set
    this._value.forEach(val => {
      const checkbox = this._refs.options.querySelector(`li[data-value="${val}"] eds-checkbox`);
      if (checkbox) checkbox.setAttribute('checked', true);
    });
  }

  _renderOptions() {
    const filteredOptions = this.searchFunction(this.options, this._refs.searchbox.querySelector('input').value);
    this._refs.options.querySelector('ul').innerHTML = '';
    filteredOptions.forEach((option, index) => {
      let optionEl = this._renderOption(option);
      optionEl.addEventListener('click', e => this._onClickOption(option, e));
      optionEl.addEventListener('keydown', e => this._onOptionKeydown(option, index, e));
    });
    if (this.multiple) this._refreshSelections();
    this._renderValue();
  }

  _renderOption(option) {
    this._refs.options.querySelector('ul').appendChild(this._createOptionEl(option));
    return this._refs.options.querySelector('ul li:last-child');
  }

  _createOptionEl(option) {
    const li = document.createElement('li');
    li.id = this._uniqueId();
    li.tabIndex = -1;
    li.setAttribute('data-value', option.value);
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', this._isSelected(option).toString());

    if (this.multiple) {
      li.classList.add('eds-checkbox-option');
      li.innerHTML = `<eds-checkbox tabIndex='-1'></eds-checkbox> ${option.content}`;
    } else {
      li.innerHTML = option.content;
    }

    return li;
  }

  _getOptionEl(option) {
    return this._refs.options.querySelector(`li[data-value="${option.value}"]`);
  }

  _onClickOption(option, e) {
    // Control selection programmatically
    e.preventDefault();
    e.stopPropagation();
    const optionEl = this._refs.options.querySelector(`li[data-value="${option.value}"]`);
    const checkbox = (e.target.contains(optionEl)) ? optionEl.querySelector('eds-checkbox') : e.target; // eslint-disable-line no-unused-vars

    if (this.multiple && this._isSelected(option)) {
      this._deselect(option);
    } else {
      this._select(option);
    }
  }

  _select(option) {
    this._getOptionEl(option).setAttribute('aria-selected', 'true');
    if (this.multiple) {
      if (this._isSelected(option)) return;
    } else {
      if (this._isSelected(option)) {
        this.close(true);
        return;
      } else {
        this._value = [];
        this.close(true);
      }
    }

    this._value.push(option.value);
    this.value = this._value;
    this._onValueChange();
  }

  _deselect(option) {
    this._getOptionEl(option).setAttribute('aria-selected', 'false');
    if (!this._isSelected(option)) return;
    this.value = this._value.filter(value => value !== option.value);
    this._onValueChange();
  }

  _isSelected({ value }) {
    return !!~this._value.indexOf(value);
  }

  _onValueChange() {
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }
}

customElements.define(tag, EDSDropdownElement);
window.EDSDropdownElement = EDSDropdownElement;

customElements.define('eds-option', class _ extends HTMLElement {});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deprecate;
function deprecate(item, message) {
  let log = `${item} is deprecated`;
  if (message) log += `, ${message}`;
  if (console && console.warn) console.warn(log);
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-dropdown {\n  overflow: visible;\n  position: relative;\n  display: inline-block;\n  text-align: left;\n  vertical-align: bottom; }\n  eds-dropdown .slotted {\n    display: none; }\n  eds-dropdown > .label {\n    display: none;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 16px;\n    margin-bottom: 10px; }\n    eds-dropdown > .label.show {\n      display: block; }\n  eds-dropdown[warning] .eds-dropdown-trigger {\n    background-color: #fefaeb; }\n    eds-dropdown[warning] .eds-dropdown-trigger::after {\n      opacity: 1;\n      border-color: #f5a70a; }\n  eds-dropdown[error] .eds-dropdown-trigger {\n    background-color: #fff5f7; }\n    eds-dropdown[error] .eds-dropdown-trigger::after {\n      opacity: 1;\n      border-color: #e4002b; }\n  eds-dropdown .eds-dropdown-trigger {\n    overflow: visible;\n    text-align: left;\n    position: relative;\n    display: block;\n    background-color: white;\n    width: 100%;\n    box-sizing: border-box;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    padding: 5px 30px 5px 10px;\n    line-height: 22.4px;\n    min-height: 34px;\n    border: 1px solid #939393;\n    border-radius: 4px;\n    transition: border-color 0.15s ease;\n    outline: none; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-placeholder {\n      display: none;\n      color: #b9b9b9;\n      font-weight: 400; }\n      eds-dropdown .eds-dropdown-trigger .eds-dropdown-placeholder.show {\n        display: block; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-arrow {\n      position: absolute;\n      bottom: 14px;\n      right: 10px;\n      display: inline-block;\n      width: 0;\n      height: 0;\n      border-left: 5px solid transparent;\n      border-right: 5px solid transparent;\n      border-top: 5px solid #426da9; }\n    eds-dropdown .eds-dropdown-trigger::after {\n      content: '';\n      position: absolute;\n      top: -2px;\n      left: -2px;\n      right: -2px;\n      bottom: -2px;\n      border-radius: 4px;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-trigger.focus::after, eds-dropdown .eds-dropdown-trigger:focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease;\n      border-color: #426da9;\n      z-index: 900; }\n  eds-dropdown[disabled] {\n    cursor: not-allowed; }\n    eds-dropdown[disabled] .eds-dropdown-trigger, eds-dropdown[disabled] .eds-dropdown-trigger:focus {\n      border-color: #cccccc;\n      color: #888888; }\n      eds-dropdown[disabled] .eds-dropdown-trigger::after, eds-dropdown[disabled] .eds-dropdown-trigger:focus::after {\n        opacity: 0; }\n      eds-dropdown[disabled] .eds-dropdown-trigger .eds-dropdown-arrow, eds-dropdown[disabled] .eds-dropdown-trigger:focus .eds-dropdown-arrow {\n        border-top-color: #cccccc; }\n\n.eds-dropdown-messages {\n  padding-top: 5px;\n  display: none; }\n  .eds-dropdown-messages .info-text, .eds-dropdown-messages .warning-text, .eds-dropdown-messages .error-text {\n    font-size: 13px; }\n  .eds-dropdown-messages .warning-text {\n    color: #ad5700; }\n  .eds-dropdown-messages .error-text {\n    color: #cd0026; }\n\n.eds-dropdown-options {\n  display: none;\n  opacity: 0;\n  position: absolute;\n  z-index: 1100;\n  margin-top: 8px;\n  width: 100%;\n  background-color: white;\n  border-radius: 4px;\n  border: 1px solid transparent;\n  border: 1px solid #d8d8d8;\n  background-clip: border-box;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);\n  background-clip: padding-box;\n  font-weight: 400;\n  transition: border-color 0.15s ease, opacity 0.15s ease; }\n  .eds-dropdown-options .eds-dropdown-searchbox {\n    display: none;\n    position: relative;\n    border-bottom: 1px solid #d8d8d8;\n    padding: 5px; }\n    .eds-dropdown-options .eds-dropdown-searchbox::after {\n      content: '';\n      position: absolute;\n      top: 5px;\n      left: 5px;\n      right: 5px;\n      bottom: 5px;\n      border-radius: 4px;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    .eds-dropdown-options .eds-dropdown-searchbox.focus::after, .eds-dropdown-options .eds-dropdown-searchbox:focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease;\n      border-color: #426da9;\n      z-index: 900; }\n    .eds-dropdown-options .eds-dropdown-searchbox .eds-search-icon {\n      position: absolute;\n      top: 10px;\n      right: 12px;\n      width: 20px;\n      height: 20px; }\n      .eds-dropdown-options .eds-dropdown-searchbox .eds-search-icon svg {\n        fill: #426da9;\n        width: 20px; }\n    .eds-dropdown-options .eds-dropdown-searchbox input {\n      outline: none;\n      display: block;\n      width: 100%;\n      padding: 5px 10px;\n      border: none;\n      line-height: 22.4px;\n      font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n      font-size: 16px;\n      font-weight: 400;\n      color: #333333;\n      box-sizing: border-box; }\n    .eds-dropdown-options .eds-dropdown-searchbox.show {\n      display: block; }\n  .eds-dropdown-options ul {\n    padding: 5px 0;\n    margin: 2px 0 0;\n    list-style: none;\n    max-height: 280px;\n    overflow: auto; }\n    .eds-dropdown-options ul li {\n      margin: 0;\n      padding: 10px 20px;\n      white-space: nowrap;\n      cursor: pointer;\n      min-height: 40px;\n      box-sizing: border-box;\n      position: relative;\n      outline: none; }\n      .eds-dropdown-options ul li::after {\n        content: '';\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        right: 0px;\n        bottom: 0px;\n        border-radius: 0;\n        border: 2px solid #426da9;\n        opacity: 0;\n        transition: opacity 0.15s ease; }\n      .eds-dropdown-options ul li.focus::after, .eds-dropdown-options ul li:focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease;\n        border-color: #426da9;\n        z-index: 900; }\n      .eds-dropdown-options ul li:hover {\n        background-color: #426da9;\n        color: white; }\n      .eds-dropdown-options ul li.eds-checkbox-option {\n        padding-left: 48px; }\n      .eds-dropdown-options ul li eds-checkbox {\n        position: absolute;\n        top: 12px;\n        left: 20px; }\n  .eds-dropdown-options.eds-dropdown-open {\n    display: block;\n    opacity: 1; }\n"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<span class=\"label\" id=\"${this._ids.label}\"></span>\n<button class=\"eds-dropdown-trigger\" aria-labelledby=\"${this._ids.label} ${this._ids.value}\" aria-haspopup=\"listbox\">\n  <span class='eds-dropdown-value' id=\"${this._ids.value}\"></span>\n  <span class='eds-dropdown-placeholder'></span>\n  <span class='eds-dropdown-arrow'></span>\n</button>\n<div class='eds-dropdown-messages'>\n  <div class='error-text'></div>\n  <div class='warning-text'></div>\n  <div class='info-text'></div>\n</div>\n<div class='helper-text'></div>\n<div class='slotted'>\n  <slot></slot>\n</div>\n<div class='eds-dropdown-options'>\n  <div class='eds-dropdown-searchbox'>\n    <div class='eds-search-icon'>\n      <svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/>\n          <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n      </svg>\n    </div>\n    <input type='text' placeholder='Search' />\n  </div>\n  <ul role='listbox' aria-multiselectable='false'>\n\n  </ul>\n</div>\n"

/***/ })
/******/ ]);