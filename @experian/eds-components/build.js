const Metalsmith = require('metalsmith');
const debug = require('metalsmith-debug');
const watch = require('metalsmith-watch');
const msIf = require('metalsmith-if');
const express = require('./metalsmith-plugins/express.js');
const livereload = require('./metalsmith-plugins/livereload.js');
const autoInclude = require('./metalsmith-plugins/auto-include.js');
const sass = require('./metalsmith-plugins/sass.js');
const webpack = require('./metalsmith-plugins/webpack.js');
const filter = require('./metalsmith-plugins/filter.js');
const docs = require('./metalsmith-plugins/docs.js');
const sassVariables = require('./metalsmith-plugins/sass-variables.js');
const babelStaticHTML = require('./metalsmith-plugins/babel-static-html.js');
const changeHistory = require('./metalsmith-plugins/change-history.js');
const fs = require('fs-extra');
const path = require('path');

function flag(name) {
  return !!Array.from(process.argv).find(arg => arg === `--${name}`);
}

console.log('Building components...\n');

const ms = Metalsmith(__dirname);

ms.source('./src')
  .destination('./local-build')
  .use(debug())
  .use(function(files, metalsmith, done) {
    fs.copySync(
      path.resolve(__dirname, './node_modules/ag-grid-community/dist/ag-grid-community.min.noStyle.js'),
      path.resolve(__dirname, './dist/ag-grid-community.min.noStyle.js')
    );
    done();
  })
  .use(function(files, metalsmith, done) {
    fs.copySync(
      path.resolve(__dirname, './src/change-history.json'),
      path.resolve(__dirname, './dist/change-history.json')
    );
    done();
  })
  .use(autoInclude())
  .use(docs())
  .use(webpack())
  .use(sassVariables())
  .use(sass())
  .use(filter())
  .use(changeHistory())
  .use(babelStaticHTML())
  .use(msIf(flag('dev-server'), livereload()))
  .use(msIf(flag('dev-server'), express()))
  .use(msIf(flag('dev-server'), watch()))
  .build((err, files) => {
    if (err) throw err;
  });
