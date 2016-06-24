//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, NgZone, Inject, Injectable } from '@angular/core';
import { FORM_DIRECTIVES, FORM_PROVIDERS, NgForm, Control, ControlGroup, ControlArray, Validators, NgIf, NgFor, NgClass } from '@angular/common';
import { OnActivate, Routes, Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, DROPDOWN_DIRECTIVES } from '../node_modules/ng2-bootstrap';
import { MeteorComponent } from 'angular2-meteor';
import { DASHValidator } from './dashvalidators.ts';
import { FileUploadService } from '../services/fileupload_service.ts';
import { MapStyle } from '../services/mapstyle_class';
import { MapStyleService } from '../services/mapstyles_service.ts';
import { SceneComponent } from './scene.ts';

@Component({
  selector: 'style-display',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ FileUploadService, MapStyleService, FORM_PROVIDERS],//, ControlGroup ],
  directives: [ FORM_DIRECTIVES,
                NgIf,
                //NgClass,
                DROPDOWN_DIRECTIVES,
                ROUTER_DIRECTIVES
              ],
  templateUrl: 'client/templates/style_display.html'
})
@Routes([
     { path: '/scene', component: SceneComponent }//,
//     //{ path: '/globals', component: GlobalsComponent },
//     // { path: '/cameras', component: CameraComponent },
//     // { path: '/lights', component: LightsComponent },
//     // { path: '/sources', component: SourcesComponent },
//     // { path: '/styles', component: StylesComponent },
//     // { path: '/textures', component: TexturesComponent },
//     // { path: '/layers', component: LayersComponent }
 ])

//@RequireUser()
@Injectable()
export class StyleComponent implements OnActivate, OnInit, AfterViewInit {// extends MeteorComponent {
  test:string;
  //http://victorsavkin.com/post/110170125256/change-detection-in-angular-2
//  constructor(@Inject(forwardRef(() => MapStyleService)) MapStyleService,
  constructor(@Inject(MapStyleService, FileUploadService)
    private MapStyleService: MapStyleService,
    private FileUploadService: FileUploadService,
    private router: Router,
    //public ControlGroup: ControlGroup
    //public form: ControlGroup
    //public configSetCtrl: ControlGroup,// = new ControlGroup({});
  ){
    let mapstyle = new MapStyle; //needed to fill for html; replaced by promise
    let configSetCtrl: ControlGroup = new ControlGroup({})
    this.makeConfigSetting(mapstyle);
    //let configCtrl: ControlGroup = new ControlGroup({});
    // this.form.valueChanges
    //       .map((value) => {
    //           value.firstName = value.firstName.toUpperCase();
    //           return value;
    //       })
    //       .filter((value) => this.form.valid)
    //       .subscribe(validValue =>
    //         console.log('in')
    //       );
    //this.makeConfigSetting(mapstyle);
    //this.getMapSettings();
    //  super()
  }


  routerOnActivate(curr: RouteSegment): void {
    console.log('routerOnActivate getParam() in styledisplay',curr.getParam())
    //this.test = curr.getParam('test');
    //this.mapstyle = curr.getParam('mapstyle');
    this.MapStyleService.getDefaultSettings().then(mapstyle => {
      // this.makeConfigSetting(mapstyle);
      this.mapstyle = mapstyle; //have to load it into the control to show up
//      this.makeConfigSetting(mapstyle);
      // console.log('mapstyle delivered',this.configSetCtrl.controls['configCtrl'].controls['styleowner'])
      // this.configSetCtrl.controls['configCtrl'].controls['styleowner'].updateValue(mapstyle['styleowner']);
      //could walk the json and try to set each individually??
    });
    //this.router.navigate(['/styles']);
    //this.router.navigate(['/features', {title:this.title,properties:this.properties}]);
    //this.getAQMonitor(id).then(feature => this.feature = feature);
  }
  //mapstyle:any;
  // getMapSettings () {
  //   this.MapStyleService.getDefaultSettings().then(mapstyle => {
  //     this.mapstyle = mapstyle;
  //   });
  // }
  configSetCtrl = new ControlGroup({});
	makeConfigSetting(config){
		let stylename: Control = new Control(config.stylename, Validators.compose([ Validators.required, DASHValidator.isValidTxt ]));
    let styleowner: Control = new Control(config.styleowner, Validators.compose([ Validators.required, DASHValidator.isValidTxt ]));
    let styleattribution = new Control(config.attribution, Validators.compose([ Validators.required, DASHValidator.isValidTxt ]));
// 		let creationdate = new Control(config.creationdate, Validators.compose([ Validators.required, DASHValidator.isValidDate ]));
//     let collectiontype = new Control(config.stylename, Validators.compose([ Validators.required, DASHValidator.isValidTxt ]));
// //		let moddates = [];
//		let modificationdates = new ControlArray(this.moddates);
//		let notes = new Control(configList[4][2], DASHValidator.isValidTxt);
		let styledescription = new Control(config.description, DASHValidator.isValidTxt);
		let configCtrl: ControlGroup = new ControlGroup({
			stylename,
		  styleowner,
			styleattribution,
//       collectiontype,
// 			creationdate,
// //			modificationdates,
//			notes,
			styledescription
		})
    this.configCtrl = configCtrl;
//    this.configSetCtrl.addControl('configCtrl',configCtrl);
    //this.configSetCtrl.controls['configCtrl'].controls['styleowner'].valueChanges
/*    this.configSetCtrl.valueChanges
        .map((value) => {
          console.log(value)
            //value.stylename = value.stylename.toUpperCase();
            return value;
        })
        .subscribe(value => {
           console.log("Model Driven Form valid value: vm = " +         JSON.stringify(value));
        });*/
		return //configCtrl
	}
  ngOnInit() {
    console.log('oninit in styledisplay')
  }
  ngAfterViewInit() {
    console.log('onafterview init in styledisplay')
  }
  onSubmit() {
        console.log("model-based form submitted");
        console.log(this.configSetCtrl);
    }
  //could have routes for the different fields in the YAML

}
