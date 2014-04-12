var expect = require('expect.js');
var jsx = require('../lib/jsx.js');

module.exports = function(grunt) {
  'use strict';
  var _ = grunt.util._;

  grunt.registerMultiTask('unittest', 'unit test for grunt.jsx', function() {
    expect(jsx.changeExt('test.jsx', {ext: '.jsfl'})).to.be('test.jsfl');
    expect(jsx.changeExt('test.jsx', {executable: 'node'})).to.be('test');
    expect(jsx.changeExt('test.jsx', {executable: 'web'})).to.be('test.js');
    expect(jsx.changeExt('test.jsx', {executable: undefined})).to.be('test.js');
    expect(jsx.changeExt('test.jsx', {test: true})).to.be(undefined);
    expect(jsx.outputRule('test01.jsx', {
        regexp: /test(.*).jsx/,
        replace: '$1.js'})).to.be('01.js');
    var error = false;
    try {
        jsx.outputRule('test.jsx', {
            regexp: /fixtures(.*).jsx/,
            replace: '$1.js',
        });
        error = true;
    } catch(e) {
    }
    expect(error).to.be.ok();

    function trueFunc() { return true; }
    function falseFunc() { return true; }

    // automatic extesion
    var args = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {}, trueFunc); // is dir = true
    expect(args.indexOf('dir/test.js')).not.to.be(-1);

    // test doesn't export file
    var args = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {test: true}, trueFunc); // is dir = true
    expect(args.indexOf('--output')).to.be(-1);

    // node doens't have extension
    var args = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {executable: 'node'}, trueFunc); // is dir = true
    expect(args.indexOf('dir/test')).not.to.be(-1);

    // Linker Option Test
    var jsxArgs = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {output: 'dir/test.js', linker: 'commonjs-lib'}, falseFunc);
    var linkerArgs = jsx.finalizeLinkerOption(grunt, jsxArgs, {linker: 'commonjs-lib'}, falseFunc);
    expect(jsxArgs.indexOf('dir/test.js')).to.be(-1); // output file is replaced to temp file
    expect(jsxArgs.indexOf(linkerArgs.temp.path)).not.to.be(-1);
    expect(linkerArgs.args.indexOf('dir/test.js')).to.be(-1); // output file is replaced to temp file
    
    // Expand add-search-path
    var args = jsx.finalizeJsxOption(grunt, 'dir/test.jsx', {"add-search-path": 'test/test*'}, falseFunc); // is dir = true
    expect(args.indexOf('test/testDir1')).not.to.be(-1);
    expect(args.indexOf('test/testDir2')).not.to.be(-1);
  });
};
