var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../config');

gulp.task('development', function() {
  config.env = 'development';
  runSequence(
    'clean',
    [
      'copy',
      'templates',
      'stylesheets',
      'replace',
      'jshint',
      'jsonlint'
    ],
    'browserify',
    'server',
    'watch'
  );
});
