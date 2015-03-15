var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace-task');
var config = require('../config');

gulp.task('replace', function() {
  var settings = {};
  var patterns = [];
  var env = config.env;

  if (!fs.existsSync(config.appDir + "/config/environments/" + env + ".json")) {
    env = 'development';
  };

  settings = JSON.parse(fs.readFileSync(config.appDir + "/config/environments/" + env + ".json", 'utf8'));

  for (s in settings) {
    patterns.push({
      match: s,
      replacement: settings[s]
    });
  }

  patterns.push({
    match: 'env',
    replacement: env
  });

  gulp.src(config.appDir + "/config/config.js")
    .pipe(replace({patterns: patterns}))
    .pipe(gulp.dest(config.appDir + "/scripts"));
});
