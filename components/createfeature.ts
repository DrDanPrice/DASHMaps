//import { RequireUser } from 'angular2-meteor-accounts-ui';
//needs to have a state? or when you click, it takes you to a feature if it's there, or offers to create new
//when it's create new, then it gives you a drawing canvas - draw on map, just no background;
//draw on canvas, white background - anchored to a Point
//can it be anchored to an idea? why not?
//just have it be attachable to the other types - questions/themes?
//attach new feature to same point/theme should also be possible; they then show
//up as "linked" features in the same way as linked questions/features.
//links should have their own component?  


import { OnActivate, CanDeactivate, Router, RouteSegment } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';

@Component({
  selector: 'create-feature',
  templateUrl: 'client/templates/create_feature.html'
})

//@RequireUser()
export class CreateFeature implements OnActivate, CanDeactivate {
  constructor (
    private router: Router
  ){
  }
  routerOnActivate(curr: RouteSegment): void {
    console.log('create Feature routerOnActivate')
    this.router.navigate(['/features/createfeature']);
    //let id = +curr.getParam('id');
    //this.getAQMonitor(id).then(feature => this.feature = feature);
  }
  routerCanDeactivate(): any {
    console.log('routerCanDeactivate in createfeature; test for save state')
    return confirm('are you sure?');
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
    // if (!this.crisis || this.crisis.name === this.editName) {
    //   return true;
    // }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    //return this.dialog.confirm('Discard changes?');
  }
  ngOnInit() {
    // this.router.navigate(['/features/createfeature']);
  }
}
