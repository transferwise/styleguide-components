const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const webpackModule = {
  rules: [{
    test: /\.html$/,
    loader: 'html-loader?root=.'
  },
  /*{
    enforce: 'pre',
    test: /\.js$/,
    exclude: [/node_modules/],
    loader: 'eslint-loader'
  },{
    enforce: 'pre',
    test: /\.html$/,
    exclude: [/node_modules/],
    loader: 'htmllint-loader',
    query: {
      config: '.htmllintrc',
      failOnError: true,
      failOnWarning: false,
    }
  },*/
  {
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
            entry: './src/form-validation.js',
            output: {
              path: path.join(__dirname, './dist/js'),
              filename: 'form-validation.js'
            },
            externals: webpackExternals,
            module: webpackModule
          },{
            entry: './src/index.js',
            output: {
              path: path.join(__dirname, './dist/js'),
              filename: 'styleguide-components.js'
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
                files: ['src/**/*.js', 'src/**/*.html'],
                tasks: ['jshint', 'eslint', 'webpack', 'uglify', 'copy']
            }
        },
        uglify: {
            validationMin: {
                src: [
                    'dist/js/form-validation.js'
                ],
                dest: 'dist/js/form-validation.min.js',
                options: {
                    mangle: true,
                    beautify: false
                }
            },
            combinedMin: {
                src: [
                    'dist/js/styleguide-components.js'
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
                    "demo/css/examples.css": ["demo/css/*.less"]
                }
            }
        },
        eslint: {
          options: {
            config: ".eslintrc",
          },
          src: [
            'src/**/*.component.js',
            'src/**/*.controller.js',
            'src/**/*.directive.js',
            'src/**/*.service.js'
          ]
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
                '-W099': true, // allow a mix of tabs and spaces
                '-W014': true, // allow ++
                '-W043': true, // parseInt without radix parameter
                '-W065': true  // allow \n for line endings
            },
            files: [
                'src/**/*.component.js',
                'src/**/*.controller.js',
                'src/**/*.directive.js',
                'src/**/*.service.js'
            ]
        },
        htmllint: {
            options: {
                htmllintrc: true
            },
            files: [
                'src/**/*.html',
                'demo/**/*.html'
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
            demoJS: {
              expand: true,
              flatten: true,
              src: [
                'node_modules/jquery/dist/jquery.js',
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/angular/angular.js',
                'node_modules/angular/angular.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'dist/js/styleguide-components.js'
              ],
              dest: 'demo/lib/'
            },
            demoCSS: {
              expand: true,
              flatten: true,
              src: [
                'node_modules/bootstrap/dist/css/bootstrap.css',
                'node_modules/bootstrap/dist/css/bootstrap.css.map',
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/currency-flags/dist/currency-flags.css'
              ],
              dest: 'demo/lib/'
            },
            demoFonts: {
              expand: true,
              flatten: true,
              src: [
                'node_modules/bootstrap/fonts/*.*',
                'node_modules/iconfont/fonts/*.*',
              ],
              dest: 'demo/fonts/'
            },
            ghPages: {
              expand: true,
              src: 'demo/**/*.*',
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
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-htmllint');
    grunt.loadNpmTasks("grunt-webpack");

    // === REGISTER TASKS ===
    grunt.registerTask('default', ['jshint', 'eslint', 'webpack', 'uglify', 'less', 'htmllint', 'copy', 'watch']);
    grunt.registerTask('build', ['jshint', 'eslint', 'webpack', 'uglify', 'less', 'htmllint', 'copy']);
};
