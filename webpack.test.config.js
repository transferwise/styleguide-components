const webpack = require('webpack');
const path = require('path');

/**
 * Helper functions.
 */
var ROOT = path.resolve(__dirname, '..');

const helpers = { root: path.join.bind(path, ROOT) };

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
    modules: [helpers.root('src'), 'node_modules']
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'sourcemap-loader',
      //   exclude: [
      //     helpers.root('node_modules/angular')
      //   ]
      // },
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true },
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader'],
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        enforce: 'post',
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        },
        include: helpers.root('src'),
        exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test')
    }),
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)f?esm5/, path.join(__dirname, './src')
    )
  ],
  performance: {
    hints: false
  },
  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    fs: 'empty'
  }
};
