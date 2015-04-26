#Webkit Base

## Install

Install Node.js

    brew install node

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
    gulp prepare

Then you can use XCode build system for example. Or if you don't want:

    gulp
    gulp run [platform_name]

## List of available tasks

    gulp help
