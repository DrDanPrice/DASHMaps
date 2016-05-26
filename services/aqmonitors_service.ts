import { Injectable, NgZone } from '@angular/core';
import { Monitors } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';
//import {MeteorComponent} from 'angular2-meteor';

//mock a promise return first
//then build it up
@Injectable()
export class AQMonitorsService { //} extends MeteorComponent{
  monitors:Mongo.Cursor<Object>;

  constructor(zone:NgZone){
    // Tracker.autorun(() => zone.run(() => {
		// this.subscribe('monitors', () => {
		// 	this.monitors = Monitors.find();
		// },true);
		// }));
  }
  getAQMonitors() {

   let monitors = Monitors.find();
    // let numb = monitors.count();
    return Promise.resolve(monitors);
  }
  // getHeroesSlowly() {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
  //   );
  // }
}
