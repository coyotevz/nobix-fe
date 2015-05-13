module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      gruntfile: {
        src: ['Gruntfile.js']
      },
      js: {
        src: ['js/**/*.js', '!js/vendor/**.js'],
        options: {
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      }
    },

    requirejs: {
      build: {
        options: {
          baseUrl: 'js',
          mainConfigFile: 'js/config.js',
          name: '../node_modules/almond/almond',
          out: 'build/js/application.js',
          include: [
            'application',
            'controllers/supplier_controller',
            '../<%= nunjucks.precompile.dest %>',
          ],
          //insertRequire: ['application'],
          preserveLicenseComments: false,
          wrap: true,
          optimize: "uglify",
        }
      }
    },

    nunjucks: {
      precompile: {
        baseDir: 'js/templates',
        src: ['js/templates/*.html'],
        dest: 'nunjucks-templates.js',
        options: {
          //env: require('js/templates/env'),
          name: function(filename) {
            return filename.replace('js/templates/', '');
          }
        }
      }
    },

    sass: {
      dev: {
        options: {
          update: true,
          sourcemap: 'none',
        },
        files: {
          'css/nobix.css': 'scss/nobix.scss'
        }
      },
      build: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
        },
        files: {
          'build/css/nobix.css': 'scss/nobix.scss'
        },
      },

    },

    processhtml: {
      build: {
        files: {
          'build/index.html': ['index.html']
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'font/**',
        dest: 'build/',
      },
      images: {
        expand: true,
        src: 'image/**',
        dest: 'build/',
      },
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
        options: {
          reload: true
        }
      },
      js: {
        files: ['js/**/*.js', '!js/vendor/**.js'],
        tasks: ['jshint:js']
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev'],
        options: {
          spawn: false,
          livereload: true,
        }
      }
    },

    clean: {
      dev: ['css/nobix.css'],
      build: ['build'], 
      tmpl: ['<%= nunjucks.precompile.dest %>'],
    }

  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-nunjucks');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean:dev','jshint:js', 'sass:dev']);
  grunt.registerTask('build',
      ['clean:build', 'jshint', 'sass:build', 'nunjucks', 'requirejs',
       'processhtml', 'copy', 'clean:tmpl']
  );
};
