const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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

// Runs eslint before packaging
const jshintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: [/node_modules/],
  loader: 'jshint-loader'
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
    // jshintLoader,
    eslintLoader,
    htmllintLoader,
    babelLoader
  ]
};

const webpackExternals = [{
  angular: 'angular',
  'angular-mocks': 'angular-mocks',
  react: 'react',
  'react-dom': 'react-dom'
}];

const webpackPlugins = [
  new UglifyJSPlugin({
    include: /\.min\.js$/,
    ie8: false,
    ecma: 6,
    mangle: true,
    output: {
      beautify: false,
      indent_level: 2
    },
    compress: true,
    warnings: false
  })
];

const reactExternals = [{
  angular: 'angular',
  'angular-mocks': 'angular-mocks',
  react: 'react'
}];

module.exports = [{
  entry: './src/form-validation.js',
  output: {
    path: path.join(__dirname, './dist/js'),
    filename: 'form-validation.js'
  },
  externals: webpackExternals,
  module: webpackModule
},
{
  entry: {
    'dist/js/styleguide-components': './src/index.js',
    'dist/js/styleguide-components.min': './src/index.js',
    'demo/lib/styleguide-components': './src/index.js',
    'demo/lib/demo': './src/demo.js'
  },
  output: {
    path: path.join(__dirname, ''),
    filename: '[name].js'
  },
  externals: webpackExternals,
  module: webpackModule,
  plugins: webpackPlugins
},
{
  entry: {
    'demo/lib/react-components': './src/react.js'
  },
  output: {
    path: path.join(__dirname, ''),
    filename: '[name].js'
  },
  externals: webpackExternals,
  module: webpackModule,
  plugins: webpackPlugins
}];
