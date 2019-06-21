const tag = 'on-first-visible';
const template = `
<api-method name='onFirstVisible'>
  Corrects rendering artifacts that result when this element is initially rendered in a hidden element.

  <doc-note motif='warning'>
    <b>NOTE:</b> In modern browsers you won't need to call this method. Any browser that supports <a href='https://caniuse.com/#feat=intersectionobserver'>IntersectionObserver</a> will call this method automatically when the element first becomes visible. However, if you need to support older browsers you'll need to call this method manually or polyfill <code>IntersectionObserver</code>.
  </doc-note>
</api-method>`;
const css = '';

customElements.define(tag, class _ extends EDSElement {
  init() {
    this.initShadowDOM(tag, template, css);
  }
});
