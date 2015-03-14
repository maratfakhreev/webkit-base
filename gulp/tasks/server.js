var gulp = require('gulp');
var browserSync = require('browser-sync')
var prism = require('connect-prism');
var config = require('../config');

gulp.task('server', function() {
  prism.create({
    name: 'serve',
    mode: 'mock',
    context: '/api',
    host: 'localhost',
    port: 8001,
    delay: 0,
    rewrite: {}
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
