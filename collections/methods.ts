import {Mapstyles, Collects, Monitors, Features} from './collects';

function getContactEmail(user: Meteor.User): string {
    if (user.emails && user.emails.length)
        return user.emails[0].address;

    return null;
};


Meteor.methods({
	updateMapstyle: function(mapstyle,user){ //need logic for user
		Mapstyles.update(
			{'mapstyle.name':mapstyle.name},
			{mapstyle},
			{upsert:true}
		)
	},
    updateMonitors: function(obj,user){ //need logic for user
		Monitors.update(
            {'_id':obj._id},
            {$set:{loc:obj.loc}},
            {upsert:true}
		)
	},

  deleteMapstyle: function(mapstyle,user){ //need logic for user
		Mapstyles.remove(
			{'mapstyle.name':mapstyle.name}
		)
	},

  UpdateFeature: function(obj){
    Features.insert(obj)
  },
/*
	getHTTPdata: function(url){
		if(Meteor.isServer){ //else it runs into CORS
		Meteor.http.get(url, {},function( error, response ) {
			if ( error ) {
			    console.log( 'error in http', error );
			  };
            if ( response.statusCode = '200' ) {
                 lines = [];
            //console.log( 'this is response', response );
                  let jsonpResp = response.content;
                    var f = new Function ("callbackFunc", jsonpResp)
                    f( function (json){
                        //console.log(json.data)
    json.data.forEach(function(d){
        var label = {"type": "Feature",
            "properties": {'label_id': d.label_id},
            "geometry": {"type":"Polygon",
    "coordinates":[d.polygon]}}
    lines.push(label)
        })
    var featGeoJSON = {
        "type": "FeatureCollection",
        "features": lines
    }
  //                  [[make into a FeatureCollection]]
    Features.insert(featGeoJSON)

		}); //end of f
		} //end of if 200
            }); //end of get
        }; //end of if server
    } //end of getHTTPdata
    */
});
