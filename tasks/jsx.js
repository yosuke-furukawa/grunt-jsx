module.exports = function(grunt) {
  'use strict';
  var path = require('path');
  var _ = grunt.util._;
  grunt.registerMultiTask('jsx', 'Compile JSX file to JavaScript', function() {
    var done = this.async();
    console.log(this.options);
    console.log(this.target);
    var options = this.options({
      sourceRoot: "./",
      output: "",
      jsx_opts: "",
    });

    console.log(options);
    console.log(this.files);
    var files = this.filesSrc;

    files.forEach(function(f) {
      console.log(f);
      compileJsx(f, options.jsx_opts, function(error, result) {
        if (error) {
          console.error(error);
          return;
        }
        var stderr = result.stderr;
        if (stderr) {
          console.error(stderr);
          return;
        }
        var code = result.code;
        var output = result.stdout;
        console.log(result);

      });
    });

  });

  var compileJsx = function (file, opts, callback) {
    if (!file) {
      grunt.log.warn('Source file is undefiend.');
      callback("No file", null);
    }
    if (!callback && typeof(opts) === "function") {
      callback = opts;
    }
    grunt.util.spawn({
      cmd: 'jsx',
      args: [file]
    }, callback);
  };
  
  var warnOnEmptyFile = function (path) {
    grunt.log.warn('Destination (' + path + ') not written because compiled files were empty.');
  };

  var writeFile = function (path, output) {
    if (output.length < 1) {
      warnOnEmptyFile(path);
    } else {
      grunt.file.write(path, output);
      grunt.log.writeln('File ' + path + ' created.');
    }
  };
};
