var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var config = require('../config');

gulp.task('jshint', function() {
  gulp.src(config.appDir + "/scripts/**/*.js")
    .pipe(jshint({
      camelcase: true,
      esnext: true,
      eqeqeq: true,
      forin: true,
      maxcomplexity: false,
      maxdepth: 2
    }))
    .pipe(jshint.reporter());
});
