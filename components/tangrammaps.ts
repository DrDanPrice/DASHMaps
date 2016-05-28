//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Injectable, Input } from '@angular/core';
import { AQMonitorsService } from '../services/aqmonitors_service.ts';

declare var L:any;
declare var Tangram:any;
declare var window:any;

@Component({
  selector: 'tangram-map',
  providers: [AQMonitorsService],
  styles: [`
      #displayMap {
       height: 800px;  //needs to be set for initial map load
      }
	  .leaflet-container {
	    cursor: crosshair !important;
	  }
    `],
  templateUrl: 'client/templates/tangram_maps.html'
})

//@RequireUser()
export class TangramMaps implements OnInit {
  public mapHt:number;
  public tmap:any;
  public scene:any;
  public aqmonitors:any;

  constructor (@Inject(AQMonitorsService) private AQMonitorsService:AQMonitorsService) {
    this.mapHt = window.innerHeight;
  }
  getAQMonitors () {
    this.AQMonitorsService.getAQMonitors().then(aqmonitors =>
      this.processMonitors(aqmonitors)
    );
  }
  processMonitors (aqmonitors){
    this.aqmonitors = aqmonitors
    let feats = this.runData(aqmonitors);
    this.scene.setDataSource('mongodb', {type:'GeoJSON',layer_name: "waterdb", data: feats})
    //  aqmonitors.forEach(function(e){
    //    let feat = this.runData(e);
    //    this.scene.setDataSource('mongodb', {type:'GeoJSON',layer_name: "waterdb", data: feat})
    // //   //console.log(e)
    //  })
    //console.log(aqmonitors)
  }
  runData = function(body){
        var featList = [];
			body.forEach(function(m){
                    if (m.loc){
                //if m.type!=feature, etc.?
//geoJSONVersion should be something universal???
var geoJSONVersion = {"type": "Feature",
    //"id":m._id, //don't know what's going on with the id - defined after this; get undefined whether I have this or not

    "properties": m,
            "geometry": {"type":"Polygon",
"coordinates":[[[m.loc.coordinates[0]+.01,m.loc.coordinates[1]+.01],[m.loc.coordinates[0]-.01,m.loc.coordinates[1]+.01],[m.loc.coordinates[0]+.01,m.loc.coordinates[1]-.01],[m.loc.coordinates[0]+.01,m.loc.coordinates[1]+.01]]]}}
        featList.push(geoJSONVersion)}
                //this.scene.setDataSource('mongodb', {type:'GeoJSON',layer_name: "waterdb", name: "waterdb", data: geoJSONVersion})
				});

    var featGeoJSON = {
        "type": "FeatureCollection",
        "features": featList
    }

    return featGeoJSON
  }

  // getHeroes() {
  //   this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  // }
  // ngOnInit() {
  //   this.getHeroes();
  // }
  ngOnInit() {
     this.makeMap();
     let settings = this.getDefaultSettings().configsettings;
     this.addTangram(settings);
     this.setMap(29.7604,-95.3698,11);
     this.getAQMonitors();
  }
  //should be return <Object?
  //mongodb doesn't save fields that begin with $, so have to clean to and from database
  public cleanMapSettings(oldSettings:string):any {
    let setstring = JSON.stringify(oldSettings).replace(/dollarzoom/g,"$zoom").replace(/dollargeometry/g,"$geometry");
    return JSON.parse(setstring)
  }
  public makeMap ():void{
    this.tmap = L.map('displayMap', {maxZoom:26,zoomControl:false});
    L.control.zoom({ position: 'topright' }).addTo(this.tmap); //put zoom in other controls?
		L.control.scale().addTo(this.tmap);
  }

  public addTangram (sceneYAML:any):void{
    //this.cleanMapSettings('fromdb')
    let layer = Tangram.leafletLayer({
      scene: sceneYAML,
      //eventually attribution should be passed?
      attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a><a href="https://housuggest.org/DASH" target="_blank"> | DASH</a>'
    })
    window.layer = layer;
    let scene = layer.scene;
    this.scene = scene;
    window.scene = scene;
    layer.addTo(this.tmap);
    let self = this;
  }
  public setMap (lat?:number, lng?:number, zoom?:number):void {  //eventually come from geolocation -- check typescript on Leaflet to make sure same type
		this.tmap.setView([lat,lng],zoom);
  }

  public origYAML(jsonobj:string):any {
    return JSON.parse(jsonobj) //or YAML.parse??)
  }

  public readYAML(yamlstr:string):any {
        //return Tangram.debug.yaml.safeLoad(rawyaml [json=true])
        return Tangram.debug.yaml.safeLoad(yamlstr)
    }

getDefaultSettings = function(){return {
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
