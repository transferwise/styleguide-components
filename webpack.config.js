const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Inlines templates
const htmlLoader = {
  test: /\.html$/,
  use: {
    loader: 'html-loader?root=.',
  },
};

// Runs eslint before packaging
const eslintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: [/node_modules/],
  use: {
    loader: 'eslint-loader',
  },
};

// Runs htmllint before packaging
const htmllintLoader = {
  enforce: 'pre',
  test: /\.html$/,
  exclude: [/node_modules/],
  use: [
    {
      loader: 'htmllint-loader',
      query: {
        config: '.htmllintrc',
        failOnError: true,
        failOnWarning: false,
      },
    },
  ],
};

const lessLoader = {
  test: /\.less$/,
  use: [
    {
      loader: 'style-loader', // creates style nodes from JS strings
    },
    {
      loader: 'css-loader', // translates CSS into CommonJS
    },
    {
      loader: 'less-loader', // compiles Less to CSS
    },
  ],
};

// Packages our code and processes using babel
const babelLoader = {
  test: /\.js$/,
  exclude: [/node_modules/],
  use: {
    loader: 'babel-loader',
  },
};

const webpackModule = {
  rules: [htmlLoader, eslintLoader, htmllintLoader, lessLoader, babelLoader],
};

const webpackPlugins = [
  new UglifyJSPlugin({
    include: /\.min\.js$/,
    uglifyOptions: {
      ecma: 6,
      output: {
        beautify: false,
        indent_level: 2,
      },
    },
  }),
];

const webpackExternals = [
  {
    angular: 'angular',
    'angular-mocks': 'angular-mocks',
    '@transferwise/icons': '"@transferwise/icons"'
  },
];

module.exports = [
  {
    entry: './src/form-validation.js',
    output: {
      path: path.join(__dirname, './dist/js'),
      filename: 'form-validation.js',
    },
    externals: webpackExternals,
    module: webpackModule,
  },
  {
    entry: {
      'dist/js/styleguide-components': './src/index.js',
      'dist/js/styleguide-components.min': './src/index.js',
    },
    output: {
      path: path.join(__dirname, ''),
      filename: '[name].js',
    },
    externals: webpackExternals,
    module: webpackModule,
    plugins: webpackPlugins,
  },
  {
    entry: {
      'demo/lib/styleguide-components': './src/index.js',
      'demo/lib/demo': './src/demo.js',
    },
    output: {
      path: path.join(__dirname, ''),
      filename: '[name].js',
    },
    externals: [
      {
        angular: 'angular',
        'angular-mocks': 'angular-mocks'
      },
    ],
    module: webpackModule,
    plugins: webpackPlugins,
  },
];
