//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, Inject, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { OnActivate, Routes, Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, DROPDOWN_DIRECTIVES } from '../node_modules/ng2-bootstrap';
import { AQMonitorsService } from '../services/aqmonitors_service.ts';
import { CreateFeature } from './createfeature.ts';
import { ManageFeatures } from './managefeatures.ts';
import { LinkedQuestions } from './linkedquestions.ts';

@Component({
  selector: 'feature-display',
  providers: [AQMonitorsService],
  directives: [
                ROUTER_DIRECTIVES,
                DROPDOWN_DIRECTIVES,
                LinkedQuestions
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
  properties: any;
  title:string;
  constructor (
    @Inject(AQMonitorsService) private AQMonitorsService:AQMonitorsService,
    private router: Router, private curr: RouteSegment
  ){
    this.title = curr.getParam('title');
  }

  getAQMonitor (id):any {
    this.aqmonitors = this.AQMonitorsService.getAQMonitorCursor();
    this.aqmonitors.then(cursor =>
      this.monitor = cursor.findOne(id)
   )
 }
  routerOnActivate(curr: RouteSegment): void {
    console.log('routerOnActivate',curr.getParam('title'))
    this.title = curr.getParam('title');
    this.properties = curr.getParam('properties');
    //this.router.navigate(['/features', {title:this.title,properties:this.properties}]);
    //this.getAQMonitor(id).then(feature => this.feature = feature);
  }
  gotoFeatures(properties) {
    // Like <a [routerLink]="['/heroes']">Heroes</a>
    this.router.navigate(['/features', {title:'from gotoFeatures',properties:properties}]);
  }
  ngOnInit() {
    console.log('oninit fired in features.ts')
    //this.router.navigate(['/features', {title:this.title,properties:this.properties}]);
  }
}
