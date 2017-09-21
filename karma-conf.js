let karmaConf = require('./karma.json');

karmaConf.plugins = [
  "karma-phantomjs-launcher",
  "karma-jasmine",
  "karma-coverage",
  "karma-mocha-reporter"
];

karmaConf.browsers = [
  "PhantomJS",
]

module.exports = function(config) {
  config.set(karmaConf);
};
