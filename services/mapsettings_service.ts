//basic use case is the things like "selected" for both map and data;
//assuming this is better for components to subscribe to, since both are client side components
//http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
//can this be made to work for multiple services?
//doing for mapstyles, first
import 'reflect-metadata';
import { Injectable, NgZone } from '@angular/core';
import { Mapstyles } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
//import {List} from 'immutable'; //http://blog.scottlogic.com/2016/01/05/angular2-with-immutablejs.html
//should do a ChangeDetectionStrategy of push?
//separate this from the service so that it maintains direction of push and immutability
import { BehaviorSubject } from "rxjs/Rx";
import { MapStyle } from './mapstyle_class';

@Injectable()
export class MapSettingService {
    private _mapsetting: BehaviorSubject<Array<string>> = new BehaviorSubject([]);
    public mapsetting: Observable<Array<string>> = this._mapsetting.asObservable();
    constructor() {
      this.loadSetting();
    }


    loadSetting() {
        this.MapStyleService.getMapSetting('default')
            .subscribe(
                res => {
                  let settingself = this;
                  let mapsetting = (<Object[]>res.json()).map((setting: any) =>
                  // layerlist.forEach(function(layer){
                  //   if (!setting.configsettings.layers[layer]){
                  //     setting.configsettings.layers[layer] = settingself.makeLayerSettings();
                  //   }
                  // })
                  new MapStyle({id:setting.id,
                    description:setting.description,
                    state: setting.state,
                    configsettings : setting.configsettings})); //can you make this a function???
                  this._mapsetting.next(mapsetting);
                },
                err => console.log("Error retrieving mapsettings")
            );
    }
    //can I make this more general for textures, blocks, etc.??
    public blocklist = []; //can I make it do a forEach key at every level of the mapstyle_class?
    public makeLayerSettings ():any {
      let tmpset = new MapStyle;
      return tmpset.configsettings.layers['default'];
    }

    addTodo(newTodo:Todo):Observable {

        let obs = this.todoBackendService.saveTodo(newTodo);

        obs.subscribe(
                res => {
                    this._todos.next(this._todos.getValue().push(newTodo));
                },
                err => console.log("Error pushing new")
              );

        return obs;
    }

    toggleTodo(toggled:Todo): Observable {
        let obs: Observable = this.todoBackendService.toggleTodo(toggled);

        obs.subscribe(
            res => {
                let todos = this._todos.getValue();
                let index = todos.findIndex((todo: Todo) => todo.id === toggled.id);
                let todo:Todo = todos.get(index);
                this._todos.next(todos.set(index, new Todo({id:toggled.id, description:toggled.description, completed:!toggled.completed}) ));
            }
        );

        return obs;
    }


    deleteTodo(deleted:Todo): Observable {
        let obs: Observable = this.todoBackendService.deleteTodo(deleted);

        obs.subscribe(
                res => {
                    let todos: List<Todo> = this._todos.getValue();
                    let index = todos.findIndex((todo) => todo.id === deleted.id);
                    this._todos.next(todos.delete(index));

                }
            );

        return obs;
    }


}
