import { valueOr } from '../eds-core/value-or';
const tag = 'eds-progress';
const html = require('./eds-progress.html');
const css = require('./eds-progress.scss');

class EDSProgressElement extends EDSElement {
  static get observedAttributes() {
    return EDSProgressElement.normalizeObservedAttributes([
      'max', 'value', 'motif',
      { baselinevalue: 'baselineValue' }
    ]);
  }

  get defaults() {
    return {
      baselineValue: 0,
      max: 1
    };
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this._refs = {
      baseFill: this.$('.eds-progress-baseline-fill'),
      fill: this.$('.eds-progress-fill'),
      indeterminate: this.$('.eds-progress-indeterminate')
    };
  }

  connectedCallback() {
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', 0);
    this.setAttribute('aria-valuemax', this.max);
    super.connectedCallback();
  }

  get max() {
    return valueOr(this._max, this.defaults.max);
  }

  set max(value) {
    if (value < 0) throw Error('max must be greater than zero');
    this._max = parseFloat(value);
    this.setAttribute('max', value);
    this.setAttribute('aria-valuemax', value);
    this._refresh();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = parseFloat(value);

    if (isNaN(this._value)) {
      this._refs.indeterminate.style.display = 'block';
      this.removeAttribute('value');
      this.removeAttribute('aria-valuenow');
    } else {
      this._refs.indeterminate.style.display = 'none';
      // Follow native <progress> behavior, auto set value when out of bounds
      if (this._value > this.max) this._value = this.max;
      if (this._value < 0) this._value = 0;
      this.setAttribute('value', this._value);
      this.setAttribute('aria-valuenow', this._value);
    }

    this._refresh();
  }

  get baselineValue() {
    return valueOr(this._baselineValue, this.defaults.baselineValue);
  }

  set baselineValue(value) {
    this._baselineValue = parseFloat(value);

    if (isNaN(this._baselineValue)) this._baselineValue = 0;
    this.setAttribute('baselineValue', this._baselineValue);
    // Follow native <progress> behavior, auto set value when out of bounds
    if (this._baselineValue > this.max) this._baselineValue = this.max;
    if (this._baselineValue < 0) this._baselineValue = 0;
    this._refresh();
  }

  _refresh() {
    this._refs.baseFill.style.width = `${(this.baselineValue / this.max) * 100}%`;
    this._refs.fill.style.width = `${(this.value / this.max) * 100}%`;
  }
}

customElements.define(tag, EDSProgressElement);
window.EDSProgressElement = EDSProgressElement;
