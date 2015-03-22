var gulp = require('gulp');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('copy', function() {
  return gulp.src([
    config.appDir + '/images/**/*',
    config.appDir + '/fonts/**/*',
    config.appDir + '/font/**/*'
  ], {base: config.appDir + '/'})
    .pipe(plumber())
    .pipe(gulp.dest(config.publicDir));
});

gulp.task('copy-package-json', function() {
  return gulp.src('package.json')
    .pipe(plumber())
    .pipe(gulp.dest(config.publicDir));
})
