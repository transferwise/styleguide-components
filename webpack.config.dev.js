const webpackConfig = require('./webpack.config');

const externals = {
  angular: 'angular',
  'angular-mocks': 'angular-mocks'
};

// exclude icons package from webpack `externals` list
const formValidationConfig = webpackConfig[0];
formValidationConfig.externals = [externals];

const componentsConfig = webpackConfig[1];
componentsConfig.externals = [externals];

module.exports = [formValidationConfig, componentsConfig];
