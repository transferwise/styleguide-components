const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Inlines templates
const htmlLoader = {
  test: /\.html$/,
  loader: 'html-loader?root=.'
};

// Less
const lessLoader = {
  test: /\.less$/,
  exclude: [/node_modules/],
  use: ['style-loader', 'css-loader', 'less-loader']
};

// Runs eslint before packaging
const eslintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: [/node_modules/],
  loader: 'eslint-loader'
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
    lessLoader,
    // jshintLoader,
    eslintLoader,
    babelLoader
  ]
};

const webpackExternals = [{
  angular: 'angular',
  'angular-mocks': 'angular-mocks',
  '@transferwise/icons/lib/angular': '""'
}];

const webpackPlugins = [
  new UglifyJSPlugin({
    include: /\.min\.js$/,
    uglifyOptions: {
      ie8: false,
      mangle: true,
      compress: true,
      warnings: false,
      output: {
        beautify: false,
        indent_level: 2
      }
    }
  })
];

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
    'dist/js/json-schema': './src/json-schema/index.js',
    'demo/lib/styleguide-components': './src/index.js',
    'demo/lib/json-schema': './src/json-schema/index.js',
    'demo/lib/demo': './src/demo.js'
  },
  output: {
    path: path.join(__dirname, ''),
    filename: '[name].js'
  },
  externals: webpackExternals,
  module: webpackModule,
  plugins: webpackPlugins,
  devtool: 'inline-source-map'
}];
