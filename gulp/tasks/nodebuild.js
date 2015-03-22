var gulp = require('gulp');
var nodeWebkitBuilder = require('node-webkit-builder');
var config = require('../config');

gulp.task('node-build', function() {
  var nwBuilder = new nodeWebkitBuilder({
    files: './' + config.buildDir + '/www/**',
    cacheDir: config.buildDir + '/cache',
    buildDir: config.buildDir + '/platforms/desktop',
    platforms: ['osx'],
    checkVersions: false
  });

  nwBuilder.build().then(function() {
    console.log('Build has been generated');
  }).catch(function(error) {
    console.error(error);
  });
});
