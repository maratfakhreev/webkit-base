var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var notify = require('gulp-notify');
var config = require('../config');

gulp.task('templates', function() {
  gulp.src(config.appDir + "/*.jade")
    .pipe(plumber())
    .pipe(jade({
      pretty: true,
      data: {}
    }).on('error', notify.onError()))
    .pipe(gulp.dest(config.publicDir + "/"));
});
