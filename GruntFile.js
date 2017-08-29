const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const webpackModule = {
  rules: [{
    test: /\.js$/,
    exclude: [/node_modules/],
    loader: 'babel-loader'
  }]
};

const webpackExternals = [{
  angular: 'angular'
}];

module.exports = function(grunt) {

    //dist: require("./webpack.config.js")
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
          options: {},
          build: [{
            entry: './angular/form-components.js',
            output: {
              path: path.join(__dirname, './build'),
              filename: 'form-components.webpack.js'
            },
            externals: webpackExternals,
            module: webpackModule
          },{
            entry: './angular/form-styling.js',
            output: {
              path: path.join(__dirname, './build'),
              filename: 'form-styling.webpack.js'
            },
            externals: webpackExternals,
            module: webpackModule
          },{
            entry: './angular/form-validation.js',
            output: {
              path: path.join(__dirname, './build'),
              filename: 'form-validation.webpack.js'
            },
            externals: webpackExternals,
            module: webpackModule
          },{
            entry: './angular/layout-components.js',
            output: {
              path: path.join(__dirname, './build'),
              filename: 'layout-components.webpack.js'
            },
            externals: webpackExternals,
            module: webpackModule
          },{
            entry: './angular/index.js',
            output: {
              path: path.join(__dirname, './build'),
              filename: 'styleguide-components.webpack.js'
            },
            externals: webpackExternals,
            module: webpackModule
          }]
        },
        watch: {
            less: {
                files: ['styles/**/*.less'],
                tasks: ['less']
            },
            components: {
                files: ['angular/**/*.js'],
                tasks: ['webpack', 'uglify', 'jshint']
            },
            templates: {
                files: ['angular/**/*.html'],
                tasks: ['copy']
            }
        },
        uglify: {
            validation: {
                src: [
                    'build/form-validation.webpack.js'
                ],
                dest: 'dist/js/form-validation.js',
                options: {
                    mangle: false,
                    beautify: true
                }
            },
            validationMin: {
                src: [
                    'build/form-validation.webpack.js'
                ],
                dest: 'dist/js/form-validation.min.js',
                options: {
                    mangle: true,
                    beautify: false
                }
            },
            styling: {
                src: [
                    'build/form-styling.webpack.js'
                ],
                dest: 'dist/js/form-styling.js',
                options: {
                    mangle: false,
                    beautify: true
                }
            },
            stylingMin: {
                src: [
                    'build/form-styling.webpack.js'
                ],
                dest: 'dist/js/form-styling.min.js',
                options: {
                    mangle: true,
                    beautify: false
                }
            },
            formComponents: {
                src: [
                    'build/form-components.webpack.js'
                ],
                dest: 'dist/js/form-components.js',
                options: {
                    mangle: false,
                    beautify: true
                }
            },
            formComponentsMin: {
                src: [
                    'build/form-components.webpack.js'
                ],
                dest: 'dist/js/form-components.min.js',
                options: {
                    mangle: true,
                    beautify: false
                }
            },
            layoutComponents: {
                src: [
                    'build/layout-components.webpack.js'
                ],
                dest: 'dist/js/layout-components.js',
                options: {
                    mangle: false,
                    beautify: true
                }
            },
            layoutComponentsMin: {
                src: [
                    'build/layout-components.webpack.js'
                ],
                dest: 'dist/js/layout-components.min.js',
                options: {
                    mangle: true,
                    beautify: false
                }
            },
            combined: {
                src: [
                    'build/styleguide-components.webpack.js'
                ],
                dest: 'dist/js/styleguide-components.js',
                options: {
                    mangle: false,
                    beautify: true
                }
            },
            combinedMin: {
                src: [
                    'build/styleguide-components.webpack.js'
                ],
                dest: 'dist/js/styleguide-components.min.js',
                options: {
                    mangle: true,
                    beautify: false
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: [""]
                },
                files: {
                    "styles/examples.css": ["styles/**/*.less"]
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                esversion: 6,
                globals: {
                    jQuery: true,
                    console: true
                },
                '-W099': true, // allow mix tabs and spaces
                '-W014': true, // allow ++
                '-W043': true, // parseInt without radix parameter
                '-W065': true  // allow \n for line endings
            },
            files: [
                'angular/**/*.component.js',
                'angular/**/*.controller.js',
                'angular/**/*.directive.js',
                'angular/**/*.service.js'
            ]
        },
        htmllint: {
            options: {
                "attr-name-ignore-regex": "{{.*?}}",
                "attr-name-style": false,
                "label-req-for": false,
                "attr-req-value": false,
                "id-class-style": false,
                "line-end-style": false,
                "indent-style": false,
                "indent-width": false
            },
            files: [
                'angular/**/*.html',
                'partials/**/*.html',
                'index.html'
            ]
        },
        karma: {
            options: {
                configFile: 'karma-conf.js'
            },
            unit: {
                singleRun: true
            }
        },
        copy: {
            dist: {
              expand: true,
              src: 'dist/**/*.*',
              dest: 'gh-pages/'
            },
            partials: {
              expand: true,
              src: 'partials/*',
              dest: 'gh-pages/'
            },
            styles: {
              expand: true,
              src: 'styles/*',
              dest: 'gh-pages/'
            },
            images: {
              expand: true,
              src: 'images/*',
              dest: 'gh-pages/'
            },
            components: {
              expand: true,
              src: 'components/**/*.*',
              dest: 'gh-pages/'
            },
            index: {
              expand: true,
              src: 'index.*',
              dest: 'gh-pages/'
            },
        }
    });

    // === LOAD PLUGINS ===
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-htmllint');
    grunt.loadNpmTasks("grunt-webpack");

    // === REGISTER TASKS ===
    grunt.registerTask('default', ['jshint', 'webpack', 'uglify', 'less', 'htmllint', 'copy', 'watch']);
    grunt.registerTask('build', ['jshint', 'webpack', 'uglify', 'less', 'htmllint', 'copy']);
};
