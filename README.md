#Webkit Base

Instrumental environment for developing cross-platform applications base on Apache Cordova platform and includes Backbone.js/Marionette.js frameworks and node/gulp technologies.

## NPM Dependencies
    "autoprefixer-stylus"
    "backbone"
    "backbone-nested"
    "backbone-validation"
    "backbone.marionette"
    "backbone.routefilter"filter",
    "backbone.stickit"
    "cordova-android"
    "cordova-browser"
    "cordova-ios"
    "fastclick"
    "font-awesome"
    "jeet"
    "jquery"
    "moment"
    "moment-timezone"
    "nprogress"
    "topcoat"
    "underscore"

## NPM Dev dependencies:
    "babelify"
    "browser-sync"
    "browserify"
    "browserify-shim"
    "connect-prism"
    "cordova-lib"
    "del"
    "grunt"
    "gulp"
    "gulp-concat"
    "gulp-cssimport"
    "gulp-help"
    "gulp-jade"
    "gulp-jshint"
    "gulp-jsonlint"
    "gulp-notify"
    "gulp-plumber"
    "gulp-rename"
    "gulp-replace-task"
    "gulp-stylus"
    "jadeify"
    "jshint-stylish"
    "karma"
    "karma-browserify"
    "karma-chai"
    "karma-chrome-launcher"
    "karma-mocha"
    "karma-phantomjs-launcher"
    "karma-sinon"
    "require-dir"
    "run-sequence"
    "shelljs"
    "underscore"
    "vinyl-transform"
    "watchify"
    "yargs"

## Install
### OSX

Install Node.js

    brew install node

### Ubuntu 12.04

Install Node.js and Npm

    sudo add-apt-repository ppa:richarvey/nodejs
    sudo apt-get update && sudo apt-get install nodejs npm

Configure Npm path (for avoid _sudo_ usage for installing modules)

    npm config set prefix ~/npm
    echo "PATH=\$PATH:\$HOME/npm/bin" | tee -a ~/.zshrc # for zsh shell

## Prepare repository

Clone repository and setup:

    git clone git@github.com:maratfakhreev/webkitbase.git webkit-base
    cd webkit-base
    bin/setup

## Prepare application

Create cordova project with iOS and Android platforms

    gulp create

## Setup your environments config

Override configs files if it is necessary. Configs located in the `app/config/environments`

### Note
If you use a local API to test the application on device make sure that `apiPath` property is equal to `http://LOCAL_IP_ADDRESS/api`

If you use device simulators `apiPath` can be `http://localhost:8000/api`

## Run application

    gulp

Then you can use XCode build system for example. Or if you don't want:

    gulp run [platform_name]

## List of available tasks

    gulp help
