var gulp = require('gulp');
var install = require('gulp-install');

gulp.task('install', function() {
  gulp.src(['./bower.json']).pipe(install());
});

