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

const tag = 'eds-table';
const html = __webpack_require__(1);
const css = __webpack_require__(2);

function forEachRow(container, action) {
  return Array
    .from(container.querySelectorAll('tr'))
    .forEach(action);
}

function resolveElementWithClass (el, cls) {
  while (!el.classList.contains(cls) && (el = el.parentElement));
  return el;
}

class EDSTableElement extends EDSElement {
  static get observedAttributes() {
    return EDSTableElement.normalizeObservedAttributes(['compact', { multiselect: 'multiSelect' }]);
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineFlagProperties(EDSTableElement.observedAttributes);

    this._refs = {
      table: this.$('.eds-table-content'),
      colgroup: this.$('.eds-table-colgroup'),
      head: this.$('.eds-table-head'),
      body: this.$('.eds-table-body'),
      rowActions: this.$('.eds-table-row-actions'),
      tableHeader: this.$('.eds-table-header'),
      selectionHeader: this.$('.eds-table-selection-header')
    };

    this._columns = [];
    this._data = [];
    this._selectedRows = [];
  }

  connectedCallback() {
    this._onMouseover = this._onMouseover.bind(this);
    document.addEventListener('mouseover', this._onMouseover);
    this._refs.rowActions.addEventListener('click', this._onRowActionClick.bind(this));

    super.connectedCallback();
  }

  disconnectedCallback() {
    document.removeEventListener('mouseover', this._onMouseover);
    super.disconnectedCallback();
  }

  get columns() {
    return this._columns;
  }

  set columns(value) {
    this._columns = value;
    this.refresh();
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.refresh();
  }

  get rowClasses() {
    return this._rowClasses;
  }

  set rowClasses(value) {
    this._rowClasses = value;
    this.refresh();
  }

  // Overwrite w/ setter
  _rowClasses(row) {
    return [];
  }

  get selectedRows() {
    return this._selectedRows;
  }

  set selectedRows(value) {
    this._selectedRows = value;
    this._refreshSelections();
  }

  refresh() {
    this._renderColumns();
    this._renderRows();
  }

  _renderColumns() {
    this._refs.colgroup.innerHTML = '';
    this._refs.head.innerHTML = '';
    if (this.multiSelect) {
      const col = document.createElement('col');
      this._refs.colgroup.appendChild(col);
      const th = document.createElement('th');
      th.classList.add('eds-table-checkbox-cell');
      th.classList.add('eds-table-select-all');
      th.insertAdjacentHTML('afterbegin', '<eds-checkbox></eds-checkbox>');
      this._refs.head.appendChild(th);
      const checkbox = th.querySelector('eds-checkbox');
      checkbox.addEventListener('change', this._toggleSelectAll.bind(this));
    }
    this.columns.forEach(column => {
      this._renderColumn(column);
    });

    this._refs.head.addEventListener('mouseover', () => {
      forEachRow(this._refs.table, tr => tr.classList.remove('hover'));
      this._hideRowActions();
    });
  }

  _renderColumn(column) {
    // col
    const col = document.createElement('col');
    col.style.width = column.width ? `${column.width}px` : 'auto';
    col.setAttribute('data-field', column.field);
    this._refs.colgroup.appendChild(col);

    // th
    const th = document.createElement('th');
    th.innerHTML = column.name;
    th.setAttribute('data-field', column.field);
    this._refs.head.appendChild(th);
  }

  _renderRows() {
    this._refs.body.innerHTML = '';
    let count = 0;
    this.data.forEach(row => {
      let tr = this._renderRow(row);
      let cls = (count % 2) ? 'even' : 'odd';
      tr.classList.add(cls);
      count++;
    });
  }

  _renderRow(row) {
    const tr = document.createElement('tr');
    let html = '';

    if (this.multiSelect) html += '<td class="eds-table-checkbox-cell"><eds-checkbox class="eds-suppress-row-click"></eds-checkbox></td>';

    let skipColumns = 0;
    this.columns.forEach((column, index) => {
      const colspan = (column.colspan) ? column.colspan(column, row) : 1;

      if (!skipColumns) {
        const formattedCellValue = this._formattedCellValue(column, row);
        let tdClass = '';
        let cellHTML = '';
        if (typeof formattedCellValue === 'object') {
          tdClass = formattedCellValue.class;
          cellHTML = formattedCellValue.html;
        } else {
          cellHTML = formattedCellValue;
        }

        html += `<td class="eds-table-cell ${tdClass}" data-field="${column.field}" colspan="${colspan}">`;
        html += cellHTML;
        html += '</td>';
        if (skipColumns > 0) skipColumns -= 1;
      }

      if (colspan > 1) skipColumns += colspan;
    });

    tr.setAttribute('data-id', row.id);
    tr.classList.add.apply(tr.classList, ['eds-table-row'].concat(this.rowClasses(row)));
    tr.addEventListener('mouseover', event => this._onRowHover(row, tr, event));
    tr.addEventListener('click', event => this._onRowClick(row, event));
    tr.insertAdjacentHTML('afterbegin', html);
    this._refs.body.appendChild(tr);

    if (this.multiSelect) {
      const checkbox = tr.querySelector('.eds-table-checkbox-cell eds-checkbox');
      checkbox.addEventListener('change', () => this._onCheckboxChange(checkbox, tr, row));
    }

    return tr;
  }

  _formattedCellValue(column, row) {
    let value;

    // handle nested values
    if (column.field.match('.')) {
      const fields = column.field.split('.');
      value = row;
      fields.forEach(field => value = value[field]); // eslint-disable-line no-return-assign
    } else {
      value = row[column.field];
    }

    if (column.formatter) return column.formatter(value, row);
    return (value !== undefined) ? value : '';
  }

  _onCheckboxChange(checkbox, tr, row) {
    if (checkbox.checked) {
      this.selectedRows = this._selectedRows.concat(row);
      this._hideRowActions();
    } else {
      this.selectedRows = this.selectedRows.filter(item => item.id !== row.id);
    }
    this._syncSelectAllCheckbox();
    this.dispatchEvent(new CustomEvent('selectionchange', { detail: this.selectedRows }));
  }

  // For programmatic changes to selectedRow
  _refreshSelections() {
    forEachRow(this._refs.body, tr => {
      tr.classList.remove('eds-selected');
      tr.querySelector('eds-checkbox').checked = false;
    });
    this.selectedRows.forEach(row => {
      let tr = this._refs.body.querySelector(`tr[data-id="${row.id}"]`);
      tr.classList.add('eds-selected');
      tr.querySelector('eds-checkbox').checked = true;
    });
    this._syncSelectAllCheckbox();

    if (this.selectedRows.length) this._showSelectionHeader();
    else this._hideSelectionHeader();
  }

  _showSelectionHeader() {
    this._refs.selectionHeader.classList.add('show');
  }

  _hideSelectionHeader() {
    this._refs.selectionHeader.classList.remove('show');
  }

  _syncSelectAllCheckbox() {
    const checkbox = this._refs.head.querySelector('.eds-table-checkbox-cell eds-checkbox');
    if (this.data.length === this.selectedRows.length && this.data.length !== 0) {
      checkbox.checked = true;
    } else checkbox.checked = false;
  }

  selectAll() {
    this.selectedRows = this.data.slice();
  }

  clearSelection() {
    this.selectedRows = [];
  }

  _toggleSelectAll() {
    const el = this.shadowRoot.querySelector('.eds-table-select-all eds-checkbox');
    if (!el) return;
    if (el.checked) this.selectAll();
    else this.clearSelection();
    this.dispatchEvent(new CustomEvent('selectionchange', { detail: this.selectedRows }));
  }

  _onMouseover(event) {
    if (this._refs.head.contains(event.target)) this._hideRowActions();
    if (!this.contains(event.target)) this._hideRowActions();
  }

  _onRowHover(row, tr, event) {
    forEachRow(this._refs.table, tr => tr.classList.remove('hover'));
    if (!this.multiSelect || (this.multiSelect && !this.selectedRows.length)) tr.classList.add('hover');
    this._currentRow = row;

    if (this._refs.rowActions.querySelector('slot').assignedNodes().length) {
      if (this.selectedRows.length) this._hideRowActions();
      else this._showRowActions(tr);
    }
  }

  _onRowClick(row, event) {
    if (event.target.classList.contains('eds-suppress-row-click')) return;
    const cellEl = resolveElementWithClass(event.target, 'eds-table-cell');
    if (cellEl) {
      this.dispatchEvent(new CustomEvent('rowclick', { detail: {
        field: cellEl.getAttribute('data-field'),
        row: this._currentRow,
        event: event
      }}));
    }
  }

  _showRowActions(tr) {
    if (tr.classList.contains('even')) this._refs.rowActions.classList.add('even');
    else this._refs.rowActions.classList.remove('even');
    const offset = tr.offsetTop + 1;
    this._refs.rowActions.style.top = `${offset}px`;
    this._refs.rowActions.style.height = `${tr.offsetHeight - 1}px`;
    this._refs.rowActions.classList.add('show');

    // for refined animations only
    this._refs.rowActions.classList.remove('opaque');
    this._refs.rowActions.classList.add('opaque');
  }

  _hideRowActions() {
    forEachRow(this._refs.table, tr => tr.classList.remove('hover'));
    this._refs.rowActions.classList.remove('show');

    // for refined animations only
    this._refs.rowActions.classList.remove('opaque');
  }

  _onRowActionClick(event) {
    this.dispatchEvent(new CustomEvent('rowactionclick', { detail: {
      action: event.target.getAttribute('data-action'),
      row: this._currentRow,
      target: event.target
    }}));
  }
}

customElements.define(tag, EDSTableElement);
window.EDSTableElement = EDSTableElement;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<div class=\"eds-table-header api-table-header\">\n  <slot name='header'></slot>\n</div>\n\n<div class=\"eds-table-selection-header api-table-selection-header\">\n  <slot name='selection-header'></slot>\n</div>\n\n<div class=\"eds-table-row-actions\">\n  <slot name=\"row-actions\"></slot>\n</div>\n\n<table class='eds-table-content api-table-content'>\n  <colgroup class='eds-table-colgroup'></colgroup>\n  <thead><tr class=\"eds-table-head\"></tr></thead>\n  <tbody class='eds-table-body'></tbody>\n</table>\n\n<div class=\"eds-table-footer api-table-footer\">\n  <slot name='footer'></slot>\n</div>"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/* reset button styling\n * source: https://gist.github.com/MoOx/9137295\n */\neds-table .eds-table-row-actions {\n  transform-origin: right;\n  transition: transform 100ms ease-in 0ms, opacity 0ms ease 0ms, background-color 0ms ease 0ms, box-shadow 0ms ease 0ms; }\n  eds-table .eds-table-row-actions.show {\n    transition: transform 100ms ease-out 0ms, opacity 40ms ease 10ms; }\n  eds-table .eds-table-row-actions eds-icon {\n    transition: transform 100ms ease, color 100ms ease; }\n    eds-table .eds-table-row-actions eds-icon:hover {\n      transition: transform 100ms ease, color 100ms ease; }\n\neds-table table .eds-table-cell {\n  transition: padding 100ms ease; }\n\neds-table table tr {\n  transition: background-color 50ms ease 0ms; }\n  eds-table table tr.eds-selected {\n    transition: background-color 50ms ease 0ms; }\n  eds-table table tr.hover {\n    transition: background-color 0ms ease 0ms; }\n\neds-table[compact] table .eds-table-cell {\n  transition: padding 100ms ease; }\n\neds-table .eds-table-selection-header {\n  transition: transform 80ms ease-in 0ms, opacity 40ms linear 10ms; }\n  eds-table .eds-table-selection-header.show {\n    transition: transform 50ms cubic-bezier(0, 1, 0, 0.97) 0ms, opacity 30ms cubic-bezier(0, 1, 0, 0.97) 10ms; }\n\neds-table {\n  display: inline-table;\n  position: relative;\n  border: 1px solid #cccccc;\n  border-radius: 6px;\n  overflow: hidden; }\n  eds-table .eds-table-row-actions {\n    opacity: 0;\n    transform: scale(0);\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    height: 38px;\n    padding: 0px 5px 0 8px;\n    color: #426da9; }\n    eds-table .eds-table-row-actions.show {\n      opacity: 1;\n      transform: scale(1); }\n    eds-table .eds-table-row-actions.opaque {\n      background-color: #eef4fc;\n      box-shadow: -10px 0px 15px -8px #eef4fc, -30px 0px 20px -10px #eef4fc; }\n    eds-table .eds-table-row-actions eds-icon {\n      padding: 12px 7px 10px;\n      margin-right: 0;\n      cursor: pointer; }\n      eds-table .eds-table-row-actions eds-icon:last-child {\n        margin-right: 5px; }\n      eds-table .eds-table-row-actions eds-icon:hover {\n        transform: scale(1.2);\n        color: #163c6f; }\n  eds-table table {\n    width: 100%;\n    border-spacing: 0;\n    overflow: hidden;\n    border-collapse: collapse;\n    table-layout: fixed; }\n    eds-table table .eds-table-head {\n      background-color: #f3f3f3;\n      border-bottom: 1px solid #cccccc;\n      border-top-left-radius: 6px;\n      border-top-right-radius: 6px;\n      overflow: hidden; }\n      eds-table table .eds-table-head th {\n        font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        font-size: 16px;\n        font-weight: 400;\n        color: #333333;\n        font-size: 14px;\n        font-weight: bold;\n        text-align: left;\n        padding: 11px 20px;\n        line-height: 1; }\n        eds-table table .eds-table-head th:not(:first-child) {\n          border-left: 1px solid #cccccc; }\n    eds-table table tr.even {\n      background-color: #f3f3f3; }\n    eds-table table tr.odd {\n      background-color: white; }\n    eds-table table tr.hover {\n      background-color: #eef4fc; }\n    eds-table table tr.eds-selected {\n      background-color: #f7e9f9; }\n    eds-table table .eds-table-cell {\n      font-size: 14px;\n      padding: 13px 20px;\n      line-height: 1; }\n      eds-table table .eds-table-cell:not(:first-child) {\n        border-left: 1px solid #cccccc; }\n    eds-table table .eds-table-checkbox-cell {\n      padding: 0 10px !important;\n      width: 40px; }\n      eds-table table .eds-table-checkbox-cell eds-checkbox {\n        display: block;\n        height: 18px; }\n  eds-table[compact] table .eds-table-cell {\n    padding: 7px 20px; }\n  eds-table[compact] .eds-table-row-actions {\n    height: 27px; }\n    eds-table[compact] .eds-table-row-actions.opaque {\n      box-shadow: -15px 0px 15px -8px #eef4fc, -30px 0px 20px -10px #eef4fc; }\n    eds-table[compact] .eds-table-row-actions eds-icon {\n      padding: 5px 7px; }\n  eds-table .eds-table-header [slot='header'] > section {\n    border-bottom: 1px solid #cccccc;\n    padding: 16px 20px; }\n  eds-table .eds-table-selection-header {\n    opacity: 0;\n    transform: scale(0);\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: auto;\n    background-color: #6d2077;\n    color: #ffffff; }\n    eds-table .eds-table-selection-header section, eds-table .eds-table-selection-header eds-toolbar {\n      border-color: rgba(255, 255, 255, 0.3); }\n    eds-table .eds-table-selection-header.show {\n      opacity: 1;\n      transform: scale(1); }\n"

/***/ })
/******/ ]);