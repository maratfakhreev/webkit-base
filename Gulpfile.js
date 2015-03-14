var requireDir = require('require-dir');
var gulp = require('gulp-help')(require('gulp'));

requireDir('./gulp/tasks', {recurse: true});
