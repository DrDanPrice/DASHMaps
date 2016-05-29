//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, Inject, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { OnActivate, Routes, Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, DROPDOWN_DIRECTIVES } from '../node_modules/ng2-bootstrap';
import { AQMonitorsService } from '../services/aqmonitors_service.ts';
import { CreateFeature } from './createfeature.ts';
import { ManageFeatures } from './managefeatures.ts';

@Component({
  selector: 'feature-display',
  providers: [AQMonitorsService],
  directives: [
                ROUTER_DIRECTIVES,
                DROPDOWN_DIRECTIVES
              ],
  templateUrl: 'client/templates/features.html'
})
@Routes([
    { path: '/createfeature', component: CreateFeature },
    { path: '/managefeatures', component: ManageFeatures }
])
//@RequireUser()
export class FeatureComponent implements OnActivate {
  //  feature: Feature; perhaps have as form coming from ManageFeatures?
  monitor: any;
  feature: any;
  aqmonitors: any; // Mongo.Cursor<Object>;
  constructor (
    @Inject(AQMonitorsService) private AQMonitorsService:AQMonitorsService,
    private router: Router
  ){}

  getAQMonitor (id):any {
    this.aqmonitors = this.AQMonitorsService.getAQMonitorCursor();
    this.aqmonitors.then(cursor =>
      this.monitor = cursor.findOne(id)
   )
 }

  routerOnActivate(curr: RouteSegment): void {
    console.log('routerOnActivate')
    //let id = +curr.getParam('id');
    //this.getAQMonitor(id).then(feature => this.feature = feature);
  }
  gotoFeatures() {
    // Like <a [routerLink]="['/heroes']">Heroes</a>
    this.router.navigate(['/features']);
  }
}
