import 'reflect-metadata';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, TAB_DIRECTIVES } from '../node_modules/ng2-bootstrap';
//https://github.com/valor-software/ng2-bootstrap/tree/development/demo
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { InjectUser, LoginButtons } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { TangramMaps } from './ts/tangrammaps.ts';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  changeDetection: ChangeDetectionStrategy.OnPush, //need to research this more
  directives: [
                CORE_DIRECTIVES,
                TAB_DIRECTIVES,
                LoginButtons
              ]
})
@Routes([
    // these are our two routes
    { path: '/', component: TangramMaps }//, // , useAsDefault: true}, // coming soon
//    { path: '/about', component: AboutComponent }
])
@InjectUser()
export class DASHMaps extends MeteorComponent implements OnInit {
  user: Meteor.User;

constructor(private router: Router) {
  //constructor() {
    super();
    console.log('the @InjectUser gives you Meteor.User here',this.user);
  }



   ngOnInit() {
     console.log('weret')
     this.router.navigate(['/']);
   }

  logout() {
    this.autorun(() => {
      Meteor.logout();
    });
  }
}
