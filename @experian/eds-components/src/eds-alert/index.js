import { setEDSValue } from '../eds-core/set-eds-value';
const tag = 'eds-alert';
const html = require('./eds-alert.html');
const css = require('./eds-alert.scss');

const ANIMATION_TRANSITION_MS = 200;
setEDSValue('alerts.defaults.timeout', 8000);
setEDSValue('alerts.create', (html, options) => {
  const alert = document.createElement('eds-alert');
  alert.innerHTML = html;
  Object.keys(options).forEach(key => {
    alert[key] = options[key];
  });
  alert.setAttribute('hidden', true);
  alert.addEventListener('hide', () => alert.destroy());
  document.body.appendChild(alert);
  setTimeout(() => alert.show(), 10);
  return alert;
});

class EDSAlertElement extends EDSElement {
  static get observedAttributes() {
    return EDSAlertElement.normalizeObservedAttributes(
      [{ 'arialabelclose': 'ariaLabelClose' }, 'background', 'closable', 'hidden', 'region', 'timeout', 'motif']
    );
  }

  get defaults() {
    return {
      ariaLabelClose: 'close',
      timeout: window.EDS.alerts.defaults.timeout
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.defineDefaultProperties(['background', 'timeout', 'motif']);
    this.defineFlagProperties(['closable', 'hidden']);

    this._refs = {
      sidebar: this.$('.eds-alert-sidebar'),
      content: this.$('.eds-alert-content'),
      closeIcon: this.$('.eds-alert-close-icon')
    };

    // ensure aria-label for close icon has a label
    this.ariaLabelClose = this.ariaLabelClose;
  }

  connectedCallback() {
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this._addCloseIconHandlers();

    if (this.region) this._appendToRegion();

    super.connectedCallback();
  }

  get ariaLabelClose() {
    return this.getAttribute('arialabelclose') || this.defaults.ariaLabelClose;
  }

  set ariaLabelClose(value) {
    this.setAttribute('arialabelclose', value);
    this._refs.closeIcon.setAttribute('aria-label', value);
  }

  get region() {
    return this.getAttribute('region');
  }

  set region(value) {
    this.setAttribute('region', value);
    // enforce announcement to screen readers:
    this.setAttribute('role', 'alert');
    this._appendToRegion();
  }

  show() {
    // Ensure the alert is visible
    this.removeAttribute('hidden');
    // Kick off a timeout
    this._setTimeout();
    // Trigger a change event after the alert is shown (post css transition)
    setTimeout(() => this.dispatchEvent(new CustomEvent('show')), ANIMATION_TRANSITION_MS);
  }

  hide() {
    // Ensure the alert is hidden
    this.setAttribute('hidden', true);
    // Trigger a change event after the alert is hidden (post css transition)
    setTimeout(() => this.dispatchEvent(new CustomEvent('hide')), ANIMATION_TRANSITION_MS);
  }

  destroy() {
    // Trigger a change event when the alert has been destroyed
    this.dispatchEvent(new CustomEvent('destroy'));
    this.parentNode.removeChild(this);
  }

  // Private methods
  _addCloseIconHandlers() {
    this._refs.closeIcon.addEventListener('click', () => {
      if (this.closable) this.hide();
    });
    this._refs.closeIcon.addEventListener('keydown', e => {
      if (e.key === 'Enter' && this.closable) this.hide();
    });
  }

  _setTimeout() {
    // A timeout only applies to "regional" alerts
    if (this.region) {
      if (this.timeout === 'never') return;
      const timeout = parseInt(this.timeout, 10);
      setTimeout(() => this.hide(), timeout);
    }
  }

  // Wrap alerts from each region in a container
  _appendToRegion() {
    // Ignore attempts to append prior to connectedCallback
    // This method will be called manually at that time
    if (!this.parentNode) return;

    const regionContainerClass = `eds-alert-region-${this.region}`;
    let regionContainer = document.querySelector(`.${regionContainerClass}`);

    // Do nothing if the alert is already in the region
    if (regionContainer && regionContainer.contains(this)) return;

    if (!regionContainer) {
      // Create wrapper container
      regionContainer = document.createElement('div');
      regionContainer.classList.add(regionContainerClass);
      document.body.appendChild(regionContainer);
    }

    // Move this alert element into wrapper (fires connectedCallback)
    if (!this.appending) {
      this.appending = true;
      regionContainer.appendChild(this);
      this.appending = false;
    }
  }
}

customElements.define(tag, EDSAlertElement);
window.EDSAlertElement = EDSAlertElement;
