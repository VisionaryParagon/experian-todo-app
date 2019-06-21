const tag = 'eds-tree-item';
const html = require('./eds-tree-item.html');
const css = require('./eds-tree-item.scss');

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
