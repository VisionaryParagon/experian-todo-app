const { expect } = require('chai');
const puppeteer = require('puppeteer');

describe('EDSElement', () => {
  let browser;

  beforeEach(() => {
    return puppeteer
      .launch({ headless: true })
      .then(b => browser = b);
  });

  afterEach(() => browser.close());

  describe('properties', () => {
    describe('standard', () => {
      const tag = 'eds-standard-property-test';

      it('should return the value of the corresponding attribute', () => {
        const { createElement, inspectElement } = initialize(tag, { standard: ['value'] });

        const expected = 'hello';

        return browser
          .newPage()
          .then(createElement(`<${tag} value="${expected}"></${tag}>`))
          .then(inspectElement(el => el.value))
          .then(actual => expect(actual).to.equal(expected));
      });

      it('should set the value of the corresponding attribute', () => {
        const { createElement, changeElement, inspectElement } = initialize(tag, { standard: ['type'] });

        return browser
          .newPage()
          .then(createElement(`<${tag} type="not expected"></${tag}>`))
          .then(changeElement(el => el.type = 'expected'))
          .then(inspectElement(el => el.getAttribute('type')))
          .then(actual => expect(actual).to.equal('expected'));
      });

      it('should reflect changes in the attribute value', () => {
        const { createElement, changeElement, inspectElement } = initialize(tag, { standard: ['motif'] });

        return browser
          .newPage()
          .then(createElement(`<${tag} motif="primary"></${tag}>`))
          .then(changeElement(el => el.setAttribute('motif', 'tertiary')))
          .then(inspectElement(el => el.motif))
          .then(actual => expect(actual).to.equal('tertiary'));
      });
    });

    describe('flag', () => {
      const tag = 'eds-flag-property-test';

      it('should return false when the attribute is not present', () => {
        const { createElement, inspectElement } = initialize(tag, { flag: ['required'] });

        return browser
          .newPage()
          .then(createElement(`<${tag}></${tag}>`))
          .then(inspectElement(el => el.required))
          .then(actual => expect(actual).to.be.false);
      });

      it('should return true when the attribute is present', () => {
        const { createElement, inspectElement } = initialize(tag, { flag: ['disabled'] });

        return browser
          .newPage()
          .then(createElement(`<${tag} disabled></${tag}>`))
          .then(inspectElement(el => el.disabled))
          .then(actual => expect(actual).to.be.true);
      });

      it('should add the attribute when set to true', () => {
        const { createElement, changeElement, inspectElement } = initialize(tag, { flag: ['required'] });

        return browser
          .newPage()
          .then(createElement(`<${tag}></${tag}>`))
          .then(changeElement(el => el.required = true))
          .then(inspectElement(el => el.hasAttribute('required')))
          .then(actual => expect(actual).to.be.true);
      });

      it('should remove the attribute when set to false', () => {
        const { createElement, changeElement, inspectElement } = initialize(tag, { flag: ['awesome'] });

        return browser
          .newPage()
          .then(createElement(`<${tag} awesome></${tag}>`))
          .then(changeElement(el => el.awesome = false))
          .then(inspectElement(el => el.hasAttribute('awesome')))
          .then(actual => expect(actual).to.be.false);
      });

      it('should set the property to true when the attribute is added', () => {
        const { createElement, changeElement, inspectElement } = initialize(tag, { flag: ['terrific'] });

        return browser
          .newPage()
          .then(createElement(`<${tag}></${tag}>`))
          .then(changeElement(el => el.setAttribute('terrific', '')))
          .then(inspectElement(el => el.terrific))
          .then(actual => expect(actual).to.be.true);
      });

      it('should set the property to false when the attribute is removed', () => {
        const { createElement, changeElement, inspectElement } = initialize(tag, { flag: ['wipeout'] });

        return browser
          .newPage()
          .then(createElement(`<${tag} wipeout></${tag}>`))
          .then(changeElement(el => el.removeAttribute('wipeout')))
          .then(inspectElement(el => el.wipeout))
          .then(actual => expect(actual).to.be.false);
      });
    });

    function initialize(tag, properties) {
      return { createElement, changeElement, inspectElement };

      function createElement(template) {
        const defineProperties = Object
          .keys(properties)
          .map(k => `this.${methodForType(k)}(${JSON.stringify(properties[k])});`)
          .join('');

        function methodForType(type) {
          switch (type) {
            case 'flag':
              return 'defineFlagProperties';
            case 'standard':
              return 'defineDefaultProperties';
          }
        }

        const fakeElement = `
          customElements.define('${tag}', class _ extends EDSElement {
            init() {
              ${defineProperties}
              this.initShadowDOM('${tag}', '<div>${tag} element</div>');
            }
          });
        `;

        return function (page) {
          return page
            .setContent(template)
            .then(() => page.addScriptTag({ path: 'dist/eds-core.js' }))
            .then(() => page.addScriptTag({ content: fakeElement }))
            .then(() => page);
        };
      }

      function changeElement(mutation) {
        return function (page) {
          return page
            .$eval(tag, mutation)
            .then(() => page);
        };
      }

      function inspectElement(inspect) {
        return function (page) {
          return page.$eval(tag, inspect);
        };
      }
    }
  });
});
