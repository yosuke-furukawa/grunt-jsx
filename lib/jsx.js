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

/**
 * Creates option
 */
function finalizeJsxOption (grunt, file, opts, isDir) {
  var path = require('path');
  var _ = grunt.util._;
  if (!file) {
    grunt.log.warn('Source file is undefiend.');
  }
  var args = opts.args ? opts.args.split(" ") : [];
  var output_rule = opts.output_rule;

  if (!opts.output) {
    if (output_rule) {
      //need output
      opts.output = file.replace(output_rule.regexp, output_rule.replace);
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
    opts['add-search-path'] = grunt.file.expand({filter:'isDirectory'}, opts['add-search-path'])
  }

  delete opts.args;
  delete opts.output_rule;
  delete opts.ext;

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

module.exports = {
  changeExt: changeExt,
  finalizeJsxOption :finalizeJsxOption
};
