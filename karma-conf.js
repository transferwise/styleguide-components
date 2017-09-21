module.exports = function(config) {
  config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections, should be the root of your project
    basePath : '',

    // files to include, ordered by dependencies
    files : [
      // include relevant Angular files and libs
      'demo/lib/jquery.min.js',
      'demo/lib/bootstrap.min.js',
      'demo/lib/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',

      // include js files
      'dist/js/styleguide-components.js',

      // 'dist/lib/bootstrap.css',

      // include unit test specs
      'src/**/*.spec.js'
    ],
    // files to exclude
    exclude : [],

    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : false,

    // testing framework, be sure to install the karma plugin
    frameworks: ['jasmine'],

    // browsers to test against, be sure to install the correct karma browser launcher plugin
    browsers : [
      'PhantomJS',
      'Chrome',
      'Firefox',
      'Safari'
    ],

    // 'progress' is the default reporter
    reporters: ['coverage', 'mocha'],

    // map of preprocessors that is used mostly for plugins
    preprocessors: {
        'src/**/*.controller.js': ['coverage']
    },

    // list of karma plugins
    plugins : [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-mocha-reporter'
    ],
    // add plugin settings
    coverageReporter: {
      reporters: [{
        // type of file to output, text outputs to console
        type : 'text',
        dir: 'build/coverage/',
        file: 'coverage.txt'
      },{
        // xml with line number information
        type : 'cobertura',
        dir: 'build/coverage/',
        file: 'coverage.xml'
      }]
    },

    mochaReporter: {
      output: 'minimal'
    }
  });
};
