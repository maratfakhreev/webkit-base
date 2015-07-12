var _ = require('underscore');
var path = require('path');
var gulp = require('gulp');
var cordovaLib = require('cordova-lib');
var argv = require('yargs').argv;
var pkg = require('../../package.json');
var config = require('../config');
var rootPath = process.cwd();
var buildDir = path.join(rootPath, config.buildDir);
var cdv = cordovaLib.cordova.raw;
var platforms = [];
var platform_dirs = [];

/* Platforms builder */

for (p in cordovaLib.cordova_platforms) {
  var pname = 'cordova-' + p;

  if (pkg.dependencies[pname]) {
    platforms.push(p);
    platform_dirs.push(path.join(rootPath, 'node_modules', pname));
  }
}

/* Tasks helpers */

function changeProcessDir(process) {
  process.chdir(buildDir);
}

function prepareOptions(argv) {
  var options = [];

  if (argv) {
    var args = _.pairs(argv).slice(1, -1);
    _.each(args, function(value, key) {
      var str = '';
      if (value[0] === 'platform') return;
      str += '--' + value[0];
      if (!_.isBoolean(value[1])) str += '=' + value[1];
      options.push(str);
    });
  }

  return options;
}

function preparePlatform(platform) {
  if (!platform) platform = config.platform;
  changeProcessDir(process);
  return platform;
}

/* Tasks */

gulp.task('prepare', 'Prepare application for current platform', function() {
  var platform = preparePlatform(argv.platform);
  return cdv.prepare({
    platforms: [platform],
    options: prepareOptions(argv)
  }).then(function() {
    process.chdir(rootPath);
  });
}, {
  options: {
    'platform <platform>': 'prepare on specified platform'
  }
});

gulp.task('compile', 'Compile application for current platform', function() {
  var platform = preparePlatform(argv.platform);
  return cdv.compile({
    platforms: [platform],
    options: prepareOptions(argv)
  });
}, {
  options: {
    'platform <platform>': 'compile on specified platform'
  }
});

gulp.task('emulate', 'Emulate application for current platform', function() {
  var platform = preparePlatform(argv.platform);
  return cdv.emulate({
    platforms: [platform],
    options: prepareOptions(argv)
  });
}, {
  options: {
    'platform <platform>': 'emulate on specified platform'
  }
});

gulp.task('build', 'Prepare and compile application for current platform', function() {
  var platform = preparePlatform(argv.platform);
  return cdv.build({
    platforms: [platform],
    options: prepareOptions(argv)
  });
}, {
  options: {
    'platform <platform>': 'build on specified platform'
  }
});

gulp.task('run', 'Prepare, compile and emulate application for current platform', function() {
  var platform = preparePlatform(argv.platform);
  return cdv.run({
    platforms: [platform],
    options: prepareOptions(argv)
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
  changeProcessDir(process);
  return cdv.build({ options: ['--release'] });
}, {
  options: {
    'release': 'use release environment'
  }
});

gulp.task('create', 'Create/Recreate application', ['clean-build'], function() {
  return cdv.create(buildDir, pkg.appId, pkg.name).then(function() {
    changeProcessDir(process);
  }).then(function() {
    return cdv.platform('add', platform_dirs);
  }).then(function() {
    console.log(pkg.plugins);
    return cdv.plugins('add', pkg.plugins);
  });
});

gulp.task('update-platforms', 'update all installed platforms', function() {
  changeProcessDir(process);
  return cdv.platform('update', platforms);
});

gulp.task('add-platform', function() {
  changeProcessDir(process);
  return cdv.platform('add', argv.platform);
}, {
  options: {
    'platform <platform>': 'add specified platform'
  }
});

gulp.task('rm-platform', function() {
  changeProcessDir(process);
  return cdv.platform('rm', argv.platform);
}, {
  options: {
    'platform <platform>': 'remove specified platform'
  }
});

gulp.task('add-plugin', function() {
  changeProcessDir(process);
  return cdv.plugins('add', argv.plugin);
}, {
  options: {
    'plugin <pluginid>|<directory>|<giturl>': 'add specified plugin'
  }
});

gulp.task('rm-plugin', function() {
  changeProcessDir(process);
  return cdv.plugins('rm', argv.plugin);
}, {
  options: {
    'plugin <pluginid>|<directory>|<giturl>': 'remove specified plugin'
  }
});
