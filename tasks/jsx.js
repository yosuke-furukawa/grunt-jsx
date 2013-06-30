module.exports = function(grunt) {
  'use strict';
  var path = require('path');
  var _ = grunt.util._;
  grunt.registerMultiTask('jsx', 'Compile JSX file to JavaScript', function() {
    var done = this.async();
    this.files.forEach(function(file) {
      if (file.src.length < 1) {
        grunt.log.error("no files");
      }
      var existFiles = file.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      existFiles.map(function(filepath) {
        compileJsx(
          filepath,
          {
            output: file.dest,
            executable: file.executable,
            release: file.release,
            "add-search-path": file.add_search_path
          },
          function(error, result, code) {
            if (!error) {
              grunt.log.ok();
            }
            done(!code);
          });
      });
    });

  });

  var compileJsx = function (file, opts, callback) {
    if (!file) {
      grunt.log.warn('Source file is undefiend.');
      callback("No file", null, 1);
    }
    var args = [];
    _.each(opts, function(value, key) {
      if(value && value !== true) {
        if (_.isArray(value)) {
          _.each(value, function(v) {
            args.push("--"+key, v);
          });
        }
        else {
          args.push("--"+key, value);
        }
      }
      else if(value === true) args.push("--"+key);
    });
    args.push(file);
    grunt.log.write('jsx');
    _.each(args, function(arg) {
      grunt.log.write(' ');
      grunt.log.write(arg);
    });
    grunt.log.writeln();
    var jsx = grunt.util.spawn({
      cmd: 'jsx',
      args: args
    }, callback);
    jsx.stdout.pipe(process.stdout);
    jsx.stderr.pipe(process.stderr);
  };
};
