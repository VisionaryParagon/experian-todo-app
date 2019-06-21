const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { core: webpackCoreConfig, common: webpackConfig, production: webpackProductionConfig } = require('../webpack.config');

// TODO: Node 8+ has its own util.promisify, but we can't use it yet due to SASS incompatibility.
//       See https://github.com/sass/node-sass/releases/tag/v4.3.0.
const util = {
  promisify(fn) {
    return function () {
      const args = Array.from(arguments);
      return new Promise(function (resolve, reject) {
        args.push(function (err, result) {
          err ? reject(err) : resolve(result);
        });

        fn.apply(null, args);
      });
    };
  }
};

function flag(name) {
  return !!Array.from(process.argv).find(arg => arg === `--${name}`);
}

module.exports = file => {
  let filename = file.replace(/[\/\\]index\.js/, '');
  const context = path.join(path.join(__dirname, '..', 'src'), filename);
  let config = null;
  if (filename.indexOf('core') !== -1) {
    config = webpackMerge(webpackCoreConfig, { context });
  } else {
    config = webpackMerge(webpackConfig, { context });
  }
  const webpackPromise = util.promisify(webpack);

  // If the item is a bundle use a suffix to denote this - differentiating it from single components
  if (file.indexOf('bundles') > -1) filename += '-bundle';

  const devBuild = webpackPromise(webpackMerge(config, { output: { filename: `${filename}.js` } }));

  if (!flag('production')) return devBuild;

  const prodConfig = webpackMerge(config, webpackProductionConfig, { output: { filename: `${filename}.min.js` } });
  const prodBuild = webpackPromise(prodConfig);

  return Promise.all([devBuild, prodBuild]);
};
