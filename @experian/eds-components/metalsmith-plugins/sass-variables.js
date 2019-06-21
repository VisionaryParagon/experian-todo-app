// Copies sass varaibles file to dist
const debug = require('debug')('plugin:sass-variables');
const fs = require('fs-extra');
const path = require('path');

module.exports = options => (files, metalsmith, done) => {
  if (Object.keys(files).includes('styles/eds-variables.scss')) {
    debug('Copying eds-variables.scss to dist');

    fs.copySync(
      path.resolve(__dirname, '../src/styles/eds-variables.scss'),
      path.resolve(__dirname, '../dist/eds-variables.scss')
    );
  }

  if (Object.keys(files).includes('styles/eds-mixins.scss')) {
    debug('Copying eds-mixins.scss to dist');

    fs.copySync(
      path.resolve(__dirname, '../src/styles/eds-mixins.scss'),
      path.resolve(__dirname, '../dist/eds-mixins.scss')
    );
  }

  done();
};
