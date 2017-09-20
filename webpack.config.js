const path = require('path');

// Inlines templates
const htmlLoader = {
  test: /\.html$/,
  loader: 'html-loader?root=.'
};

// Runs eslint before packaging
const eslintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: [/node_modules/],
  loader: 'eslint-loader'
};

// Runs htmllint before packaging
const htmllintLoader = {
  enforce: 'pre',
  test: /\.html$/,
  exclude: [/node_modules/],
  loader: 'htmllint-loader',
  query: {
    config: '.htmllintrc',
    failOnError: true,
    failOnWarning: false,
  }
};

// Packages our code and processes using babel
const babelLoader = {
  test: /\.js$/,
  exclude: [/node_modules/],
  loader: 'babel-loader'
};

const webpackModule = {
  rules: [
    htmlLoader,
    eslintLoader,
    htmllintLoader,
    babelLoader
  ]
};

const webpackExternals = [{
  'angular': 'angular',
  'angular-mocks': 'angular-mocks'
}];

module.exports = [{
  entry: './src/form-validation.js',
  output: {
    path: path.join(__dirname, './dist/js'),
    filename: 'form-validation.js'
  },
  externals: webpackExternals,
  module: webpackModule
},{
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist/js'),
    filename: 'styleguide-components.js'
  },
  externals: webpackExternals,
  module: webpackModule
}];
