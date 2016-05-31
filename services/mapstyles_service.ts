import { Injectable, NgZone } from '@angular/core';
import { Mapstyles } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';

//create a temporary style here, to be shared by consumers
//save or delete only after choice.
//state tracks what databases have been added -
//make observable arrays for: layers, datasources, views, etc. (i.e., state)
//http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
//question of observables is whether local mongos do everything we need - the observables let you subscribe between components;
//mongo, it seems, is subscribed between server and client; is enough?
//if MapStyle works as it's own class, just move it over
export class MapStyle {
  //can have time, etc., at point at which it's new, and then can also put in stuff about being complete or not
  //get scene settings from the returned object, .configsettings
  //put in globals!  https://mapzen.com/documentation/tangram/global/
  constructor() {
    return {
    "stylename" : "default",
    "owner" : "Dan Price/DASH",
    "attribution" : "Mapzen",
    "creationdate" : "epoch of some sort",
    "collectiontype" : "fullmap",
    "configsettings" : {
		  "scene": {
		  	"background":{color:"white"},
			"animated":false},
		  "cameras": {
            "camera1": {
                "type": "perspective",
                "vanishing_point": [
                  -0.15,
                  -0.75
                ]
            },
            "camera2": {
                "type": "isometric",
                "axis": [0,1],
                "active": true
            }
      },
		  "lights": {
		    "light1": {
		      "type": "directional",
		      "diffuse": 1,
		      "ambient": 0.35
		    }
		  },
		  "sources": {
		    "osm": {
		      "type": "TopoJSON",
		      "url": "http://vector.mapzen.com/osm/all/{z}/{x}/{y}.topojson?api_key=vector-tiles-f7STaq0"
			  }
		  },
		  "styles": {
		    "buildings": {
          "interactive": true,
		      "base": "polygons",
		      "shaders": {
		        "uniforms": {
		          "u_height": 0,
		          "u_color_height": 0
		        },
		        "blocks": {
		          "position": "position.z *= u_height;"
		        }
		      }
		    }
		  },
		  "layers": {
		    "earth": {
          "interactive": true,
		      "data": {
                  "source": "osm"
		      },
		      "draw": {
		        "polygons": {
		          "order": 0,
		          "color": "#edf4f0"
		        }
		      }
		    },
		    "landuse": {
          "interactive": true,
		      "data": {
		        "source": "osm"
		      },
		      "draw": {
		        "polygons": {
		          "order": 1,
		          "color": "#4db177"
		        }
		      }
		    },
		    "water": {
          "interactive": true,
		      "data": {
                  "source": "osm"
		      },
		      "draw": {
		        "polygons": {
		          "order": 2,
		          "color": "#3d8ca3"
		        }
		      }
		    },
		    "roads": {
		      "data": {
		        "source": "osm"
		      },
		      "properties": {
		        "width": 3
		      },
		      "draw": {
		        "lines": {
		          "order": 3,
		          "color": "#050505",
		          "width": 3
		        }
		      }
		    },
		    "buildings": {
		      "data": {
		        "source": "osm"
		      },
  		      "draw": {
  		        "lines": {
  		          "order": 2,
  		          "color": "red",
  		          "width": 3
  		        }
  		      }
  		  },
        "default_data": {
		      "data": {
		        "source": "mongodb"
		      },
  		      "draw": {
  		        "lines": {
  		          "order": 2,
  		          "color": "blue",
  		          "width": 3
  		        },
              "polygons": {
              "order": 12,
              "color": "#FF00FF",
                  "interactive": true
              }
  		      }
  		  }
		  }
    	}
	  }
  }
}
  //this is to be newed in mapstyles, but potentially also in datadisplay -


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

  getMapStyles() {
		let dbDataProm =  new Promise((resolve, reject) => {
			let sub = Meteor.subscribe('mapstyles')
			Tracker.autorun(computation => {
		        if (sub.ready()) {
					computation.stop() //not sure if necessary for sub?
					let data = Mapstyles.find().fetch();
		            resolve(data)
		        }
			})
		});
    return dbDataProm;
  }
  getMapStyleCursor() {
    let dbDataCursor =  new Promise((resolve, reject) => {
      let sub = Meteor.subscribe('mapstyles')
      Tracker.autorun(computation => {
        if (sub.ready()) {
          computation.stop() //not sure if necessary for sub?
          let cursor = Mapstyles.find();//.fetch();
          resolve(cursor)
        }
    })
  });
  return dbDataCursor;
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
  return tmpset.configsettings.layers['default_data'];
}

}
