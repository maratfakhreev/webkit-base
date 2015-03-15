var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../config');

gulp.task('development', function() {
  config.env = 'development';
  runSequence(
    'install',
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
