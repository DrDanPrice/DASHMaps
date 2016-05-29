import 'reflect-metadata';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, DROPDOWN_DIRECTIVES } from '../node_modules/ng2-bootstrap';
//https://github.com/valor-software/ng2-bootstrap/tree/development/demo
import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { InjectUser, LoginButtons } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

//components here - for Meteor, they need to load from folder at higher level!
import { TangramMaps } from '../components/tangrammaps.ts';
import { AboutComponent } from '../components/aboutdisplay.ts';
import { WelcomeComponent } from '../components/welcome.ts';
import { UserComponent } from '../components/userdisplay.ts';
import { DataComponent } from '../components/datadisplay.ts';
import { StyleComponent } from '../components/styledisplay.ts';
import { QuestionsComponent } from '../components/questions.ts';
import { FeatureComponent } from '../components/features.ts';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  changeDetection: ChangeDetectionStrategy.OnPush, //need to research this more
  directives: [
                CORE_DIRECTIVES,
                ROUTER_DIRECTIVES,
                DROPDOWN_DIRECTIVES,
                LoginButtons,
                TangramMaps
              ]
})
@Routes([
    { path: '/', component: WelcomeComponent },
    { path: '/about', component: AboutComponent },
    { path: '/data', component: DataComponent },
    { path: '/userdisplay', component: UserComponent },
    { path: '/styles', component: StyleComponent },
    { path: '/questions', component: QuestionsComponent },
    //https://angular.io/docs/ts/latest/guide/router.html
    { path: '/features', component: FeatureComponent }
    //{ path: '/features/:featureID', component: FeatureComponent } // I don't think it needs this, but haven't tested
])
@InjectUser()
export class DASHMaps extends MeteorComponent implements OnInit {
  user: Meteor.User;

constructor(private router: Router) {
  //constructor() {
    super();
    console.log('the @InjectUser gives you Meteor.User here',this.user);
  }

  onSelect() {
    console.log('wetf')
    this.router.navigate(['/data']);
    //this.router.navigate(['/hero', hero.id]);
  }

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  logout() {
    this.autorun(() => {
      Meteor.logout();
    });
  }

  ngOnInit() {
    console.log('oninit fired in app.ts')
     this.router.navigate(['/']);
  }

}
