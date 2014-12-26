// Generated on 2014-09-03
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    // Define the configuration for all the tasks
    grunt.initConfig({


        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['./scripts/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['less/{,*/}*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        // compile LESS files
        less: {
            development: {
                files: {
                    'css/style.css': ['less/style.less']
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'scripts/*.js']
        },


        // minifiy the css
        cssmin: {
            minify: {
                files: {
                    './css/style.min.css': ['css/{,*/}*.css']
                }
            }
        },

        // minifiy the js
        uglify: {
            uglifyjs: {
                files: {
                    './scripts/script.min.js': ['scripts/{,*/}*.js']
                }
            }
        },

        //Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 5 version', 'ie 8', 'ie 9'] // @see: https://github.com/ai/autoprefixer#browsers
            },
            dist: {
                files: [{
                    expand: true,
                    src: './css/{,*/}*.css'
                }]
            }
        },


        // minify and copy images
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './images/',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: './images'
                }]
            }
        },

        // cleanup
        clean: {
            dev: {
                src: ['./css/style.min.css', './scripts/script.min.js']    // Changed this from static_src to static
            },
            options: {
                force: true
            }
        },


        //svgs
        grunticon: {
            myIcons: {
                files: [{
                    expand: true,
                    cwd: 'images/svg',
                    src: ['*.svg', '*.png'],
                    dest: "images/output"
                }],
                options: {
                    customselectors: {
                        "slick-next": [".slick-next"],
                        "slick-prev": [".slick-prev"]
                    }
                }
            }
        },


        // Yslow perf report
        yslow: {
            options: {
                thresholds: {
                    weight: 250,
                    speed: 2500,
                    score: 80,
                    requests: 5
                }
            },
            pages: {
                files: [
                    {
                        src: "http://dev-smi.baggy.no"
                    }
                ]
            }
        },


        // psi
        pagespeed: {
            options: {
                nokey: true
            },
            prod: {
                options: {
                    url: "http://dev-smi.baggy.no",
                    locale: "en_GB",
                    strategy: "desktop",
                    threshold: 80
                }
            }
        }


    });

    grunt.registerTask('start', [
        'less',
        'jshint',
        'watch'
    ]);

    grunt.registerTask('build', [
        'less',
        'clean',
        'uglify',
        'imagemin',
        'autoprefixer',
        'cssmin'
    ]);

    grunt.registerTask('test', [
        'pagespeed',
        'yslow'
    ])

    grunt.registerTask('default', [
        'build'
    ]);


};
