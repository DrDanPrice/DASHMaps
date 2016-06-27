//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';
import { MapStyleService } from '../services/mapstyles_service.ts';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'map-display',
  providers: [ MapStyleService ],
  templateUrl: 'client/templates/map.html'
})

//@RequireUser()
export class MapComponent implements OnActivate{
  constructor(
    private MapStyleService: MapStyleService
  ){
  //  super()
  }
  routerOnActivate(curr: RouteSegment): void {

    let stylename:string = curr.getParam('localmapstylename');
    //console.log(stylename)

    // let stylename = curr.getParam('localmapstylename');
    //
    //
    //if (stylename==undefined){stylename='default';console.log('adfsdfs')}
    this.MapStyleService.setWorkingMapSetting(stylename);
    //console.log('routerOnActivate getParam() in map',curr.getParam('localmapstylename'))
    //this.getMapSettings()
    //this should write out to the service, which should determine the mapstyles to show
    //should treat getParam as a promise?
  }

  // getWorkMapSet(newSet:Array<any>):Observable {
  //
  //     let obs = this.todoBackendService.saveTodo(newTodo);
  //
  //     obs.subscribe(
  //             res => {
  //                 this._todos.next(this._todos.getValue().push(newTodo));
  //             },
  //             err => console.log("Error pushing new")
  //           );
  //
  //     return obs;
  // }

  mapstyle:any;
  getMapSettings () {
    this.MapStyleService.getDefaultSettings().then(mapstyle => {
      this.mapstyle = mapstyle;
      console.log('mapstyle on map delivered')
    });
  }
  //idea here is to just have it deal with the params as if a service?
  //https://github.com/valor-software/ng2-bootstrap/tree/development/demo/components/alert
}
