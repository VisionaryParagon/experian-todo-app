// Starts express server
const debug = require('debug')('plugin:express');
const serve = require('../dev-server.js');

let initialized = false;

module.exports = options => (files, metalsmith, done) => {
  // Only run plugin once
  if (initialized) {
    done();
    return;
  }

  initialized = true;
  debug('initializing dev-server');
  serve();

  done();
};
