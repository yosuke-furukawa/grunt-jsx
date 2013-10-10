module.exports = function(grunt) {
  'use strict';
  var finalizeJsxOption = require('../lib/jsx.js').finalizeJsxOption;
  var _ = grunt.util._;

  grunt.registerMultiTask('jsx', 'Compile JSX file to JavaScript', function() {
      try {
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

      var resultcode = true;
      existFiles.push(null); // Sentinel
      grunt.util.async.forEachSeries(existFiles, function(filepath, next) {
        if (filepath === null) {
          done(resultcode);
          return;
        }
        var opts = {
          output: file.dest,
          executable: file.executable,
          release: file.release,
          "add-search-path": file.add_search_path,
          "enable-source-map": file.enable_source_map,
          profile: file.profile,
          minify: file.minify,
          optimize: file.optimize,
          "disable-optimize": file.disable_optimize,
          warn: file.warn,
          "disable-type-check": file.disable_type_check,
          mode: file.mode,
          target: file.target,
          test: file.test,
          args: file.args,
          output_rule : file.output_rule,
          ext: file.ext
        };
        var args = finalizeJsxOption(grunt, filepath, opts, grunt.file.isDir);
        grunt.log.write('jsx ');
        grunt.log.writeln(args.join(" "));
        grunt.util.spawn({
          cmd: 'jsx',
          args: args,
          opts: { stdio : ['ignore', process.stdout, process.stderr] }
        }, function (error, result, code) {
          if (!error) {
            grunt.log.ok();
          }
          resultcode = !code && resultcode;
          next();
        });
      });
    });
      } catch (e) { console.log(e.stack); }
  });
};

