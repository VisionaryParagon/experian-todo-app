const tag = 'eds-menu-item';
const html = require('./eds-menu-item.html');
const css = require('./eds-menu-item.scss');

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
