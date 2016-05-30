//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, NgZone, Inject, Injectable } from '@angular/core';
import { FORM_DIRECTIVES, Control, ControlGroup, ControlArray, Validators, NgIf, NgFor, NgClass } from '@angular/common';
import { OnActivate, Routes, Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { DASHValidator } from './dashvalidators.ts';
import { FileUploadService } from '../services/fileupload_service.ts';
import { MapStyleService } from '../services/mapstyles_service.ts';

@Component({
  selector: 'style-display',
  providers: [ FileUploadService, MapStyleService ],
  directives: [ FORM_DIRECTIVES, NgIf, NgClass ],
  templateUrl: 'client/templates/style_display.html'
})

//@RequireUser()
@Injectable()
export class StyleComponent implements OnActivate, OnInit, AfterViewInit {// extends MeteorComponent {
  test:string;
  constructor(
    private FileUploadService: FileUploadService,
    private MapStyleService: MapStyleService,
    private router: Router
  ){
    //this.getMapSettings();

  //  super()
  }
  routerOnActivate(curr: RouteSegment): void {
    console.log('routerOnActivate in styledisplay',curr)
    //this.test = curr.getParam('test');
    //this.mapstyle = curr.getParam('mapstyle');
    this.MapStyleService.getDefaultSettings().then(mapstyle => {
      this.mapstyle = mapstyle;
    });
    //this.router.navigate(['/styles']);
    //this.router.navigate(['/features', {title:this.title,properties:this.properties}]);
    //this.getAQMonitor(id).then(feature => this.feature = feature);
  }
  mapstyle:any;
  getMapSettings () {
    this.MapStyleService.getDefaultSettings().then(mapstyle => {
      this.mapstyle = mapstyle;
    });
  }
  configSetCtrl: ControlGroup = new ControlGroup({});
	/*makeConfigSetting(configList){
		let stylename = new Control(configList[0][2], Validators.compose([ Validators.required, DASHValidator.isValidTxt ]));
		let owner = new Control(configList[1][2], Validators.compose([ Validators.required, DASHValidator.isValidTxt ]));
		let attribution = new Control(configList[2][2], Validators.compose([ Validators.required, DASHValidator.isValidTxt ]));
		let creationdate = new Control(configList[3][2], Validators.compose([ Validators.required, DASHValidator.isValidDate ]));
//		let moddates = [];
//		let modificationdates = new ControlArray(this.moddates);
		let notes = new Control(configList[4][2], DASHValidator.isValidTxt);
		let description = new Control(configList[5][2], DASHValidator.isValidTxt);
		let configCtrl = new ControlGroup({
			stylename,
			owner,
			attribution,
			creationdate,
//			modificationdates,
			notes,
			description
		})
		return configCtrl
	}*/
  ngOnInit() {
    console.log('oninit in styledisplay')
  }
  ngAfterViewInit() {
    console.log('onafterview init in styledisplay')
  }
  //could have routes for the different fields in the YAML

}
