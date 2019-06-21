import { setEDSValue } from '../eds-core/set-eds-value';
import './eds-step';

const tag = 'eds-step-sequence';
const html = require('./eds-step-sequence.html');
const css = require('./eds-step-sequence.scss');

setEDSValue('stepSequence.defaults.previousStepARIALabel', 'previous');
setEDSValue('stepSequence.defaults.currentStepARIALabel', 'current');
setEDSValue('stepSequence.defaults.nextStepARIALabel', 'next');

class EDSStepSequenceElement extends EDSElement {
  static get observedAttributes() {
    return EDSStepSequenceElement.normalizeObservedAttributes([
      { previoussteparialabel: 'previousStepARIALabel' },
      { currentsteparialabel: 'currentStepARIALabel' },
      { nextsteparialabel: 'nextStepARIALabel' }
    ]);
  }

  init() {
    this.initShadowDOM(tag, html, css);
    this.setAttribute('role', 'tablist');

    this._refs = {
      previousStepLabel: this.$('.eds-previous-step-label'),
      currentStepLabel: this.$('.eds-current-step-label'),
      nextStepLabel: this.$('.eds-next-step-label')
    };

    // Ensure values
    this.previousStepARIALabel = this.previousStepARIALabel;
    this.currentStepARIALabel = this.currentStepARIALabel;
    this.nextStepARIALabel = this.nextStepARIALabel;

    this.$('slot').addEventListener('slotchange', this._handleSlottedChildren.bind(this));
  }

  get defaults() {
    return {
      previousStepARIALabel: window.EDS.stepSequence.defaults.previousStepARIALabel,
      currentStepARIALabel: window.EDS.stepSequence.defaults.currentStepARIALabel,
      nextStepARIALabel: window.EDS.stepSequence.defaults.nextStepARIALabel
    };
  }

  _handleSlottedChildren() {
    this._setARIALabels();
  }

  _setARIALabels() {
    let state = 'previous';
    let label = this.previousStepARIALabel;

    Array.from(this.querySelectorAll('eds-step')).forEach(el => {
      if (el.active) state = 'current';
      if (state === 'current') {
        label = this.currentStepARIALabel;
        state = 'next';
      } else if (state === 'next') {
        label = this.nextStepARIALabel;
      }

      el.setAttribute('aria-label', [el.innerHTML, label].join(', '));
    });
  }

  _getLabel(which) {
    return this.getAttribute(which) || this.defaults[which];
  }

  _setLabel(which, value) {
    this.setAttribute(which, value);
    this._setARIALabels();
  }

  get previousStepARIALabel() {
    return this._getLabel('previousStepARIALabel');
  }

  set previousStepARIALabel(value) {
    this._setLabel('previousStepARIALabel', value);
  }

  get currentStepARIALabel() {
    return this._getLabel('currentStepARIALabel');
  }

  set currentStepARIALabel(value) {
    this._setLabel('currentStepARIALabel', value);
  }

  get nextStepARIALabel() {
    return this._getLabel('nextStepARIALabel');
  }

  set nextStepARIALabel(value) {
    this._setLabel('nextStepARIALabel', value);
  }
};

customElements.define(tag, EDSStepSequenceElement);
window.EDSStepSequenceElement = EDSStepSequenceElement;
