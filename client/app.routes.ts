/* once Urigo updates:https://angular.io/docs/ts/latest/guide/router.html#!#query-parameters

import { provideRouter, RouterConfig } from '@angular/router';
import { AboutComponent } from '../components/aboutdisplay.ts';
import { WelcomeComponent } from '../components/welcome.ts';
import { MapComponent } from '../components/map.ts';
import { UserComponent } from '../components/userdisplay.ts';
import { DataComponent } from '../components/datadisplay.ts';
import { StyleComponent } from '../components/styledisplay.ts';
import { QuestionsComponent } from '../components/questions.ts';
import { FeatureComponent } from '../components/features.ts';
import { LinkedComponent } from '../components/linked.ts';

export const routes: RouterConfig = [
    { path: '/welcome', component: WelcomeComponent },
    { path: '/', component: MapComponent },
    //{ path: '/map/:mapID', component: MapComponent },
    { path: '/about', component: AboutComponent },
    { path: '/data', component: DataComponent },
    { path: '/linked', component: LinkedComponent },
    { path: '/userdisplay', component: UserComponent },
    { path: '/styles', component: StyleComponent },
    { path: '/questions', component: QuestionsComponent },
    //https://angular.io/docs/ts/latest/guide/router.html
    //http://plnkr.co/edit/Bim8OGO7oddxBaa26WzR?p=preview - for nice examples of each strategy
    { path: '/features', component: FeatureComponent }
    //{ path: '/features/:featureID', component: FeatureComponent } // I don't think it needs this, but haven't tested
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
*/
