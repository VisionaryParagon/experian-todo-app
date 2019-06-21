const tag = 'eds-sidebar';
const html = require('./eds-sidebar.html');
const css = require('./eds-sidebar.scss');
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
