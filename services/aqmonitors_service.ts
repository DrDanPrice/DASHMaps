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
    //I could not get it to work as extending MeteorComponent;
    //the error seemed to be related to library calls, which were solved by
    //putting in more recent versions of files in angular2-meteor,
    //but it kept introducing new problems - might try again after his update to npm
    //super();
    // Tracker.autorun(() => zone.run(() => {
		// this.subscribe('monitors', () => {
		// 	this.monitors = Monitors.find();
		// },true);
		// }));
  }
  getAQMonitors() {
		let dbDataProm =  new Promise((resolve, reject) => {
			let sub = Meteor.subscribe('monitors')
			Tracker.autorun(computation => {
		        if (sub.ready()) {
					computation.stop() //not sure if necessary for sub?
					let data = Monitors.find().fetch();
		            resolve(data)
		        }
			})
		});
    return dbDataProm;
}
getAQMonitorCursor() {
  let dbDataCursor =  new Promise((resolve, reject) => {
    let sub = Meteor.subscribe('monitors')
    Tracker.autorun(computation => {
          if (sub.ready()) {
        computation.stop() //not sure if necessary for sub?
        let data = Monitors.find();//.fetch();
              resolve(data)
          }
    })
  });
  return dbDataCursor;
}
  // getHeroesSlowly() {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
  //   );
  // }
}
