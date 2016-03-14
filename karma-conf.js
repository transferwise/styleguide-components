module.exports = function(config) {
    config.set({
        //  root path location that will be used to resolve all relative paths in files and exclude sections, should be the root of your project
        basePath : '',

        // files to include, ordered by dependencies
        files : [
            // include relevant Angular files and libs
            'components/angular/angular.js',
            'components/angular-mocks/angular-mocks.js',
            'components/jquery/dist/jquery.js',

            // include js files
            //'angular/**/*.controller.js',
            //'angular/**/*.directive.js',
            'dist/js/styleguide-components.js',

            // include unit test specs
            'angular/**/*.spec.js'
        ],
        // files to exclude
        exclude : [],

        // karma has its own autoWatch feature but Grunt watch can also do this
        autoWatch : false,

        // testing framework, be sure to install the karma plugin
        frameworks: ['jasmine'],

        // browsers to test against, be sure to install the correct karma browser launcher plugin
        browsers : ['PhantomJS', 'Chrome'], // npm install karma-chrome-launcher --save-dev

        // 'progress' is the default reporter
        reporters: ['coverage', 'mocha'],

        // map of preprocessors that is used mostly for plugins
        preprocessors: {
            'angular/**/*.controller.js': ['coverage']
        },

        // list of karma plugins
        plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
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
