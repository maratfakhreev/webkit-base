var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean', function(cb) {
  del([config.publicDir], cb);
});

gulp.task('clean-app', function(cb) {
  del([config.appDir], cb);
});

gulp.task('clean-build', function(cb) {
  del([config.buildDir], cb);
});

