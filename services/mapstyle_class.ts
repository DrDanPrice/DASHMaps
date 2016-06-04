export class MapStyle {
  //can have time, etc., at point at which it's new, and then can also put in stuff about being complete or not
  //get scene settings from the returned object, .configsettings
  //put in globals!  https://mapzen.com/documentation/tangram/global/
  //this could have a set of options - then run through the process in observables of making it
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
		          "color": "#3d8ca3",
              "interactive": true
		        }
		      }
		    },
		    "roads": {
		      "data": {
		        "source": "osm"
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
        "default": {
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
