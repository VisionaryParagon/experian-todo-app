import './eds-icon-tab';
import './eds-tab';

const tag = 'eds-tabs';
const html = '<ul class="tab-labels" role="tablist"></ul><slot></slot>';
const css = require('./eds-tabs.scss');

class EDSTabsElement extends EDSElement {
  static get observedAttributes() {
    return EDSTabsElement.normalizeObservedAttributes([ { arialabelclose: 'ariaLabelClose' }, 'vertical' ]);
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(['ariaLabelClose']);
    this.defineFlagProperties(['vertical']);

    this._refs = {
      tabLabels: this.$('ul.tab-labels')
    };

    this._refs.tabLabels.addEventListener('click', this._handleTabClick.bind(this));
    this.addEventListener('eds-tab-select', e => {
      e.stopPropagation();
      this._showTab(e.detail);
    });
    this.addEventListener('eds-tab-label', e => {
      e.stopPropagation();
      this._updateTabLabel(e.detail);
    });

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
      this._handleSlottedChildren();
    });
  }

  connectedCallback() {
    this._showTab = this._showTab.bind(this);
    super.connectedCallback();
  }

  _handleTabClick(e) {
    const anchor = getAnchor(e.target);
    if (anchor) {
      e.preventDefault();
      const edsTab = this.querySelector(`[_id='${anchor.getAttribute('href').replace('#', '')}']`);
      if (edsTab) this._showTab(edsTab);
    }

    function getAnchor(el) {
      if (!el) return null;
      if (el.tagName === 'A') return el;
      return getAnchor(el.parentElement);
    }
  }

  _handleSlottedChildren() {
    this._refreshTabs();
    this._resolveSelection();
  }

  _uniqueId() {
    // Credit: https://gist.github.com/gordonbrander/2230317
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  _refreshTabs() {
    // Iterate over each eds-tab/eds-icon-tab element and insert the label into the UL that controls the tabs
    const labels = this._refs.tabLabels;
    while (labels.firstChild) labels.removeChild(labels.firstChild);

    this.tabs.forEach(edsTab => {
      const li = document.createElement('li');
      li.setAttribute('role', 'presentation');

      // Create the tab label anchor
      const a = document.createElement('a');
      if (edsTab.icon) {
        a.appendChild(edsTab.icon.cloneNode(true));
        li.classList.add('icon-tab');
      } else {
        a.innerHTML = edsTab.label;
      }
      li.appendChild(a);

      if (edsTab.closable) {
        const closeButton = document.createElement('button');
        closeButton.setAttribute('aria-label', this.ariaLabelClose || 'Close');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => this.removeChild(edsTab));
        li.appendChild(closeButton);
      }

      this._refs.tabLabels.appendChild(li);

      // Set the necessary attributes
      const id = edsTab._id || (edsTab._id = this._uniqueId());
      this._setTabLabelAttributes(a, id);
      this._setEdsTabAttributes(edsTab, id);
    });

    if (this.tabs.filter(({ icon }) => !!icon).length) {
      this._refs.tabLabels.classList.add('has-icon-tab');
    } else {
      this._refs.tabLabels.classList.remove('has-icon-tab');
    }
  }

  _setTabLabelAttributes(el, id) {
    el.setAttribute('_id', `tab-${id}`);
    el.setAttribute('aria-controls', `tab-panel-${id}`);
    el.setAttribute('href', `#tab-panel-${id}`);
    el.setAttribute('role', 'tab');
  }

  _setEdsTabAttributes(el, id) {
    el.setAttribute('_id', `tab-panel-${id}`);
    el.setAttribute('aria-labelledby', `tab-${id}`);

    // Move these to eds-tab?
    el.setAttribute('aria-hidden', !el.selected);
    el.setAttribute('role', 'tabpanel');
  }

  _resolveSelection() {
    // If no tab is selected, default to the first
    const selected = this.tabs.find(el => el.hasAttribute('selected')) || this.tabs.find(el => el.getAttribute('_id') === this._previousId);

    if (!selected && this.tabs.length) this.selectTab(0);
    else if (selected) this._showTab(selected);
  }

  _updateTabLabel(edsTab) {
    const id = edsTab.getAttribute('_id').replace('tab-panel-', '');
    const label = this._refs.tabLabels.querySelector(`a[_id='tab-${id}']`);
    if (edsTab.icon) {
      label.innerHTML = '';
      label.appendChild(edsTab.icon.cloneNode(true));
    } else {
      label.innerHTML = edsTab.label;
    }
  }

  _showTab(edsTab) {
    const previous = this.tabs.find(el => el.hasAttribute('selected'));

    // Deselect
    if (previous) {
      if (previous !== edsTab) previous.selected = false;
      const previousId = this._previousId = previous.getAttribute('_id');
      const previousLabel = this._refs.tabLabels.querySelector(`a[href='#${previousId}']`);
      previousLabel.parentElement.classList.remove('selected');
      previousLabel.setAttribute('aria-selected', false);
    }

    // Select
    const currentId = edsTab.getAttribute('_id');
    const label = this._refs.tabLabels.querySelector(`a[href='#${currentId}']`);
    label.parentElement.classList.add('selected');
    edsTab.selected = true;
    label.setAttribute('aria-selected', true);
  }

  get tabs() {
    return Array.from(this.children).filter(el => ['EDS-ICON-TAB', 'EDS-TAB'].indexOf(el.tagName) !== -1);
  }

  selectTab(index) {
    if (this.tabs[index]) this._showTab(this.tabs[index]);
  }
}

customElements.define(tag, EDSTabsElement);
window.EDSTabsElement = EDSTabsElement;
