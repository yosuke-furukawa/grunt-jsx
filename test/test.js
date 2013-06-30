var expect = require('expect.js');

module.exports = function(grunt) {
  'use strict';
  var _ = grunt.util._;
  function assertFileEquality(pathToActual, pathToExpected) {
    var actual = grunt.file.read(pathToActual).replace(/\/\/.+\n/g, "");
    // remove error message,
    actual = actual.replace(/Error\(".+?"/g, 'Error\(""');
    actual = actual.replace(/".+?"/g, '""');
    var expected = grunt.file.read(pathToExpected).replace(/\/\/.+\n/g, "");
    expected = expected.replace(/Error\(".+?"/g, 'Error\(""');
    expected = expected.replace(/".+?"/g, '""');
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
};
