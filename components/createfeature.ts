//import { RequireUser } from 'angular2-meteor-accounts-ui';
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
    console.log('routerCanDeactivate in createfeature')
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
