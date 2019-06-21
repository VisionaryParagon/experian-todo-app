// Starts livereload server
const debug = require('debug')('plugin:change-history');
const match = require('multimatch');
const path = require('path');
const fs = require('fs');
const changeHistory = require(path.resolve(__dirname, '../src/change-history.json'));

module.exports = options => (files, metalsmith, done) => {
  const defaults = { pattern: ['**/change-history.html'] };
  const settings = Object.assign({}, defaults, options);

  match(Object.keys(files), settings.pattern).forEach(file => {
    const data = files[file];

    debug(file);

    data.contents = injectChangeHistory(data.contents.toString('utf8'));
    files[file] = data;
  });

  done();
};

function injectChangeHistory(file) {
  return file.replace(/`{{inject change history}}`/g, JSON.stringify(changeHistory));
}