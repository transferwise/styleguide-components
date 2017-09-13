const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const webpackModule = {
  rules: [{
    test: /\.html$/,
    loader: 'html-loader?root=.'
  },{
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
            entry: './src/form-components.js',
            output: {
              path: path.join(__dirname, './build'),
              filename: 'form-components.webpack.js'
            },
            externals: webpackExternals,
            module: webpackModule
          },{
            entry: './src/form-validation.js',
            output: {
              path: path.join(__dirname, './build'),
              filename: 'form-validation.webpack.js'
            },
            externals: webpackExternals,
            module: webpackModule
          },{
            entry: './src/index.js',
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
                files: ['demo/**/*.less'],
                tasks: ['less']
            },
            components: {
                files: ['src/**/*.js', 'src/**/*.html'],
                tasks: ['jshint', 'eslint', 'webpack', 'uglify', 'copy']
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
                    "demo/css/examples.css": ["demo/**/*.less"]
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
                'src/**/*.html',
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
