//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AQMonitorsService } from '../services/aqmonitors_service.ts';
import { MapStyleService } from '../services/mapstyles_service.ts';

declare var L:any;
declare var Tangram:any;
declare var window:any;

@Component({
  selector: 'tangram-map',
  providers: [AQMonitorsService, MapStyleService],
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

  constructor (@Inject(AQMonitorsService) @Inject(MapStyleService)
    private AQMonitorsService: AQMonitorsService,
    private MapStyleService: MapStyleService,
    private router: Router)
  {
    this.mapHt = window.innerHeight;
  }
  getAQMonitorCursor () {
    let featList = [];
    let aqmonitors = this.AQMonitorsService.getAQMonitorCursor();
    aqmonitors.then(cursor => {
      cursor.forEach(function(m){
        if (m.loc){
          let geoJSONVersion = {"type": "Feature",
            "properties": m,
            "geometry": {"type":"Polygon",
            "coordinates":[[[m.loc.coordinates[0]+.01,m.loc.coordinates[1]+.01],[m.loc.coordinates[0]-.01,m.loc.coordinates[1]+.01],[m.loc.coordinates[0]+.01,m.loc.coordinates[1]-.01],[m.loc.coordinates[0]+.01,m.loc.coordinates[1]+.01]]]}}
          featList.push(geoJSONVersion)
          };
      })
  })
 }
  //from fetch:
  getAQMonitors () {
    this.AQMonitorsService.getAQMonitors().then(aqmonitors =>
      this.processMonitors(aqmonitors)
    );
  }
  processMonitors (aqmonitors){
    //this.aqmonitors = aqmonitors //add when doing filter
    let feats = this.runData(aqmonitors);
    this.scene.setDataSource('mongodb', {type:'GeoJSON',layer_name: "aqmonitors", data: feats})
  }
  runData = function(body){
        var featList = [];
			body.forEach(function(m){
          if (m.loc){
                //if m.type!=feature, etc.?
//geoJSONVersion should be something universal???
let geoJSONVersion = {"type": "Feature",
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
  getSettings () {
    this.MapStyleService.getDefaultSettings().then(mapsettings => {
      this.addTangram(mapsettings.configsettings);
    });
  }
  ngOnInit() {
     this.makeMap();
     this.getSettings();
     this.setMap(29.7604,-95.3698,11);
     this.getAQMonitors();
     //this.getAQMonitorCursor();
  }
  //should be return <Object?

  public makeMap ():void{
    this.tmap = L.map('displayMap', {maxZoom:26,zoomControl:false});
    L.control.zoom({ position: 'topright' }).addTo(this.tmap); //put zoom in other controls?
		L.control.scale().addTo(this.tmap);
  }

  public addTangram (sceneYAML:any):void{
    //this.cleanMapSettings('fromdb')
    //this may change how we do controllers: https://github.com/tangrams/tangram/pull/263
    let funcself = this;
    let layer = Tangram.leafletLayer({
      scene: sceneYAML,
      events: {
        //hover: function(selection) { console.log('Hover!', selection); },
        click: function(selection) {
          funcself.detailDisplay(selection);
        }
      },
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
  public detailDisplay(selection):void {
    console.log('selection in func', selection) //.feature.properties.AQSID)
    let latlng:any = selection.leaflet_event.latlng
    console.log(latlng)
    this.router.navigate(['/features', {title:'from tangrammaps.ts',properties:selection}]);
    //try with one of the ones with POIS.
    //could have it go to that AQSID, or to _id for all the features
    //could also try for a more general way of dealing with features.
  }



}
