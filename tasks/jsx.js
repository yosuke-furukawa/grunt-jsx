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

      var resultcode = true;
      existFiles.push(null); // Sentinel
      grunt.util.async.forEachSeries(existFiles, function(filepath, next) {
        if (filepath === null)
        {
          done(resultcode);
          return;
        }
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
            test: file.test,
            args: file.args,
            output_rule : file.output_rule,
            ext: file.ext
          },
          function(error, result, code) {
            if (!error) {
              grunt.log.ok();
            }
            resultcode = !code && resultcode;
            next();
          });
      });
    });
  });

  var changeExt = function (file, ext, opts) {
    var output = file;
    if (file.lastIndexOf('.') !== -1)
    {
      output = file.slice(0, file.lastIndexOf('.'));
    }
    if (ext)
    {
      output = output + ext;
    }
    else if (!opts.executable || opts.executable !== 'node')
    {
      output = output + '.js';
    }
    return output;
  };

  var compileJsx = function (file, opts, callback) {
    if (!file) {
      grunt.log.warn('Source file is undefiend.');
      callback("No file", null, 1);
    }
    var args = opts.args ? opts.args.split(" ") : [];
    var output_rule = opts.output_rule;
    var ext = opts.ext;
    delete opts.args;
    delete opts.output_rule;
    delete opts.ext;

    if (!opts.output) {
      if (output_rule) {
        //need output
        opts.output = file.replace(output_rule.regexp, output_rule.replace);
      }
      else
      {
        opts.output = changeExt(file, ext, opts);
      }
    }
    else if (grunt.file.isDir(opts.output))
    {
      opts.output = changeExt(path.resolve(opts.output, file.slice(file.lastIndexOf('/') + 1)), ext, opts);
    }

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
      else if(value === true) {
        args.push("--"+key);
      }
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
