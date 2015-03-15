var gulp = require('gulp');
var runSequence = require('run-sequence');
var nodeWebkitBuilder = require('node-webkit-builder');
var config = require('../config');

gulp.task('node-build', function() {
  var nw = new nodeWebkitBuilder({
    files: '.',
    cacheDir: config.buildDir + '/cache',
    buildDir: config.buildDir + '/platforms/desktop',
    platforms: ['osx'],
    checkVersions: false
  });

  nw.build().then(function() {
    console.log('Build has been generated');
  }).catch(function(error) {
    console.error(error);
  });
});

gulp.task('build-desktop', function() {
  runSequence(
    'copy-package-json',
    'clean-desktop-build',
    'node-build'
  );
});
