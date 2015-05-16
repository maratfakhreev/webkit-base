var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var browserifyShim = require('browserify-shim');
var jadeify = require('jadeify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var cordovaPrepare = require('../helpers/cdv');
var config = require('../config');
var entryPoint = "./" + config.appDir + "/scripts/main.js";

gulp.task('browserify', function() {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: config.isDevelopment(),
    extensions: ['.jade', '.js'],
    entries: entryPoint,
    paths: ["./" + config.appDir]
  })
  .transform(browserifyShim)
  .transform(jadeify)
  .transform(babelify.configure({
    ignore: [
      'bower_components',
      'vendor/scripts'
    ],
    sourceMapRelative: "./" + config.appDir
  }));

  function bundle() {
    var bundleTransform = transform(function(filename) {
      return bundler.bundle();
    });

    return gulp.src(entryPoint)
      .pipe(bundleTransform)
      .on('error', notify.onError())
      .pipe(rename({basename: 'application'}))
      .pipe(gulp.dest(config.publicDir))
      .on('data', cordovaPrepare);
  };

  if (config.isDevelopment()) {
    watchify(bundler).on('update', bundle);
  };

  return bundle();
});
