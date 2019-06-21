import APIElement from './api-element';
const tag = 'api-method';
const template = `
  <span class='api-name name'></span>
  <span>(</span><span class='method-args'></span><span>) :</span>
  <span class='method-return-type returnType'>void</span>
  <span class='deprecated'></span>
`;

customElements.define(tag, class _ extends APIElement {
  init() {
    super.init();
    this.initShadowDOM(tag, this.getTemplate(template));
  }

  set args(val) {
    const el = this.shadowRoot.querySelector('.method-args');
    el.innerHTML = this.formatArgs(val);
  }

  formatArgs(args) {
    if (!args.length) return [];
    let arrayArgs = args.split(',');
    arrayArgs = arrayArgs.map(arg => {
      if (arg.length) {
        let html = arg.trim().split(':');
        if (html.length) return `<span class='method-arg'>${html[0]}</span> : <span class='method-arg-type'>${html[1]}</span>`;
        return `<span class='method-arg'>${html[0]}</span>`;
      }
      return arg;
    });

    return arrayArgs.join(', ');
  }
});
