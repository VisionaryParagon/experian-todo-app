const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.html']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['raw-loader']
      },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: ['raw-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              autoFixOnSave: true,
              failOnWarning: false,
              failOnError: true,
              fix: true
            }
          }
        ]
      }
    ]
  }
};

exports.common = Object.assign({}, baseConfig, {
  externals:
    ['EDSElement', 'Popper', 'hybrids']
      .map(lib => ({ [lib]: lib }))
      .reduce((libs, lib) => Object.assign({}, libs, lib), {})
});

exports.core = baseConfig;

exports.production = {
  devtool: 'source-map',
  plugins: [new UglifyJSPlugin({ sourceMap: true })]
};
