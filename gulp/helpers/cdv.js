var path = require('path');
var transform = require('vinyl-transform');
var cdv = require('cordova-lib').cordova.raw;
var debounce = require('./debouncer');
var config = require('../config');
var root = process.cwd();
var buildDir = path.join(root, config.buildDir);

function cordovaPrepare() {
  if (!config.precompile) return;
  process.chdir(buildDir);
  cdv[config.precompileType]().then(function() {
    process.chdir(root);
  });
};

module.exports = debounce(cordovaPrepare, 1500);
