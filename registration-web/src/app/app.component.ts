import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { RegistrationService } from './shared/services/registration';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  templateUrl: './app.html'
})
export class App {
  title = 'Registration App';

  constructor(private _registrationService: RegistrationService, private _router: Router) {
    
  }

  navigateToLogin() {
    this._router.navigate(['login']);
  }
}
