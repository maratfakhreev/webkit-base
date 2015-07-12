var gulp = require('gulp');
var shelljs = require('shelljs');
var argv = require('yargs').argv;

gulp.task('ios-emulators', 'List of available iOS emulators', function() {
  shelljs.exec('build/platforms/ios/cordova/lib/list-emulator-images');
});

gulp.task('webinspector', 'Run Safari webinspector for debuging iOS application', function() {
  shelljs.exec('osascript bin/apple_scripts/webinspector_ios.applescript');
});

gulp.task('set-app', 'Upload client application', ['clean-app'], function() {
  var dir = (process.cwd()) + '/app';

  if (shelljs.exec('git clone ' + argv.url + ' ' + dir).code === 0) {
    shelljs.exec('rm -rf ' + dir + '/.git');
  }
}, {
  options: {
    'url <giturl>': 'get client app from git repository'
  }
});

gulp.task('npm-list', 'Show installed npm packages', function() {
  shelljs.exec('npm list --depth 0');
});

gulp.task('npm-outdated', 'Show outdated installed npm package', function() {
  shelljs.exec('npm outdated --depth 0');
});

gulp.task('npm-update', 'Update installed npm packages', function() {
  shelljs.exec('npm update --save-dev --save');
});

gulp.task('npm-install', function() {
  shelljs.exec('npm install ' + argv.pkg + ' --save-dev');
}, {
  options: {
    'pkg <npm-package>': 'install specified npm package'
  }
});

gulp.task('npm-uninstall', function() {
  shelljs.exec('npm uninstall ' + argv.pkg + ' --save-dev --save');
}, {
  options: {
    'pkg <npm-package>': 'uninstall specified npm package'
  }
});

gulp.task('bower-install', function() {
  shelljs.exec('bower install ' + argv.pkg + ' --save');
}, {
  options: {
    'pkg <bower-package>': 'install specified bower package'
  }
});

gulp.task('bower-uninstall', function() {
  shelljs.exec('bower uninstall ' + argv.pkg + ' --save-dev --save');
}, {
  options: {
    'pkg <bower-package>': 'uninstall specified bower package'
  }
});
