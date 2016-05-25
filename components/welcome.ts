//import { RequireUser } from 'angular2-meteor-accounts-ui';
import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Ng2BootstrapConfig, Ng2BootstrapTheme, AlertComponent } from '../node_modules/ng2-bootstrap';


@Component({
  selector: 'welcome-display',
  directives: [AlertComponent],
  templateUrl: 'client/templates/welcome.html'
})

//@RequireUser()
export class WelcomeComponent {
  //https://github.com/valor-software/ng2-bootstrap/tree/development/demo/components/alert
}
