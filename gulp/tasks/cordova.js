var path = require('path');
var gulp = require('gulp');
var shelljs = require('shelljs');
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

gulp.task('prepare', 'Prepare application for current platform', function() {
  process.chdir(buildDir);
  return cdv.prepare({platforms: [config.platform]}).then(function() {
    process.chdir(root);
  });
});

gulp.task('compile', 'Compile application for current platform', function() {
  process.chdir(buildDir);
  return cdv.compile({platforms: [config.platform]});
});

gulp.task('emulate', 'Emulate application for current platform', function() {
  process.chdir(buildDir);
  return cdv.emulate({platforms: [config.platform]});
});

gulp.task('build', 'Prepare and compile application for current platform', function() {
  process.chdir(buildDir);
  return cdv.build({platforms: [config.platform]});
});

gulp.task('run', 'Prepare, compile and emulate application for current platform', function() {
  process.chdir(buildDir);
  return cdv.run({
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

gulp.task('release', 'Release application', function() {
  process.chdir(buildDir);
  return cdv.build({options: ['--release']});
}, {
  options: {
    'release': 'use release environment'
  }
});

gulp.task('create', 'Create/Recreate application', ['clean-build'], function() {
  return cdv.create(buildDir, pkg.appId, pkg.name).then(function() {
    process.chdir(buildDir);
  }).then(function() {
    return cdv.platform('add', platform_dirs);
  }).then(function() {
    console.log(pkg.plugins);
    return cdv.plugins('add', pkg.plugins);
  });
});

gulp.task('update-platforms', 'update all installed platforms', function() {
  process.chdir(buildDir);
  return cdv.platform('update', platforms);
});

gulp.task('add-platform', function() {
  process.chdir(buildDir);
  return cdv.platform('add', argv.platform);
}, {
  options: {
    'platfrom <platform>': 'add specified platform'
  }
});

gulp.task('rm-platform', function() {
  process.chdir(buildDir);
  return cdv.platform('rm', argv.platform);
}, {
  options: {
    'platfrom <platform>': 'remove specified platform'
  }
});

gulp.task('add-plugin', function() {
  process.chdir(buildDir);
  return cdv.plugins('add', argv.plugin);
}, {
  options: {
    'plugin <pluginid>|<directory>|<giturl>': 'add specified plugin'
  }
});

gulp.task('rm-plugin', function() {
  process.chdir(buildDir);
  return cdv.plugins('rm', argv.plugin);
}, {
  options: {
    'plugin <pluginid>|<directory>|<giturl>': 'remove specified plugin'
  }
});
