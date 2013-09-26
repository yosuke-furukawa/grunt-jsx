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
            args: file.args,
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

  grunt.registerMultiTask('jsx_test', 'Run JSX unittest', function() {
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
            executable: file.executable,
            test: true,
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
            args: file.args,
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

  grunt.registerMultiTask('jsx_doc', 'Generate API document', function() {
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
            "add-search-path": file.add_search_path,
            "output": file.dest,
            mode: 'doc',
            args: file.args,
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
    var args = opts.args ? opts.args.split(" ") : [];
    delete opts["args"];

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
    grunt.log.write('jsx ');
    grunt.log.writeln(args.join(" "));
    var jsx = grunt.util.spawn({
      cmd: 'jsx',
      args: args
    }, callback);
    jsx.stdout.pipe(process.stdout);
    jsx.stderr.pipe(process.stderr);
  };
};
