import { Injectable, NgZone } from '@angular/core';
import { Monitors } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';
import { MeteorComponent } from 'angular2-meteor';

//mock a promise return first
//then build it up
@Injectable()
export class AQMonitorsService{//} extends MeteorComponent{
  monitors:Mongo.Cursor<Object>;
  subs:any;

  constructor(zone:NgZone){
    //super();
    // Tracker.autorun(() => zone.run(() => {
		// this.subscribe('monitors', () => {
		// 	this.monitors = Monitors.find();
		// },true);
		// }));
  }
  getAQMonitors() {

   //let monitors = Monitors.find();
    // let numb = monitors.count();
		let dbDataProm =  new Promise((resolve, reject) => {
			let sub = Meteor.subscribe('monitors')
        //    let data = self.subs.getMonitors().fetch();
			Tracker.autorun(computation => {
		        if (sub.ready()) {
					computation.stop() //not sure if necessary for sub?
					let data = Monitors.find().fetch();
		            resolve(data)
		        }
			})
		});
    return dbDataProm;
  //   dbDataProm.then((body) => {
	// 		console.log('body',body)
  //   //return Promise.resolve(monitors);
  // })
}
  // getHeroesSlowly() {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
  //   );
  // }
}
