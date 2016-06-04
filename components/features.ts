//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, Inject, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { OnActivate, Routes, Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { FORM_DIRECTIVES, Control, ControlGroup, ControlArray, Validators, NgIf, NgFor, NgClass } from '@angular/common';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, DROPDOWN_DIRECTIVES } from '../node_modules/ng2-bootstrap';
import { AQMonitorsService } from '../services/aqmonitors_service.ts';
import { FileUploadService } from '../services/fileupload_service.ts';
import { DASHValidator } from './dashvalidators.ts';
import { CreateFeature } from './createfeature.ts';
import { ManageFeatures } from './managefeatures.ts';
import { LinkedComponent } from './linked.ts';

@Component({
  selector: 'feature-display',
  providers: [ AQMonitorsService, FileUploadService ],
  directives: [
                ROUTER_DIRECTIVES,
                DROPDOWN_DIRECTIVES,
                LinkedComponent
              ],
  templateUrl: 'client/templates/features.html'
})
@Routes([
    { path: '/createfeature', component: CreateFeature },
    { path: '/managefeatures', component: ManageFeatures }
])
//@RequireUser()
export class FeatureComponent implements OnActivate {
  //  feature: Feature; perhaps have as form coming from ManageFeatures?
  monitor: any;
  feature: any;
  aqmonitors: any; // Mongo.Cursor<Object>;
  featureproperties: any;
  title:string;
  instruction:any;
  constructor (
    @Inject(AQMonitorsService) private AQMonitorsService:AQMonitorsService,
    private FileUploadService:FileUploadService,
    private router: Router, private curr: RouteSegment
  ){
    this.title = curr.getParam('title');
  }

  getAQMonitor (id):any {
    this.aqmonitors = this.AQMonitorsService.getAQMonitorCursor();
    this.aqmonitors.then(cursor =>
      this.monitor = cursor.findOne(id)
   )
 }
  routerOnActivate(curr: RouteSegment): void {
    console.log('routerOnActivate',curr.getParam('title'))
    this.title = curr.getParam('title');
    this.featureproperties = curr.getParam('properties');
    //this.router.navigate(['/features', {title:this.title,properties:this.properties}]);
    //this.getAQMonitor(id).then(feature => this.feature = feature);
  }
  gotoFeatures(properties) {
    // Like <a [routerLink]="['/heroes']">Heroes</a>
    this.router.navigate(['/features', {title:'from gotoFeatures',properties:properties}]);
  }
  addremoveTags:boolean;
  editTags() : void {
//add check for user permissions
    this.addremoveTags = !this.addremoveTags
  }

  type: Control = new Control('Feature',Validators.compose([Validators.required,DASHValidator.isValidType]));
  id: Control =  new Control('testID'); //Spec has it as member of Feature, OSM uses it as member of properties inside Feature

  geomtype: Control = new Control('Point',Validators.compose([Validators.required,DASHValidator.isValidType]));
//geomtype should also change drawstate
  latitude = new Control('',Validators.compose([Validators.required,DASHValidator.isValidCoord]));
  longitude = new Control('',Validators.compose([Validators.required,DASHValidator.isValidCoord]));
  latpositions: Control[] = [];
  lngpositions: Control[] = [];
  latcoordinates: ControlArray = new ControlArray(this.latpositions);
  lngcoordinates: ControlArray = new ControlArray(this.lngpositions);

  addPosition(latitude?:number,longitude?:number): void {
      this.latpositions.push(new Control(latitude)); //rework the Validators!!
  this.lngpositions.push(new Control(longitude));
  this.latcoordinates.updateValueAndValidity();
  this.lngcoordinates.updateValueAndValidity();
  }
addPoint2Positions(drawstate,latlng){
      this.latpositions.push(new Control(latlng.lat));
  this.lngpositions.push(new Control(latlng.lng));
  this.latcoordinates.updateValueAndValidity();
  this.lngcoordinates.updateValueAndValidity();
  //console.log(drawstate,latlng.lng,latlng.lat,this)
}
  GeoJSONTypes: Array<string> = ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection", "Feature", "FeatureCollection"];

  geometry: ControlGroup = new ControlGroup({
      geomtype: this.geomtype, //has to be renamed as type?
      latcoordinates: this.latcoordinates,
  lngcoordinates: this.lngcoordinates
  });

//for OSM/Tangram, properties need to have kind and name - could have kind as drop down with an add your own:
  kind: Control = new Control('building',DASHValidator.isValidTxt);
  name: Control = new Control('anonymous',DASHValidator.isValidTxt);
  description: Control = new Control('',DASHValidator.isValidTxt);

  properties: ControlGroup = new ControlGroup({});
  proplist: Array<string> = [];
  propname: Control = new Control('new property',DASHValidator.isValidTxt);
  propvalue: Control = new Control('new value',DASHValidator.isValidTxt);
  controlTypes: Array<string> = ["short text", "long text", "drop down", "marker", "image", "video", "number", "data", "calculated", "script", "canvas"];
  ctrltype: Control = new Control('text',DASHValidator.isValidTxt);

  Feature: ControlGroup = new ControlGroup({
      geometry: this.geometry,
      properties: this.properties,
      id: this.id
  })
  features: Control[] = [
      this.Feature
  ]

  FeatureCollection = new ControlArray(this.features);
  layername: Control = new Control('',DASHValidator.isValidTxt);

  Layer: ControlGroup = new ControlGroup({
      name: this.layername,
      FeatureCollection: this.FeatureCollection
  });
  Layers: Control[] = [
      this.Layer
  ]
  //useful for testing - visualizes whichever form you need and shows it on template
  get geoJSONvalue(): string {
      return JSON.stringify(this.Feature.value, null, 2);
  }

  newprop: ControlGroup = new ControlGroup({
      propname: this.propname,
      propvalue: this.propvalue,
      ctrltype: this.ctrltype
  })
  addProps(name:string,ctrl:any,ctrltype:string): void {
      this.properties.addControl(name,ctrl)
      //this.proplist.push([name,ctrltype])
      this.proplist.splice(0, 0, [name,ctrltype]);
  }
  addNewProp(newprop:ControlGroup): void {  //not sure if it helps to type newprop coming in?
      //newprop.ctrltype will decide what sort of validator it gets
      this.properties.addControl(newprop.propname,new Control(newprop.propvalue,DASHValidator.isValidTxt));
      this.proplist.push([newprop.propname,newprop.ctrltype]);
  }
removeProperty(prop:ControlGroup): void {
  //have it go to a confirm first; only on certain fields, etc.
  var r = confirm("Remove "+prop+"?");
  if (r == true) { //need to check for user permissions, etc.
    this.properties.removeControl(prop);
    for (var propind=0;propind<this.proplist.length-1;propind++){
      if (prop == this.proplist[propind][0]){
        this.proplist.splice(propind, 1);
        return
      }
    }
  } else {
      console.log('remove '+prop+' canceled');
  }
}

addNewFeature(Feature:ControlGroup): void {
//need to make it right shape and save to features on sub
      console.log(Feature)
  }

newctrlType(val) : void {
  if (val=="image"){
    this.addProps('imgsrc',this.imgsrc,'image');
  }else{
    console.log('figure out what to do with others: ',val)
  }
}

//image upload handling

imgsrc: Control = new Control(''); //can do validity checks? xss attacks?
imageChangeEvent($event) : void {
  FileUploadService.readInputImage($event.target);
  //not sure how the form control deals with images
}

  ngOnInit() {
    console.log('oninit fired in features.ts')
    //this.router.navigate(['/features', {title:this.title,properties:this.properties}]);
  }
}
