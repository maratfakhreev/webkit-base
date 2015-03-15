#Webkit Base

## Install

Install Node.js

    brew install node

## Prepare repository

Clone repository and bootstrap:

    git clone git@github.com:maratfakhreev/webkitbase.git webkit-base
    cd webkit-base
    bin/bootstrap

## Prepare application

Create cordova project with iOS and Android platforms

    gulp create

## Run application

    gulp
    gulp prepare

Then you can use XCode build system for example. Or if you don't want:

    gulp
    gulp run [platform_name]

## List of available tasks

    gulp help
