const template = `
  <div class="api-item-container">
    <div class="api-item">
      {{replace}}
    </div>
    <div class="summary"><slot></slot></div>
    <div class="clear"></div>
  </div>
`;

export default class APIElement extends EDSElement {
  static get observedAttributes() {
    return APIElement.normalizeObservedAttributes([
      'name', 'type', 'default', 'args', 'required', 'deprecated', 'detail',
      { returntype: 'returnType' },
      { attributeonly: 'attributeOnly' },
      { propertyonly: 'propertyOnly' },
      { readonly: 'readOnly' }
    ]);
  }

  init() {
    this.template = template;
  }

  connectedCallback() {
    const el = this.shadowRoot.querySelector('.api-item-container .api-item');
    el.addEventListener('click', this.onItemClick.bind(this));

    super.connectedCallback();
  }

  getTemplate(html) {
    return this.template.replace('{{replace}}', html);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const el = this.shadowRoot.querySelector(`.${name}`);
    if (el) el.innerHTML = newValue;
    this[name] = newValue;
  }

  set deprecated(val) {
    const el = this.shadowRoot.querySelector('.deprecated');
    if (!el) return;
    el.innerHTML = 'DEPRECATED';
    el.style.display = 'inline-block';
  }

  set required(val) {
    const el = this.shadowRoot.querySelector('.required');
    if (!el) return;
    el.innerHTML = '(required)';
    el.style.display = 'inline-block';
  }

  onItemClick() {
    const el = this.shadowRoot.querySelector('.api-item-container');
    el.classList.toggle('expanded');
  }

  expand() {
    const el = this.shadowRoot.querySelector('.api-item-container');
    el.classList.add('expanded');
  }

  collapse() {
    const el = this.shadowRoot.querySelector('.api-item-container');
    el.classList.remove('expanded');
  }
}
