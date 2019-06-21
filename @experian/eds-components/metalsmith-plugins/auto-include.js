// Automatically includes all eds component scripts
const debug = require('debug')('plugin:auto-include');
const match = require('multimatch');
const fs = require('fs');
const path = require('path');

module.exports = options => (files, metalsmith, done) => {
  const defaults = {
    pattern: [
      '**/__playground.html',
      '**/__docs.html',
      '*guides/*.html'
    ]
  };
  const settings = Object.assign({}, defaults, options);

  let scripts = [];
  fs.readdirSync(path.join(__dirname, '..', 'src')).forEach(file => {
    scripts.push(`${file}.js`);
  });

  scripts = match(scripts, ['eds-*', '!eds-core*']);
  scripts.unshift('eds-core.js');

  // Filter files by the pattern
  const matchedFiles = match(Object.keys(files), settings.pattern);

  matchedFiles.forEach(file => {
    const data = files[file];

    debug(file);

    let html = `<!DOCTYPE html>\n<base href="/dist/" />\n`;
    html += `<script>window.EDS = { hideUntilReady: true };</script>`;
    scripts.forEach(script => {
      html += `<script src='${script}'></script>\n`;
    });

    if (file.match('__docs.html') || file.match('guides/')) {
      html += "<script src='doc-elements.js'></script>\n";

      // Also retarget links
      if (file.match('guides/')) {
        data.contents += `
          <script>
            document.querySelectorAll('a').forEach(function(el) {
              if (!el.hasAttribute('target')) el.setAttribute('target', '_parent');
            });
          </script>
        `;
      }
    }

    // Add base styles for iframes
    html += `<style>
      body {
        margin: 32px 36px 64px;
        max-width: 820px;
      }
      @import "/node_modules/typeface-roboto/index.css";
    </style>`;

    data.contents = html + data.contents;
    files[file] = data;
  });

  done();
};
