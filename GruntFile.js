module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            less: {
                files: ['app/**/*.css', 'app/**/*.less'],
                tasks: ['less']
            },
            components: {
                files: ['angular/**/*.js'],
                tasks: ['uglify', 'jshint']
            },
            templates: {
                files: ['angular/**/*.html'],
                tasks: ['copy']
            }
        },
        uglify: {
            components: {
                src: ['angular/**/*.controller.js', 'angular/**/*.directive.js'],
                dest: 'dist/js/styleguide-components.js',
                options: {
                    banner: 'angular.module("tw.form-validation", []);\n' +
                        'angular.module("tw.form-styling", []);\n' +
                        'angular.module("tw.form-components", []);\n' +
                        'angular.module("tw.styleguide-components", [\'tw.form-validation\', \'tw.form-styling\', \'tw.form-components\']);\n',
                    mangle: false,
                    beautify: true
                }
            },
            componentsMin: {
                src: ['angular/**/*.controller.js', 'angular/**/*.directive.js'],
                dest: 'dist/js/styleguide-components.min.js',
                options: {
                    banner: 'angular.module("tw.form-validation", []);\n' +
                        'angular.module("tw.form-styling", []);\n' +
                        'angular.module("tw.form-components", []);\n' +
                        'angular.module("tw.styleguide-components", [\'tw.form-validation\', \'tw.form-styling\', \'tw.form-components\']);\n',
                    mangle: true,
                    beautify: false
                }
            },
            validation: {
                src: ['angular/validation/**/*.controller.js', 'angular/validation/**/*.directive.js'],
                dest: 'dist/js/form-validation.js',
                options: {
                    banner: 'angular.module("tw.form-validation", []);\n',
                    mangle: false,
                    beautify: true
                }
            },
            validationMin: {
                src: ['angular/validation/**/*.controller.js', 'angular/validation/**/*.directive.js'],
                dest: 'dist/js/form-validation.min.js',
                options: {
                    banner: 'angular.module("tw.form-validation", []);\n',
                    mangle: true,
                    beautify: false
                }
            },
            styling: {
                src: ['angular/styling/**/*.controller.js', 'angular/styling/**/*.directive.js'],
                dest: 'dist/js/form-styling.js',
                options: {
                    banner: 'angular.module("tw.form-styling", []);\n',
                    mangle: false,
                    beautify: true
                }
            },
            stylingMin: {
                src: ['angular/styling/**/*.controller.js', 'angular/styling/**/*.directive.js'],
                dest: 'dist/js/form-styling.min.js',
                options: {
                    banner: 'angular.module("tw.form-styling", []);\n',
                    mangle: true,
                    beautify: false
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ["app"]
                },
                files: {
                    "public/css/styles.css": ["app/**/*.css", "app/**/*.less"]
                }
            },
            production: {
                options: {
                    paths: ["app"],
                    compress: true
                },
                files: {
                    "public/css/styles.min.css": ["app/**/*.css", "app/**/*.less"]
                }
            }
        },
        copy: {
            templates: {
                expand: true,
                flatten: true,  // flattens results to a single level
                src: ['angular/**/*.html'],
                dest: 'dist/templates/',
                filter: 'isFile'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
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
                'angular/**/*.controller.js',
                'angular/**/*.directive.js'
            ]
        },
        htmllint: {
            options: {
                "attr-name-style": false,
                "id-class-style": false
            },
            files: [
                'angular/**/*.html',
            ]
        },
        karma: {
            options: {
                configFile: 'karma-conf.js'
            },
            unit: {
                singleRun: true
            }
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

    // === REGISTER TASKS ===
    grunt.registerTask('default', ['jshint', 'htmllint', 'uglify', 'less', 'copy', 'watch']);
};
