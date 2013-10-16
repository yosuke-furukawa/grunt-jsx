var expect = require('expect.js');
var jsx = require('../lib/jsx.js');

module.exports = function(grunt) {
  'use strict';
  var _ = grunt.util._;

  function assertFileEquality(pathToActual, pathToExpected) {
    var actual = grunt.file.read(pathToActual).replace(/\/\/.+\n/g, "");
    // remove error message,
    actual = actual.replace(/Error\(".+?"/g, 'Error\(""');
    actual = actual.replace(/".+?"/g, '""');
    actual = actual.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g, '""');
    var expected = grunt.file.read(pathToExpected).replace(/\/\/.+\n/g, "");
    expected = expected.replace(/Error\(".+?"/g, 'Error\(""');
    expected = expected.replace(/".+?"/g, '""');
    expected = expected.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g, '""');
    console.log(pathToActual, pathToExpected);
    expect(actual).to.eql(expected);
  }

  grunt.registerMultiTask('checkfile', 'check equality', function() {
    var testConfig = grunt.config('checkfile');
    var actuals = grunt.file.expand(testConfig.test.actuals);
    var expected = grunt.file.expand(testConfig.test.expected);
    expect(actuals.length).to.be(expected.length);
    for (var i=0; i<expected.length; i++) {
      assertFileEquality(actuals[i], expected[i]);
    }
  });

  grunt.registerMultiTask('unittest', 'unit test for grunt.jsx', function() {
    expect(jsx.changeExt('test.jsx', {ext: '.jsfl'})).to.be('test.jsfl');
    expect(jsx.changeExt('test.jsx', {executable: 'node'})).to.be('test');
    expect(jsx.changeExt('test.jsx', {executable: 'web'})).to.be('test.js');
    expect(jsx.changeExt('test.jsx', {executable: undefined})).to.be('test.js');
    expect(jsx.changeExt('test.jsx', {test: true})).to.be(undefined);

    function trueFunc() { return true; }
    function falseFunc() { return true; }

    var args = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {}, trueFunc); // is dir = true
    expect(args.indexOf('dir/test.js')).not.to.be(-1);

    var args = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {test: true}, trueFunc); // is dir = true
    expect(args.indexOf('--output')).to.be(-1);

    var args = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {executable: 'node'}, trueFunc); // is dir = true
    expect(args.indexOf('dir/test')).not.to.be(-1);

    // Linker Option Test
    var jsxArgs = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {output: 'dir/test.js', linker: 'commonjs-lib'}, falseFunc);
    var linkerArgs = jsx.finalizeLinkerOption(grunt, jsxArgs, {linker: 'commonjs-lib'}, falseFunc);
    expect(jsxArgs.indexOf('dir/test.js')).to.be(-1); // output file is replaced to temp file
    expect(jsxArgs.indexOf(linkerArgs.temp.path)).not.to.be(-1);
    expect(linkerArgs.args.indexOf('dir/test.js')).to.be(-1); // output file is replaced to temp file
  });
};
