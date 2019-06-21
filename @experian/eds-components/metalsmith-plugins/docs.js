// Creates code/example block and adds syntax highlighting
const debug = require('debug')('plugin:docs');
const match = require('multimatch');
const fs = require('fs');
const path = require('path');
const Prism = require('prismjs');
global.self = { Prism, document: {} };
require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-scss');
const prismCss = fs.readFileSync(path.join(__dirname, '..', 'node_modules/prismjs/themes/prism.css'));
const { NormalizeWhitespace } = Prism.plugins;
NormalizeWhitespace.defaults = { 'remove-indent': true };

module.exports = options => (files, metalsmith, done) => {
  const defaults = { pattern: ['**/__docs.html', 'guides/**/*.html'] };
  const settings = Object.assign({}, defaults, options);

  match(Object.keys(files), settings.pattern).forEach(file => {
    const data = files[file];

    debug(file);

    data.contents = preprocessDocs(data.contents.toString('utf8'));
    files[file] = data;
  });

  done();
};

function preprocessDocs(file) {
  const processed = (file.match(/\<doc\-code[^\>]*?(\>|(\s[^\>]*?\>))([\S\s]+?)\<\/doc\-code\>/g) || [])
    .map(el => {
      const tag = el.substring(0, el.indexOf('>') + 1);
      const content = el.substring(el.indexOf('>') + 1, el.indexOf('</doc-code>'));
      const live = !!~tag.indexOf('live');
      const language = (tag.match(/language=['"]?([A-Za-z0-9]+)/) || [])[1] || 'markup';
      return { el, tag, content, live, language };
    })
    .reduce((file, { el, tag, content, live, language }) => {
      const normalized = NormalizeWhitespace.normalize(content).trim();
      const highlighted = Prism.highlight(normalized, Prism.languages[language]);

      let html = `
        ${tag}
          {{live}}
          <div class='code-highlight'><pre data-language='${language}'>${highlighted}</pre></div>
        </doc-code>`;

      const liveHtml = live ? `<div class='code-live'>${content}</div>` : '';

      return file.replace(el, html.replace('{{live}}', liveHtml));
    }, file);

  return `
    <style>${prismCss}</style>
    ${processed}
  `;
}
