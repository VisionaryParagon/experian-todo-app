const tag = 'eds-slider';
const html = '';
const css = require('./eds-slider.scss');
const MagSlider = require('./svelte-slider').default;

class EDSSliderElement extends EDSElement {
  static get observedAttributes() {
    return EDSSliderElement.normalizeObservedAttributes([
      'min', 'max', 'value',
      { showsteps: 'showSteps' },
      { stepsize: 'stepSize' }
    ]);
  }

  init() {
    this.initShadowDOM(tag, html, css);
  }

  connectedCallback() {
    this.component = new MagSlider({ target: this.shadowRoot });
    this.component.on('valueChange', this.onChange.bind(this));
    this.classList.add('mag-slider');

    // Prevent change event from popover input
    const input1 = this.component.refs.lowValueInput;
    const input2 = this.component.refs.highValueInput;
    if (input1) input1.addEventListener('change', e => { e.stopPropagation(); });
    if (input2) input2.addEventListener('change', e => { e.stopPropagation(); });

    super.connectedCallback();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Hack to allow a cycle for the template to be connected
    setTimeout(() => {
      let attr = {};
      name = EDSSliderElement.attributePropertyMap[name] || name;
      if (name === 'showSteps' && !newValue) newValue = true;
      attr[name] = newValue;
      this.component.set(attr);
    });
  }

  get min() {
    return this.component.get('min');
  }

  set min(value) {
    this.component.set({ min: value });
  }

  get max() {
    return this.component.get('max');
  }

  set max(value) {
    this.component.set({ max: value });
  }

  get showSteps() {
    return this.component.get('showSteps');
  }

  set showSteps(value) {
    this.component.set({ showSteps: value });
  }

  get stepSize() {
    return this.component.get('stepSize');
  }

  set stepSize(value) {
    this.component.set({ stepSize: value });
  }

  get value() {
    return this.component.get('value');
  }

  set value(value) {
    this.component.set({ value });
  }

  onChange(value) {
    if (value !== undefined) this.dispatchEvent(new CustomEvent('change', { detail: value }));
  }
}

customElements.define(tag, EDSSliderElement);
window.EDSSliderElement = EDSSliderElement;
