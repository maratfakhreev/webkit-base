var path = require('path');
var transform = require('vinyl-transform');
var cdv = require('cordova-lib').cordova.raw;
var config = require('../config');
var root = process.cwd();
var buildDir = path.join(root, config.buildDir);

module.exports = function() {
  if (!config.needPreparing) return;
  process.chdir(buildDir);
  cdv.prepare().then(function() {
    process.chdir(root);
  });
}
