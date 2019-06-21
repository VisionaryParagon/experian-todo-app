// Runs webpack
const debug = require('debug')('plugin:webpack');
const match = require('multimatch');
const webpackPromise = require('./webpack-promise.js');

function flag(name) {
  return !!Array.from(process.argv).find(arg => arg === `--${name}`);
}

module.exports = options => (files, metalsmith, done) => {
  const defaults = {
    pattern: [
      'eds-*/index.js',
      'bundles/**/index.js',
      'doc-elements/index.js'
    ]
  };
  const settings = Object.assign({}, defaults, options);
  const promises = [];
  const matchedFiles = match(Object.keys(files), settings.pattern);

  if (matchedFiles.length) {
    metalsmith.metadata({ webpacked: true });
  }

  matchedFiles.forEach(file => {
    debug(file);

    const devBuild = webpackPromise(file);

    if (!flag('production')) {
      devBuild.then((stats) => {
        console.log(stats.toString({ colors: true }) + '\n');
      });
      promises.push(devBuild);

      delete files[file];
    }
  });

  Promise.all(promises).then(stats => done());
};
