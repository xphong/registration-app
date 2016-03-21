import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {RegistrationService} from '../shared/services/registration';

@Component({
  selector: 'home',
  providers: [
    RegistrationService
  ],
  directives: [
    ...FORM_DIRECTIVES
  ],
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(public registrationService: RegistrationService) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  register() {
    let user = {
      'username': this.username,
      'password': this.password
    };

    this.registrationService.registerUser(user)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Account successfully created';
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        },
        error => {
          this.errorMessage = error;
          this.successMessage = '';
        }
        );
  }

}
