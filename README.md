# Fork: DASHMaps [will move main repository to DASH; now on Dan's; rework of CHGeoData]

This is a development fork of the DASHMaps repository.

Since we are planning to deploy on our own server, we should also run this with a local MongoDB instance for testing:

## Prerequisites

* [MongoDB](https://docs.mongodb.org/manual/installation/)

On Mac OS install via [homebrew](http://brew.sh/):

`brew install mongodb`

* [meteor](https://www.meteor.com/install)

On Mac OS or Linux:

`curl https://install.meteor.com/ | sh`

## ask Dan for the settings.json, which will include some passwords not to be saved on github (not yet)

For password security, using settings.json one level up: i.e, meteor --settings ../settings.json

## Testing in local development environment
#will eventually have it done in proper fork into your own Git, then pull request back here
#for now, clone from git, npm install in the project folder, then:

`MONGO_URL=mongodb://localhost:27017/DataMaps meteor --settings ../settings.json`


## angular2-meteor - need to test what is in Github, and what has to be redone
tutorial at: http://www.angular-meteor.com/tutorials/socially/angular2/bootstrapping

## typings - again, need to figure out what has to be done and what is in github
## tutorial said to do this, but seems to duplicate typings in other folders????
[from the angular2-meteor tutorial:
$ sudo npm install typings -g
    $ typings init
    $ typings install es6-promise --save
    $ typings install dt~es6-shim --global --save
    $ typings install registry:env/meteor --global
]

## added bootstrap: meteor npm install --save bootstrap@4.0.0-alpha.2
## and SASS

## Deployment with PM2 - need to determine details

* change into the working directory and run `meteor build .` - this will generate a *.tar .gz file
* move the file to the install location nd extract it (you will end up with a `bundle` directory
* `cd bundle/programs/server/` and `npm install`
* generate a configuration file for PM2 (see example [gist](https://gist.github.com/fcbee3b520b4fdf97552.git)) outside of bundle
* run `pm2 start [your_pm2_conf_file]`
