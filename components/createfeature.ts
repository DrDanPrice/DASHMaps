//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';

@Component({
  selector: 'create-feature',
  templateUrl: 'client/templates/create_feature.html'
})

//@RequireUser()
export class CreateFeature implements OnActivate {
  constructor (
    private router: Router
  ){}
  routerOnActivate(curr: RouteSegment): void {
    console.log('create Feature routerOnActivate')
    //let id = +curr.getParam('id');
    //this.getAQMonitor(id).then(feature => this.feature = feature);
  }
  ngOnInit() {
    this.router.navigate(['/features']);
  }
}
