
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= props.license %> */\n',
    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      jsx: {
        src: 'tasks/jsx.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      jsx: {
        files: 'tasks/jsx.js',
        tasks: ['jshint:jsx']
      }
    },
    clean: {
      tests: ['tmp/']
    },
    checkfile: {
      test: {
        actuals: 'tmp/*.js',
        expected: 'fixtures/expected/*.js'
      }
    },
    jsx: {
      client: {
        src: 'fixtures/hello.jsx',
        dest: 'tmp/hello.jsx.js',
      },
      server: {
        src: 'fixtures/hello.jsx',
        dest: 'tmp/hello.node.jsx.js',
        executable: 'node',
      },
      release: {
        src: 'fixtures/hello.jsx',
        dest: 'tmp/hello.release.jsx.js',
        executable: 'node',
        release: true,
      },
      add_search_path: {
        src: 'fixtures/import.jsx',
        dest: 'tmp/import.jsx.js',
        add_search_path: 'fixtures/',
      },
      add_search_path_arr: {
        src: 'fixtures/import.jsx',
        dest: 'tmp/import2.jsx.js',
        add_search_path: ['fixtures/', 'fixtures2/'],
      },
    }
  });
  grunt.loadTasks('tasks');

  grunt.loadTasks('test');
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('test', ['clean', 'jsx', 'checkfile']);
  grunt.registerTask('default', ['jshint', 'watch']);
};
