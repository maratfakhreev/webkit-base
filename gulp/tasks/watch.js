var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../config');
var cordovaPrepare = require('../helpers/cdv');

gulp.task('watch', function() {
  gulp.watch(config.appDir + "/stylesheets/**/*.styl", function() {
    runSequence(
      'stylesheets',
      cordovaPrepare
    );
  });

  gulp.watch(config.appDir + "/*.jade", function() {
    runSequence(
      'templates',
      cordovaPrepare
    );
  });

  gulp.watch([
    config.appDir + "/images/**/*",
    config.appDir + "/fonts/**/*"
  ], function() {
    runSequence(
      'copy',
      cordovaPrepare
    );
  });
});
