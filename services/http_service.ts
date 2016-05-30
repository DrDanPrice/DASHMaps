//or all as part of a methods call????


import { Injectable, NgZone } from '@angular/core';
import { Monitors } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';
import { MeteorComponent } from 'angular2-meteor';

//mock a promise return first
//then build it up
@Injectable()
export class HTTPService{//} extends MeteorComponent{
  //follow AirDayWarn and more general service

  constructor(zone:NgZone){
  }

  url:string = 'http://houstoncan.airalliancehoust.netdna-cdn.com/ozone-viewer-api/contour.php?callback=callbackFunc&type=jsonp&timestamp=1422424800&bandschema=4';

  //image upload handling
/* http://www.metaltoad.com/blog/angular-2-http-observables

    } */
}
