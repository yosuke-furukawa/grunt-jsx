
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
    jsx: {
      client: {
        src: 'examples/hello.jsx',
        dest: 'tmp/hello.jsx.js',
      },
      server: {
        src: 'examples/hello.jsx',
        dest: 'tmp/hello.node.jsx.js',
        executable: 'node',
      },
      release: {
        src: 'examples/hello.jsx',
        dest: 'tmp/hello.release.jsx.js',
        executable: 'node',
        release: true,
      },
      add_search_path: {
        src: 'examples/import.jsx',
        dest: 'tmp/import.jsx.js',
        "add-search-path": 'examples/',
      },
      add_search_path_arr: {
        src: 'examples/import.jsx',
        dest: 'tmp/import2.jsx.js',
        "add-search-path": ['examples/', 'examples2/'],
      },
      notfound: {
        src: 'examples/notfound.jsx',
        dest: 'tmp/notfound.jsx.js',
      },
      import_demo: {
        src: 'examples/import.jsx',
        dest: 'tmp/import.jsx.js',
      }
    }
  });
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'watch']);
};
