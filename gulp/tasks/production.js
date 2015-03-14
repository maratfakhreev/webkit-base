var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../config');

gulp.task('production', function() {
  config.env = 'production';
  runSequence(
    'install',
    'clean',
    [
      'copy',
      'templates',
      'stylesheets',
      'replace'
    ],
    'browserify'
  );
});
