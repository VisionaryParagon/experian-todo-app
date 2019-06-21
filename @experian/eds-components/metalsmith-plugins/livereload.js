// Starts livereload server
const debug = require('debug')('plugin:livereload');
const livereload = require('livereload');
const path = require('path');
const fs = require('fs');

let initialized = false;
let defaultPort = 35729;

const createServer = (port) => {
  return new Promise(resolve => {
    const server = livereload.createServer({ port }, () => {
      debug(`server listening on ${server.config.port}`);
      resolve(server);
    });
    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        const nextPort = parseInt(server.config.port + 1, 10);
        debug(`${server.config.port} in use, trying ${nextPort}...`);
        createServer(nextPort).then(server => resolve(server));
      }
    });
  });
};

module.exports = options => (files, metalsmith, done) => {
  // Only run plugin once
  if (initialized) {
    done();
    return;
  }

  const defaults = {
    pattern: ['*'],
    watch: [
      path.join(__dirname, '..', 'local-build'),
      path.join(__dirname, '..', 'dist')
    ]
  };
  const settings = Object.assign({}, defaults, options);

  debug(`initializing livereload server on port ${defaultPort}`);
  createServer(defaultPort).then(server => {
    initialized = true;
    debug(`server watching for changes in:`);
    debug(settings.watch);
    server.watch(settings.watch);

    // Make port number available to index.html
    fs.writeFileSync('livereload-port', server.config.port);
    done();
  });
};
