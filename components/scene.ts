//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { OnActivate, Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, DROPDOWN_DIRECTIVES } from '../node_modules/ng2-bootstrap';
import { FORM_DIRECTIVES, Control, ControlGroup, ControlArray, Validators, NgIf, NgFor, NgClass } from '@angular/common';
import { MapStyleService } from '../services/mapstyles_service.ts';
import { DASHValidator } from './dashvalidators.ts';

//check to see if spectrum is packaged for NPM
@Component({
  selector: 'scene',
  providers: [ MapStyleService ],
  directives: [ FORM_DIRECTIVES,
                DROPDOWN_DIRECTIVES,
                ROUTER_DIRECTIVES ],
  templateUrl: 'client/templates/scene.html'
})
//can I declare the var scene from a class?
//@RequireUser()
export class SceneComponent implements OnActivate {
  constructor(
    private MapStyleService: MapStyleService
  ){

  }
  routerOnActivate(curr: RouteSegment): void {
    console.log('routerOnActivate getParam() in scene',curr.getParam('mapID'))
    this.scenelist = this.makeSceneList();
    this.MapStyleService.getDefaultSettings().then(mapstyle => {
      // this.makeConfigSetting(mapstyle);
      this.scene = mapstyle.configsettings.scene;
      this.sceneCtrl = this.makeSceneCtrl(scene);
    });
  }
  //list gives you version with all the options;
  //ctrl only gives you the ones that are on the given map.

  makeSceneList(){
		let bgcolordescript = 'select color for scene background';
		let bgdescript = 'background of scene';
		let animateddescript = 'Animated shaders will trigger redraws by default, but certain other kinds of animation – such as that made through the JavaScript API – may not. Setting this parameter may help in those cases.'
		let backgroundlist = [['color','spectrum','#000000',bgcolordescript,,1]];
		let scenelist = [
			['background','header',backgroundlist,bgdescript,,0],
			['animated','boolean','false',animateddescript,,DASHValidator.isBoolean]
		];
		return scenelist
	}

	makeSceneCtrl(scene){
    //have to make sure there's a scene.color, etc., how would you update it
    //if it's not given??
    //has to be a loop in the logic for not existing is created, including parents
//controlGroups are not same as ngModel form controllers.
    let color = new Control(scene.background.color); //could put something forcing hex - using spectrum, too - can this be reused throughout?
    let background = new ControlGroup({
			color
		})
		let animated = new Control(scene.animated,DASHValidator.isBoolean);
		let sceneCtrl = new ControlGroup({
			background,
			animated
		})
		return sceneCtrl
	}
  updatescene () {
    //this.MapStyleService.Update('whatever this control group is')
    //should be able to make it immediate, but here it's running from the
    //getDefault, so have to have it from the observable.
  }
//would you have to add/remove the controlGroup to the higher one?
//or could it just update straight to the service!!!!
//  configSetCtrl: ControlGroup = new ControlGroup({});
    //this.configSetCtrl.addControl('configCtrl',configCtrl)
    //question is whether I can do these control groups as flat, and then updateValue
    //straight to the service???
}
