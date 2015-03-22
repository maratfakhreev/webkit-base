var path = require('path');
var gulp = require('gulp');
var shelljs = require('shelljs');
var runSequence = require('run-sequence');
var cordovaLib = require('cordova-lib');
var argv = require('yargs').argv;
var pkg = require('../../package.json');
var config = require('../config');
var root = process.cwd();
var buildDir = path.join(root, config.buildDir);
var cdv = cordovaLib.cordova.raw;
var platforms = [];
var platform_dirs = [];

/* Platforms builder */

for (p in cordovaLib.cordova_platforms) {
  var pname = "cordova-" + p;

  if (pkg.dependencies[pname]) {
    platforms.push(p);
    platform_dirs.push(path.join(root, 'node_modules', pname));
  }
}

/* TASKS */

gulp.task('prepare', 'Prepare application', function() {
  process.chdir(buildDir);
  cdv.prepare().then(function() {
    process.chdir(root);
  });
});

gulp.task('build', 'Prepare and compile application', function() {
  if (config.platform === 'desktop') {
    runSequence(
      'copy-package-json',
      'clean-build-desktop',
      'node-build'
    );
  }
  else {
    process.chdir(buildDir);
    cdv.build();
  }
});

gulp.task('run', 'Prepare, compile and emulate application', function() {
  process.chdir(buildDir);
  cdv.run({
    platforms: [config.platform],
    options: ['--device']
  });
}, {
  options: {
    'device iPhone4s': 'use iPhone 4s emulator',
    'device iPhone5s': 'use iPhone 5s emulator',
    'device iPhone6': 'use iPhone 6 emulator',
    'device iPhone-6-Plus': 'use iPhone 6 emulator',
    'device iPad-2': 'use iPad non-retina emulator',
    'device iPad-Retina': 'use iPad retina emulator',
    'device iPad-Air': 'use iPad retina 64bit emulator'
  }
});

gulp.task('emulate', 'Emulate application', function() {
  process.chdir(buildDir);
  cdv.emulate({platforms: [config.platform]});
});

gulp.task('release', 'Release application', function() {
  process.chdir(buildDir);
  cdv.build({options: ['--release']});
}, {
  options: {
    'release': 'use release environment'
  }
});

gulp.task('create', 'Create/Recreate application', ['clean-build'], function() {
  cdv.create(buildDir, pkg.appId, pkg.name).then(function() {
    process.chdir(buildDir);
  }).then(function() {
    return cdv.platform('add', platform_dirs);
  }).then(function() {
    return cdv.plugins('add', pkg.cordovaPlugins);
  });
});

gulp.task('update-platforms', 'Update all platforms', function() {
  process.chdir(buildDir);

  for (var i = 0, length = platforms.length; i < length; i++) {
    cdv.platform('update', platforms[i]);
  }
});

gulp.task('add-platform', function() {
  process.chdir(buildDir);
  cdv.platform('update', argv.platform);
}, {
  options: {
    'platfrom <platform>': 'add specified platform'
  }
});

gulp.task('rm-platform', function() {
  process.chdir(buildDir);
  cdv.platform('remove', argv.platform);
}, {
  options: {
    'platfrom <platform>': 'remove specified platform'
  }
});

gulp.task('add-plugin', function() {
  process.chdir(buildDir);
  cdv.plugins('add', argv.plugin);
}, {
  options: {
    'plugin <pluginid>|<directory>|<giturl>': 'add specified plugin'
  }
});

gulp.task('rm-plugin', function() {
  process.chdir(buildDir);
  cdv.plugins('rm', argv.plugin);
}, {
  options: {
    'plugin <pluginid>|<directory>|<giturl>': 'remove specified plugin'
  }
});
