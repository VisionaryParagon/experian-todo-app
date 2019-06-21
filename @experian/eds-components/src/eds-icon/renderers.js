/* global FontAwesome */
const materialIconFontRenderer = {
  name: 'material-icon-font',
  render: (val, el, host) => {
    el.classList.add('material-icons');
    el.innerHTML = val;
    // Removes whitespace around material font (rough average)
    // Normalizes size with font-awesome svg
    el.style.transform = 'scale(1.35)';
  }
};

const farSVGRenderer = {
  name: 'far-svg',
  render: (val, el, host) => {
    el.classList.add('far', 'fa-fw', `fa-${val}`);
    const def = FontAwesome.findIconDefinition({prefix: 'far', iconName: val});
    const html = def ? FontAwesome.icon(def).html[0] : '';
    host.shadowRoot.innerHTML = html;
  }
};

const fasSVGRenderer = {
  name: 'fas-svg',
  render: (val, el, host) => {
    el.classList.add('fas', 'fa-fw', `fa-${val}`);
    const def = FontAwesome.findIconDefinition({prefix: 'fas', iconName: val});
    const html = def ? FontAwesome.icon(def).html[0] : '';
    host.shadowRoot.innerHTML = html;
  }
};

export { materialIconFontRenderer, farSVGRenderer, fasSVGRenderer };
