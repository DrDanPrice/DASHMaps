import 'reflect-metadata';
import {Mapstyles, Collects, Monitors, Features, Grids} from '../collections/collects';

import '../services/methods';



  Meteor.publish('mapstyles',function(){    //function(user){
    			//add user roles/permissions and other ways of looking for just textures, etc.
    	return Mapstyles.find({});
	});

	Meteor.publish('collects',function(){//function(user){
    	//add user roles/permissions
    	return Collects.find({});
	});
	Meteor.publish('monitors',function(query){ //query is already an object
        //this.ready(); //
    	return Monitors.find({query});
	});
	Meteor.publish('monitorsnear', function(latLng,subDist) {
	    return Monitors.find({'loc': {
	      $near:  {
	        $geometry: {
	          type: 'Point',
	          coordinates: latLng
	        },
	        $maxDistance: subDist
	      }
	    }
	  });
	});

	Meteor.publish('monitorswithin', function(latLngPolygon) {
	    return Monitors.find({ 'loc': {
	      $geoWithin: {
	         $geometry: {
	            type: "Polygon" ,
	            coordinates: latLngPolygon
	         }
	      }
	   }})
	});

	Meteor.publish('features',function(){ //have to put in user for all of these
    console.log('in main feats',Features.find().count())
    	return Features.find({});
	});
	Meteor.publish('featuresnear', function(latLng,subDist) {
	    return Features.find({'loc': {
	      $near:  {
	        $geometry: {
	          type: 'Point',
	          coordinates: latLng
	        },
	        $maxDistance: subDist
	      }
	    }
	  });
	});

	Meteor.publish('featureswithin', function(latLngPolygon) {
	    return Features.find({ 'loc': {
	      $geoWithin: {
	         $geometry: {
	            type: "Polygon" ,
	            coordinates: latLngPolygon
	         }
	      }
	   }})
	});
  Meteor.publish('grids',function(){
    	return Grids.find({});
	});
	Meteor.publish('gridsnear', function(latLng,subDist) {
	    return Grids.find({'loc': {
	      $near:  {
	        $geometry: {
	          type: 'Point',
	          coordinates: latLng
	        },
	        $maxDistance: subDist
	      }
	    }
	  });
	});

	Meteor.publish('gridswithin', function(latLngPolygon) {
	    return Grids.find({ 'loc': {
	      $geoWithin: {
	         $geometry: {
	            type: "Polygon" ,
	            coordinates: latLngPolygon
	         }
	      }
	   }})
	});
