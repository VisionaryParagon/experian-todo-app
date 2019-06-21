import APIElement from './api-element';
const tag = 'api-event';
const template = `
  <span class='api-name name event-name'></span>
  &rarr;
  <span class='type event-type'>CustomEvent</span>
  <span class='detail event-detail'>null</span>
  <span class='deprecated'></span>
`;

customElements.define(tag, class _ extends APIElement {
  init() {
    super.init();
    this.initShadowDOM(tag, this.getTemplate(template));
  }
});
