import { provide } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DASHMaps } from './app.ts'

bootstrap(DASHMaps, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: PathLocationStrategy })
]);
