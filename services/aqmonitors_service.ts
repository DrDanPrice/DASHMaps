import { Injectable } from '@angular/core';
import { Monitors } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';


//mock a promise return first
//then build it up
@Injectable()
export class AQMonitorsService {
  AQmonitors:Mongo.Cursor<Object>;
  getAQMonitors() {

    let AQmonitors = Monitors.find();
    return Promise.resolve(AQmonitors);
  }
  // getHeroesSlowly() {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
  //   );
  // }
}
