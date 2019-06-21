import { setEDSValue, deleteEDSValue } from '../eds-core/set-eds-value';
import { uniqueId } from '../eds-core/uniqueId';
const tag = 'eds-tooltip';
const html = `<div class='eds-tooltip-wrapper'>
                <div class='eds-tooltip-content api-tooltip'>
                  <div class='eds-tooltip-arrow' x-arrow></div>
                  <slot></slot>
                </div>
              </div>`;
const css = require('./eds-tooltip.scss');

setEDSValue('tooltips.defaults.delay', 0);
setEDSValue('tooltips.defaults.position', 'top');
setEDSValue('tooltips.manager', {
  onmouseover: e => {
    let target = e.target;
    let startTime, endTime, ms;
    if (window.EDS.tooltips.debug) {
      startTime = window.performance.now();
      console.log(' ');
      console.log('[DEBUG: eds-tooltip] checking target for matches:');
      console.log(target);
      console.log(`[DEBUG: eds-tooltip] tooltip array size: ${Object.keys(window.EDS.tooltips.tracking).length}`);
    }
    let tracking = window.EDS.tooltips.tracking;
    Object.keys(tracking).forEach(tooltip => {
      tracking[tooltip].processTarget(target);
    });
    if (window.EDS.tooltips.debug) {
      endTime = window.performance.now();
      ms = endTime - startTime;
      console.log(`[DEBUG: eds-tooltip] execution cost: ${ms}ms`);
      console.log(' ');
    }
  }
});

class EDSTooltipElement extends EDSElement {
  static get observedAttributes() {
    return EDSTooltipElement.normalizeObservedAttributes([
      { targetclass: 'targetClass' }, 'position', 'delay'
    ]);
  }

  get defaults() {
    return {
      delay: window.EDS.tooltips.defaults.delay,
      position: window.EDS.tooltips.defaults.position
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(['position', 'delay']);

    this._onMouseenter = this._onMouseenter.bind(this);
    this._onMouseleave = this._onMouseleave.bind(this);

    this._refs = {
      content: this.$('.eds-tooltip-content'),
      wrapper: this.$('.eds-tooltip-wrapper')
    };

    this.setAttribute('aria-role', 'tooltip');

    this._id = uniqueId();
  }

  connectedCallback() {
    // Reset external tracking - in some cases element remains in memory when disconnected
    // reconnecting will not follow the same execution path as initialization
    this.targetClass = this.targetClass;
    this.targetElements = this.targetElements;

    this._listenForTriggers();
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._stopListeningForTriggers();
    super.disconnectedCallback();
  }

  _listenForTriggers() {
    // Setup mouse events on the tooltip itself
    this.addEventListener('mouseenter', e => {
      if (this === e.target || this.contains(e.target)) {
        if (this._waiting) clearTimeout(this._waiting);
      }
    });

    this.addEventListener('mouseleave', e => {
      this.hide();
    });
  }

  _stopListeningForTriggers() {
    // Clear target listeners
    this.targetElements.forEach(target => {
      target.removeEventListener('mouseenter', this._onMouseenter);
      target.removeEventListener('mouseleave', this._onMouseleave);
    });

    // Stop tracking
    deleteEDSValue(`tooltips.tracking.${this._id}`);

    // Clear global listener if no other tooltips
    if (!Object.keys(window.EDS.tooltips.tracking).length) {
      document.removeEventListener('mouseover', window.EDS.tooltips.manager.onmouseover);
      setEDSValue('tooltips.manager.listening', false);
    }
  }

  set targetClass(value) {
    this.setAttribute('targetclass', value);
    setEDSValue(`tooltips.tracking.${this._id}`, this);

    // Track globally when targetClass is provided
    if (!window.EDS.tooltips.manager.listening) {
      document.addEventListener('mouseover', window.EDS.tooltips.manager.onmouseover);
      setEDSValue('tooltips.manager.listening', true);
    }
  }

  get targetClass() {
    return this.getAttribute('targetclass');
  }

  set targetElements(value) {
    if (!Array.isArray(value)) throw Error('targetElements must be an array');
    this._targetElements = value;

    // Bind directly to target elements
    value.forEach(target => {
      target.addEventListener('mouseenter', this._onMouseenter);
      target.addEventListener('mouseleave', this._onMouseleave);
    });
  }

  get targetElements() {
    return this._targetElements ? this._targetElements : [];
  }

  _onMouseenter(e) {
    this.show(e.target);
  }

  _onMouseleave(e) {
    this.hide();
  }

  processTarget(target) {
    if (this === target || this.contains(target)) {
      if (this._waiting) clearTimeout(this._waiting);
    } else if (target.closest && target.closest(`.${this.targetClass}`)) { // eslint-disable-line no-cond-assign
      target = target.closest(`.${this.targetClass}`);
      this.show(target);
    } else {
      this.hide();
    }
  }

  show(target) {
    if (this._showing) clearTimeout(this._showing);
    if (this.beforeShow && (this.beforeShow(target) === false)) return;
    if (this.delay && !this._refs.content.classList.contains('show')) {
      this._showing = setTimeout(() => {
        this._showImmediate(target);
      }, this.delay);
    } else {
      this._showImmediate(target);
    }
  }

  _showImmediate(target) {
    if (!target) return;
    this._clearTimers();
    if (this._popper) this._popper.destroy();
    this._refs.wrapper.classList.add('show');

    const options = {
      placement: this.position
    };

    this._popper = new Popper(target, this._refs.wrapper, options); // eslint-disable-line no-new
    this._refs.content.classList.add('show');
    this._currentTarget = target;
    this.dispatchEvent(new CustomEvent('show', { detail: target }));
  }

  _clearTimers() {
    if (this._showing) clearTimeout(this._showing);
    if (this._waiting) clearTimeout(this._waiting);
    if (this._hiding) clearTimeout(this._hiding);
  }

  hide() {
    this._clearTimers();
    if (!this._popper) return;
    // First timer allows enough time to move mouse cursor into the tooltip
    this._waiting = setTimeout(() => {
      // Second timer kills the actual tooltip
      this._hiding = setTimeout(() => {
        this._refs.wrapper.classList.remove('show');
        this._popper.destroy();
        this.dispatchEvent(new CustomEvent('hide', { detail: this._currentTarget }));
      }, 100);
      this._refs.content.classList.remove('show');
    }, 75);
  }
}

customElements.define(tag, EDSTooltipElement);
window.EDSTooltipElement = EDSTooltipElement;
