//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, DROPDOWN_DIRECTIVES } from '../node_modules/ng2-bootstrap';
import { QuestionsManager } from './managedquestions.ts';
import { QuestionsTable } from './questionstable.ts';

@Component({
  selector: 'questions-display',
  directives: [
                CORE_DIRECTIVES,
                ROUTER_DIRECTIVES,
                DROPDOWN_DIRECTIVES
              ],
  templateUrl: 'client/templates/questions.html'
})
@Routes([
    { path: '/managedquestions', component: QuestionsManager },
    { path: '/table', component: QuestionsTable }
])
//@RequireUser()
//should do this as implementing OnActivate from router?? vgl features.ts
export class QuestionsComponent implements OnInit {
  constructor(private router: Router) {

    }
    ngOnInit() {
      this.router.navigate(['/questions']);
    }

}
