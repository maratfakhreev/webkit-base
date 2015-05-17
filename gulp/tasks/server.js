var gulp = require('gulp');
var browserSync = require('browser-sync');
var prism = require('connect-prism');
var config = require('../config');

gulp.task('server', function() {
  var context = '/api';

  prism.create({
    name: 'serve',
    mode: 'mock',
    context: context,
    host: 'localhost',
    port: 8001,
    delay: 0,
    rewrite: {},
    mockFilenameGenerator: function(config, req) {
      var replacer = '__';
      var url = req.url + replacer + req.method + '.json';
      return url.replace(context + '/', '').replace(/\//g, replacer);
    }
  });

  browserSync({
    port: config.ports.server,
    open: false,
    notify: false,
    server: {
      baseDir: config.publicDir,
      middleware: [prism.middleware]
    },
    files: [
      config.publicDir + '/**',
      '!' + config.publicDir + '/**.map'
    ]
  });
});
