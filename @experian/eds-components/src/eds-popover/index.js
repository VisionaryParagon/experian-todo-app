import { setEDSValue } from '../eds-core/set-eds-value';
const tag = 'eds-popover';
const html = require('./eds-popover.html');
const css = require('./eds-popover.scss');

setEDSValue('popovers.defaults.position', 'top');

class EDSPopoverElement extends EDSElement {
  static get observedAttributes() {
    return EDSPopoverElement.normalizeObservedAttributes([
      { targetclass: 'targetClass' }, 'position', 'padding', 'visible'
    ]);
  }

  get defaults() {
    return {
      position: window.EDS.popovers.defaults.position
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(['position', 'targetClass']);
    this.defineFlagProperties(['padding']);

    this._refs = {
      content: this.$('.eds-popover-content'),
      wrapper: this.$('.eds-popover-wrapper')
    };

    this.contentid = this._randomNumber();
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() {
    this._listenForTriggers();
    super.connectedCallback();
  }

  onFirstVisible() {
    if (this.visible) this.visible = true; // Forces a refresh
    this.visibleOnce = true; // always set true in this method
  }

  disconnectedCallback() {
    this._stopListeningForTriggers();
    super.disconnectedCallback();
  }

  _listenForTriggers() {
    document.addEventListener('click', this._onClick);
  }

  _stopListeningForTriggers() {
    document.removeEventListener('click', this._onClick);
  }

  _onClick(e) {
    let el = e.composedPath ? e.composedPath()[0] : e.target;

    if (this === el || this.contains(el) || this._containsFromEvent(e, el)) {
      if (this._waiting) clearTimeout(this._waiting);
    } else if (el = el.closest(`.${this.targetClass}`)) { // eslint-disable-line no-cond-assign
      if (el === this._currentEl && this._visible) this._hide();
      else {
        this._currentEl = el;
        this._show(el);
      }
    } else {
      if (this._popper) this._hide();
    }
  }

  // Due to a bug in webcomponents polyfill we need to search the composedPath
  // manually to see if this element is inside the popover.
  // In some cases the 'Oc' object is missing references to parentNode & parentElement
  _containsFromEvent(e, el) {
    return e.composedPath().some(el => el === this);
  }

  _clearTimers() {
    if (this._waiting) clearTimeout(this._waiting);
    if (this._hiding) clearTimeout(this._hiding);
  }

  _hide() {
    this._clearTimers();
    // First timer allows enough time to move mouse cursor into the tooltip
    this._waiting = setTimeout(() => {
      // Second timer kills the actual tooltip
      this._hiding = setTimeout(() => {
        this._refs.wrapper.classList.remove('show');
        this._popper.destroy();
        this._visible = false;
        this._removeAriaAttributes();
        this.dispatchEvent(new CustomEvent('hide', { detail: this._currentEl }));
      }, 100);
      this._refs.content.classList.remove('show');
    }, 75);
  }

  _setAriaAttributes() {
    // TODO: reinvestigate the value of `role` here.
    // While technically not an alert, we are using the role of `alert`.
    this.setAttribute('role', 'alert');
    this.setAttribute('aria-describedby', this._getContentId());
    this._refs.wrapper.setAttribute('id', this._getContentId());
  }

  _removeAriaAttributes() {
    this.removeAttribute('role');
    this.removeAttribute('aria-describedby');
  }

  _show(el) {
    if (!el) return;
    this._clearTimers();
    if (this._popper) this._popper.destroy();
    this._refs.wrapper.classList.add('show');

    const options = {
      placement: this.position
    };

    this._popper = new Popper(el, this._refs.wrapper, options); // eslint-disable-line no-new
    this._refs.content.classList.add('show');
    this._visible = true;
    this._setAriaAttributes();
    this.dispatchEvent(new CustomEvent('show', { detail: el }));
  }

  _toggle() {
    if (this.visible) this._hide();
    else this._show();
  }

  _randomNumber() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  _getContentId() {
    return this._refs.wrapper.id || `eds-popover-content-${this.contentid}`;
  }

  get visible() {
    return this.hasAttribute('visible');
  }

  set visible(value) {
    this.setOrRemoveFlagAttribute('visible', value);

    // Show this popover on the first matching target
    const el = document.querySelector(`.${this.targetClass}`);
    if (this.flagAttributeIsTruthy(value)) this._show(el);
    else this._hide();
  }

  show(callback, el) {
    setTimeout(() => {
      if (el) this._show(el);
      else this.visible = true;
      if (callback) callback();
    });
  }

  hide(callback) {
    setTimeout(() => {
      this.visible = false;
      if (callback) callback();
    });
  }
}

customElements.define(tag, EDSPopoverElement);
window.EDSPopoverElement = EDSPopoverElement;
