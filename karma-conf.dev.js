let karmaConf = require('./karma.json');

karmaConf.plugins = [
  "karma-phantomjs-launcher",
  "karma-chrome-launcher",
  "karma-firefox-launcher",
  "karma-safari-launcher",
  "karma-jasmine",
  "karma-coverage",
  "karma-mocha-reporter"
];

karmaConf.browsers = [
  "PhantomJS",
  "Chrome",
  "Firefox",
  "Safari"
];

module.exports = function(config) {
  config.set(karmaConf);
};
