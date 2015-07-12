var gulp = require('gulp');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('copy', function() {
  gulp.src([
    config.appDir + '/images/**/*',
    config.appDir + '/fonts/**/*'
  ], {base: config.appDir + '/'})
    .pipe(plumber())
    .pipe(gulp.dest(config.publicDir));
});
