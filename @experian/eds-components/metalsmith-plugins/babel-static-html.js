const debug = require('debug')('plugin:docs');
const babel = require('babel-core');
const fs = require('fs');
const babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));

function processFile(file, content, cb) {
  debug(file);
  cb(content);
}

function transformTags(data) {
  function transform(match, p1, offset, string) {
    if (p1) return match.replace(p1, `\n${babel.transform(p1, babelrc).code}\n`);
    return match;
  }
  data.contents = data.contents.toString('utf8').replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, transform);
}

function plugin() {
  return (files, metalsmith, done) => {
    Object.keys(files).forEach(file => {
      const extension = file.split('.').pop();
      const data = files[file];
      if (extension === 'html') processFile(file, data, transformTags);
    });
    done();
  };
}

module.exports = plugin;