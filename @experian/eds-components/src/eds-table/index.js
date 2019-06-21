const tag = 'eds-table';
const html = require('./eds-table.html');
const css = require('./eds-table.scss');

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
