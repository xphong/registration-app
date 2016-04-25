import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {RegistrationService} from '../shared/services/registration';
import {Register} from '../register/register';

@Component({
  selector: 'rg-login',
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: [ ],
  template: require('./login.html')
})
export class Login {
  form: ControlGroup;
  username: Control;
  password: Control;

  errorMessage = '';
  successMessage = '';

  constructor(private _registrationService: RegistrationService, private _formBuilder: FormBuilder) {
    this._createForm();
  }

  ngOnInit() {
    console.log('hello `Login` component');
  }

  login() {
    this._registrationService.loginUser(this.form.value)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Login successful';
            this._createForm();
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

  _createForm() {
    this.username = new Control('');

    this.password = new Control('');

    this.form = this._formBuilder.group({
      username:  this.username,
      password: this.password
    });
  }
}
