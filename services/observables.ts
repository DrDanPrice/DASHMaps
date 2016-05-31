//basic use case is the things like "selected" for both map and data;
//assuming this is better for components to subscribe to, since both are client side components

//can this be made to work for multiple services?
//doing for mapstyles, first
import { Injectable } from "@angular/core";
//import {TodoBackendService} from "../TodoBackendService";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
//import {Todo} from "../Todo";
//import {List} from 'immutable'; //http://blog.scottlogic.com/2016/01/05/angular2-with-immutablejs.html
//should do a ChangeDetectionStrategy of push?
//separate this from the service so that it maintains direction of push and immutability
import { BehaviorSubject } from "rxjs/Rx";
import { MapStyleService } from './mapstyles_service';

@Injectable()
export class ObservableStore {
    private _mapsetting: BehaviorSubject<Array<string>> = new BehaviorSubject([]);
    //public MapStyle:<Object[]> = MapStyleService.MapStyle;
    //public MapSetting:any = MapStyleService.getMapSetting;

    constructor(private MapStyleService: MapStyleService) {
        this.loadSetting();
    }

    loadSetting() {
        this.todoBackendService.getAllTodos()
            .subscribe(
                res => {
                    let mapsetting = (<Object[]>res.json()).map((setting: any) =>
                        new MapStyle({id:setting.id,
                          description:setting.description,
                          state: setting.state,
                          configsettings : setting.configsettings}));
                    this._mapsetting.next(mapsetting);
                },
                err => console.log("Error retrieving mapsettings")
            );

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
