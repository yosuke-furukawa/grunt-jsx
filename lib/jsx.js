"use strict";

function changeExt (file, opts) {
  var output = file;
  if (file.lastIndexOf('.') !== -1) {
    output = file.slice(0, file.lastIndexOf('.'));
  }
  if (opts.ext) {
    output = output + opts.ext;
  }
  else if (opts.test) {
    output = undefined;
  }
  else if (!opts.executable || opts.executable !== 'node') {
    output = output + '.js';
  }
  return output;
}

function outputRule (file, output_rule) {
  var result = file.replace(output_rule.regexp, output_rule.replace);
  if (file === result) {
    new Error("output pattern for '" + file + "' is not match. Please fix output_rule.")
  }
  return result;
}

/**
 * Creates option
 */
function finalizeJsxOption (grunt, file, opts, isDir) {
  var path = require('path');
  var _ = grunt.util._;
  opts = _.clone(opts);
  var args = opts.args ? opts.args.split(" ") : [];

  if (!opts.output) {
    if (opts.output_rule) {
      //need output
      opts.output = outputRule(file, opts.output_rule);
    }
    else if (!opts.test) {
      opts.output = changeExt(file, opts);
    }
  }
  else if (isDir(opts.output) && !opts.test) {
    opts.output = changeExt(path.resolve(opts.output, file.slice(file.lastIndexOf('/') + 1)), opts);
  }

  // Expand add-search-path
  if (opts['add-search-path']) {
    opts['add-search-path'] = grunt.file.expand({filter:'isDirectory'}, opts['add-search-path']);
  }

  delete opts.args;
  delete opts.output_rule;
  delete opts.ext;
  delete opts.linker;

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
  return args;
}

/**
 * Creates option for JSX Linker
 */
function finalizeLinkerOption (grunt, jsxArgs, opts, isDir) {
  var path = require('path');
  var temp = require('temporary');
  var _ = grunt.util._;
  opts = _.clone(opts);
  if (!opts.linker) {
    return null;
  }
  var outputIndex = jsxArgs.indexOf('--output');
  var tempfile = new temp.File();
  var linkerArgs = [];
  if (outputIndex !== -1) {
    linkerArgs.push('--output', jsxArgs.splice(outputIndex + 1, 1, tempfile.path)[0]);
  } else {
    jsxArgs.splice(0, '--output', tempfile.path);
  }
  linkerArgs.push('-t', opts.linker, tempfile.path);

  return {args:linkerArgs, temp:tempfile};
}

function _searchCommand(grunt, cmd) {
  var path = require('path');
  if (process.platform === 'win32') {
    cmd += '.cmd';
  }
  for (var i = 0; i < module.paths.length; i++)
  {
    var cmdPath = path.join(module.paths[i], '.bin', cmd);
    if (grunt.file.exists(cmdPath)) {
      return cmdPath;
    }
  }
  return cmd;
}

function _runJSX(grunt, args, callback) {
  grunt.log.write('jsx ');
  grunt.log.writeln(args.join(" "));
  var jsx = grunt.util.spawn({
    cmd: _searchCommand(grunt, 'jsx'),
    args: args,
    opts: { stdio : ['ignore', process.stdout, process.stderr] }
  }, function (error, result, code) {
    if (error) {
      grunt.log.error("error: " + error);
    }
    callback(error, code);
  });
}

function _runJSXLinker(grunt, args, callback) {
  grunt.log.write('jsx-linker ');
  grunt.log.writeln(args.args.join(" "));
  var jsx = grunt.util.spawn({
    cmd: _searchCommand(grunt, 'jsx-linker'),
    args: args.args,
    opts: { stdio : ['ignore', process.stdout, process.stderr] }
  }, function (error, result, code) {
    if (error) {
      grunt.log.error("error: " + error);
    }
    args.temp.unlinkSync();
    callback(error, code);
  });
}

function run(grunt, jsxArgs, linkerArgs, callback) {
  if (!linkerArgs) {
    _runJSX(grunt, jsxArgs, callback);
  } else {
    _runJSX(grunt, jsxArgs, function (error, code) {
      if (error) {
        return callback(error, code);
      }
      _runJSXLinker(grunt, linkerArgs, callback);
    });
  }
}

module.exports = {
  changeExt: changeExt,
  outputRule: outputRule,
  finalizeJsxOption: finalizeJsxOption,
  finalizeLinkerOption: finalizeLinkerOption,
  run: run
};
