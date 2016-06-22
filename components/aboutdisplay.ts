import 'reflect-metadata';
//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'about-display',
  directives: [
                ROUTER_DIRECTIVES
              ],
  templateUrl: 'client/templates/about_display.html'
})

//@RequireUser()
export class AboutComponent { }
