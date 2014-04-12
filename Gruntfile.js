
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
      task: {
        src: 'tasks/jsx.js'
      },
      core: {
        src: 'lib/jsx.js'
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
    unittest: {
      core: {}
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
        add_search_path: 'fixtures/'
      },
      add_search_path_arr: {
        src: 'fixtures/import.jsx',
        dest: 'tmp/import2.jsx.js',
        add_search_path: ['fixtures/', 'fixtures2/'],
      },
      minify: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.min.jsx.js',
        minify: true,
      },
      profile: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.prof.jsx.js',
        profile: true,
      },
      optimize: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.opt.jsx.js',
        optimize: "no-assert,inline,no-debug",
      },
      disable_optimize: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.disopt.jsx.js',
        disable_optimize: "array-length,unclassify",
      },
      enable_source_map: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.srcmap.jsx.js',
        enable_source_map: true,
      },
      warn: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.warn.jsx.js',
        warn: 'all',
      },
      mode: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.mode.jsx.js',
        mode: 'parse',
      },
      target: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.target.jsx.js',
        target: 'javascript',
      },
      test: {
        src: 'fixtures/import.jsx',
        test: true,
      },
      mode_doc: {
        src: 'fixtures/template.jsx',
        dest: 'tmp/template',
        mode: 'doc',
      },
      filename_rule: {
        src: 'fixtures/hello.jsx',
        output_rule: {
          regexp: /fixtures\/(.*).jsx/,
          replace: 'tmp\/$1.js',
        }
      },
      args: {
        src: 'fixtures/fizzbuzz.jsx',
        dest: 'tmp/fizzbuzz.arg.jsx.js',
        minify: true,
        args: '--profile --add-search-path fixtures/'
      },
      auto_extension_completion1: {
        src: 'fixtures/hello2.jsx',
        dest: 'tmp/',
        executable: 'node'
      },
      auto_extension_completion2: {
        src: 'fixtures/hello2.jsx',
        dest: 'tmp/'
      },
      ext: {
        src: 'fixtures/hello.jsx',
        dest: 'tmp/',
        ext: '.jsfl'
      },
      linker: {
        src: 'fixtures/library.jsx',
        dest: 'tmp/library.js',
        linker: 'commonjs-lib'
      }
    }
  });
  grunt.loadTasks('tasks');

  grunt.loadTasks('test');
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('test', ['unittest', 'clean', 'jsx']);
  grunt.registerTask('default', ['jshint', 'watch']);
};
