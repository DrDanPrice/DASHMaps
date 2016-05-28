import { provide, NgZone } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DASHMaps } from './app.ts';
import { ROUTER_PROVIDERS } from '@angular/router';

bootstrap(DASHMaps, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: PathLocationStrategy })
]);
