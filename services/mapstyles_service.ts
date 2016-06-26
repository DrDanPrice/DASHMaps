import { Injectable, NgZone } from '@angular/core';
import { Mapstyles } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';
import { MapStyle } from './mapstyle_class';
import { MapSettings, ConfigSettings, LayerSettings } from '../objectmodels/mapsetting.ts';

//create a temporary style here, to be shared by consumers
//save or delete only after choice.
//state tracks what databases have been added -
//make observable arrays for: layers, datasources, views, etc. (i.e., state)
//http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
//question of observables is whether local mongos do everything we need - the observables let you subscribe between components;
//mongo, it seems, is subscribed between server and client; is enough?
//if MapStyle works as it's own class, just move it over



@Injectable()
export class MapStyleService{
  mapstyles:Mongo.Cursor<Object>;
  subs:any;
  //array of strings? it holds the one that will be used.
  mapstyle:any;

  constructor(zone:NgZone)
  {
    //try in ngOnInit as well
  }
  getMapSetting(mapsettingname){
    let dbMapSetting = new Promise((resolve, reject) => {
      let sub = Meteor.subscribe('mapstyles')
      Tracker.autorun(computation => {
      //this.zone.run(computation => {
        if (sub.ready()) {
          computation.stop()
          let setting = Mapstyles.findOne({ 'mapstyle.name':mapsettingname });
          resolve(setting)
        }
      })
    })
    return dbMapSetting;
  }

  workingMapSetting = new Mongo.Collection(null);

  setWorkingMapSetting(mapsettingname){
    let localMapSetting = new Promise((resolve, reject)=>{
      let mapset = this.getMapSetting(mapsettingname);
      mapset.then(mapsetting => {
        this.workingMapSetting.insert(mapsetting);
        resolve(true);
      });
    })
    return localMapSetting;
  }

  getWorkingMapSetting(mapsettingname){
    let localMapSetting = new Promise((resolve, reject)=>{
      let mapset = this.getMapSetting(mapsettingname);
      mapset.then(mapsetting => {
        this.workingMapSetting.insert(mapsetting);
        resolve(true);
      });
    })
    return localMapSetting;
  }
  getMapStyles() {
		let dbMapStyleProm =  new Promise((resolve, reject) => {
			let sub = Meteor.subscribe('mapstyles')
			Tracker.autorun(computation => {
		    if (sub.ready()) {
					computation.stop() //not sure if necessary for sub?
				let data = Mapstyles.find().fetch();
		    resolve(data)
		    }
			})
		});
    return dbMapStyleProm;
  }
  //cursor for pull-down to select
  getMapStyleCursor() {
    let dbMapStyleCursor =  new Promise((resolve, reject) => {
      let sub = Meteor.subscribe('mapstyles')
      Tracker.autorun(computation => {
        if (sub.ready()) {
          computation.stop() //not sure if necessary for sub?
          let cursor = Mapstyles.find();//.fetch();
          resolve(cursor)
        }
    })
  });
  return dbMapStyleCursor;
}
//mongodb doesn't save fields that begin with $, so have to clean to and from database
public cleanMapSettings(oldSettings:string):any {
  let setstring = JSON.stringify(oldSettings).replace(/dollarzoom/g,"$zoom").replace(/dollargeometry/g,"$geometry");
  return JSON.parse(setstring)
}
public origYAML(jsonobj:string):any {
  return JSON.parse(jsonobj) //or YAML.parse??)
}

public readYAML(yamlstr:string):any {
      //return Tangram.debug.yaml.safeLoad(rawyaml [json=true])
    //  return Tangram.debug.yaml.safeLoad(yamlstr)
}
public saveMapStyle(mapstyle:any):void{
  //or do on styledisplay??
  //have it save in same collection,
  //"collectiontype" : "fullmap" for whole;
  //layer, lights, etc., also saved as file - with some connection?
  //have to think through how to mix/match from mainstyles??
}

//perhaps it has to return a promise!!!!
public getDefaultSettings () {
  console.log('trying to get default')
  let mapst = new MapStyle;//to be replaced by whatever comes from upload or db
  let layerArray = {};
  for (var layer in mapst.configsettings.layers) {
    layerArray[layer] = new LayerSettings(mapst.configsettings.layers[layer])
    //console.log(mapst.configsettings.layers[layer])
  }
  let config = new ConfigSettings(
    'fadfs',
    'fadsasdfdsd',
    undefined,
    layerArray
  )
  //[new LayerSettings(undefined,undefined),new LayerSettings('earth',undefined)])

  let mapscene = new MapSettings(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    config
  )
  console.log('mapscene',mapscene)

  let defaultSettings = new Promise ((resolve, reject) => {
    let settings = new MapStyle;
    //let settings = this.makeDefaultSettings();
    let customsets = this.addCustomLayers();
    let settingself = this;
    customsets.forEach(function(setting){
      if (!settings.configsettings.layers[setting]){
        settings.configsettings.layers[setting] = settingself.makeLayerSettings();
      }
    })
    //settings.configsettings.layers['aqmonitors'] = this.makeLayerSettings();
    resolve(settings)
  })
  return defaultSettings;
}
//customLayers is its own collection? or a search on the Mapstyles?
//if part of mapstyles, then need the router to carry that info
public addCustomLayers () {
  //should return a collection, having to do with what data has been added
  return [ 'aqmonitors', 'gardens' ];
}
//get from db - or rather, from router/url to db - so only if
//find gives you count()=0
//then have one that is the added for the database that is being used
public makeLayerSettings ():any {
  let tmpset = new MapStyle;
  return tmpset.configsettings.layers['default'];
}

}
