// Filters out matched files (so as not to write them to local-build)
const match = require('multimatch');

// Filter out everything but playground and docs by default
module.exports = options => (files, metalsmith, done) => {
  const defaults = {
    pattern: [
      '**/*',
      '!**/__playground.html',
      '!**/__docs.html',
      '!**examples/*.html',
      '!**guides/*.html'
    ]
  };
  const settings = Object.assign({}, defaults, options);

  // Filter files by the pattern
  const matchedFiles = match(Object.keys(files), settings.pattern);

  matchedFiles.forEach(file => {
    delete files[file];
  });

  done();
};
