// Runs webpack on the scss file's parent directory
const debug = require('debug')('plugin:sass');
const match = require('multimatch');
const webpackPromise = require('./webpack-promise.js');

module.exports = options => (files, metalsmith, done) => {
  // Skip & reset is already webpacked (used for initial run)
  if (metalsmith.metadata().webpacked) {
    debug('skip sass');
    metalsmith.metadata({
      webpacked: false
    });
    done();
    return;
  }

  const defaults = { pattern: ['eds-*/*.scss'] };
  const settings = Object.assign({}, defaults, options);
  const promises = [];

  match(Object.keys(files), settings.pattern).forEach(file => {
    // run webpack on the root eds-*/index.js file for this style
    const index = file.split(/[\/\\]/)[0];

    debug(`running webpack for ${index}`);

    const devBuild = webpackPromise(index);

    devBuild.then((stats) => {
      console.log(stats.toString({ colors: true }) + '\n');
    });
    promises.push(devBuild);
    delete files[file];
  });

  Promise.all(promises).then(stats => done());
};
