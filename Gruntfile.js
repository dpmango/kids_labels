module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: [
                    'src/vendor/js/*.js',
                    'src/js/*.js'
                ],
                dest: 'dist/scripts.js',
            },
            css: {
              src: [
                "src/vendor/*.css",
                "src/css/*.css"
              ],
              dest: "dist/styles.css"
            }
        },
        uglify: {
            build: {
                src: 'dist/scripts.js',
                dest: 'dist/scripts.min.js'
            }

        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1,
            processImport: false
          },
          target: {
            files: {
              'dist/styles.min.css': 'dist/styles.css'
            }
          }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/css/style.css': 'src/sass/style.scss'
                }
            }
        },
        postcss: {
            options: {
              map: true, // inline sourcemaps

              processors: [
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
              ]
            },
            dist: {
              src: 'dist/*.css'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['src/js/**'],
                tasks: ['concat:js'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: [
                    'src/sass/**'
                ],
                tasks: ['sass', 'concat:css'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: [
                    'src/images/**'
                ],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', ['sass', 'concat', 'postcss:dist', 'uglify', 'cssmin', 'imagemin']);

};