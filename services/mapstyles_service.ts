import { Injectable, NgZone } from '@angular/core';
import { Mapstyles } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';

@Injectable()
export class MapStyleService{
  mapstyles:Mongo.Cursor<Object>;
  subs:any;

  constructor(zone:NgZone){
    //I could not get it to work as extending MeteorComponent;
    //the error seemed to be related to library calls, which were solved by
    //putting in more recent versions of files in angular2-meteor,
    //but it kept introducing new problems - might try again after his update to npm
    //super();
    // Tracker.autorun(() => zone.run(() => {
		// this.subscribe('monitors', () => {
		// 	this.monitors = Monitors.find();
		// },true);
		// }));
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

//perhaps it has to return a promise!!!!
public getDefaultSettings () {
  let defaultSettings = new Promise ((resolve, reject) => {
    let settings = this.makeDefaultSettings();
    resolve(settings)
  })
  return defaultSettings;
}

public makeDefaultSettings ():any {
  return {
    "stylename" : "default",
    "owner" : "Dan Price/DASH",
    "attribution" : "Mapzen",
    "creationdate" : "epoch of some sort",
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
            "axis": [
                0,
                1
                ],
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
            "waterdb": {
              "base": "polygons",
              "shaders": {
                  "blocks":{
                    "position":
                        "vec3 pos = worldPosition().xyz*10;if(position.z > 0.){position.xyz += vec3(cos(pos.x+u_time)*5.,sin(pos.y+u_time)*5.,sin(pos.x+u_time)*10.+cos(pos.y+u_time)*5. );}"}
                }
            },
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
            "waterdb": {
		      "data": {
		        "source": "mongodb"
		      },
		      "draw": {
		        "polygons": {
		          "order": 12,
		          "color": "#3d8ca3",
              "interactive": true
		        }
		      }
		    },
        "ownfeatures": {
          "data": {
            "source": "mongodb"
          },
          "draw": {
            "polygons": {
              "order": 12,
              "color": "#3d8ca3",
                  "interactive": true
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
		    "otherpolys": {
		      "data": {
		        "source": "osm2"
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
  		    }
		  }
    	}
	}
    }
}
