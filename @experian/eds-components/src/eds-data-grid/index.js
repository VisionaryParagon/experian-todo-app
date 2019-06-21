const tag = 'eds-data-grid';
const html = require('./eds-data-grid.html');
let css = require('../../node_modules/ag-grid-community/dist/styles/ag-grid.css');
css += require('./eds-data-grid.scss');

class EDSDataGridElement extends EDSElement {
  static get observedAttributes() {
    return EDSDataGridElement.normalizeObservedAttributes([
      'compact'
    ]);
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineFlagProperties(EDSDataGridElement.observedAttributes);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);

    this._refs = {
      rowActions: this.$('.eds-data-grid-row-actions'),
      grid: this.$('.eds-data-grid-content'),
      gridHeader: this.$('.eds-data-grid-header'),
      selectionHeader: this.$('.eds-data-grid-selection-header')
    };

    this._options = {};
    this._selectedRows = [];
  }

  connectedCallback() {
    this.refresh();
    super.connectedCallback();
  }

  onFirstVisible() {
    this.refresh();
    this.visibleOnce = true; // always set true in this method
  }

  disconnectedCallback() {
    if (this.api) this.api.destroy();
    super.disconnectedCallback();
  }

  get options() {
    return this._options;
  }

  set options(value) {
    this._options = value;
    this.refresh();
  }

  _onSelectionChanged(event) {
    const selectedRows = event.api.getSelectedRows();

    if (selectedRows.length) this._showSelectionHeader();
    else this._hideSelectionHeader();

    // Emit events for client
    this.dispatchEvent(new CustomEvent('selectionchange', { detail: selectedRows }));
  }

  get selectedRows() {
    if (this.api) return this.api.getSelectedRows();
    else return [];
  }

  refresh() {
    if (agGrid) {
      const defaults = {
        rowHeight: (this.compact) ? 28 : 40,
        domLayout: 'normal',
        headerHeight: 36,
        defaultColDef: {
          sortable: true,
          resizable: true
        },
        animateRows: true,
        unSortIcon: true
      };

      const agOptions = Object.assign({}, defaults, this.agOptions, this.options);

      if (this.api) this.api.destroy();

      // eslint-disable-next-line
      new agGrid.Grid(this._refs.grid, agOptions);

      // Make entire package available to consumers
      this.agOptions = agOptions;
      this.api = agOptions.api;

      // Events
      this.api.removeEventListener('selectionChanged', this._onSelectionChanged);
      this.api.addEventListener('selectionChanged', this._onSelectionChanged);

      // Broadcast ready event
      this.dispatchEvent(new CustomEvent('eds-data-grid-ready', { detail: this }));
    } else {
      this.innerHTML = 'COULD NOT FIND agGrid GLOBAL';
      throw new Error('COULD NOT FIND agGrid GLOBAL');
    }
  }

  _showSelectionHeader() {
    this._refs.selectionHeader.classList.add('show');
    this._refs.selectionHeader.removeAttribute('aria-hidden');
  }

  _hideSelectionHeader() {
    this._refs.selectionHeader.classList.remove('show');
    this._refs.selectionHeader.setAttribute('aria-hidden', true);
  }

  selectAll() {
    this.selectedRows = this.data.slice();
  }

  clearSelection() {
    this.selectedRows = [];
  }

  _onRowActionClick(event) {
    this.dispatchEvent(new CustomEvent('rowactionclick', { detail: {
      action: event.target.getAttribute('data-action'),
      row: this._currentRow,
      target: event.target
    }}));
  }
}

customElements.define(tag, EDSDataGridElement);
window.EDSDataGridElement = EDSDataGridElement;
