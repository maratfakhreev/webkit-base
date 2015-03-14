var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace-task');
var config = require('../config');

gulp.task('replace', function() {
  var settings = {};
  var env = config.env;

  if (!fs.existsSync(config.appDir + "/config/environments/" + env + ".json")) {
    env = 'development';
  };

  settings = JSON.parse(fs.readFileSync(config.appDir + "/config/environments/" + env + ".json", 'utf8'));
  gulp.src(config.appDir + "/config/config.js")
    .pipe(replace({
      patterns: [
        {
          match: 'env',
          replacement: env
        },
        {
          match: 'apiPath',
          replacement: settings.apiPath
        },
        {
          match: 'sessionKey',
          replacement: settings.sessionKey
        }
      ]
    }))
    .pipe(gulp.dest(config.appDir + "/scripts"));
});
