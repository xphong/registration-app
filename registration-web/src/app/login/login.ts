import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup} from 'angular2/common';

import {RegistrationService} from '../shared/services/registration';

@Component({
  selector: 'rg-login',
  directives: [...FORM_DIRECTIVES],
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
    console.log(this.form.value);
    this._registrationService.registerUser(this.form.value)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Account successfully created';
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
