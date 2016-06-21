// import 'es6-shim/es6-shim';
import 'reflect-metadata';
//import 'zone.js';
//import 'zone.js/dist/zone';
import { provide, NgZone } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';

import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { DASHMaps } from './app.ts';
import { ROUTER_PROVIDERS } from '@angular/router';

bootstrap(DASHMaps, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  provide(LocationStrategy, { useClass: PathLocationStrategy })
]);
