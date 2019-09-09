const karmaConf = require('./karma.json');
const webpackTestConfig = require('./webpack.test.config.js');

module.exports = function (config) {
  karmaConf.webpack = webpackTestConfig;
  config.set(karmaConf);
};
