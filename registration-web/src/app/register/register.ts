import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RegistrationService } from '../shared/services/registration';
import { RegistrationValidator } from '../shared/validation/registrationvalidator';
import { Login } from '../login/login';

@Component({
  selector: 'rg-register',
  template: require('./register.html')
})
export class Register {
  form: FormGroup;
  username = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      RegistrationValidator.startsWithNumber,
      RegistrationValidator.alphaNumericValues
    ])
  );
  password = new FormControl('',
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      RegistrationValidator.validatePassword
    ])
  );

  errorMessage = '';
  successMessage = '';

  constructor(private _registrationService: RegistrationService, private _formBuilder: FormBuilder) {
    this._createForm();
  }

  ngOnInit() {
    console.log('hello `Register` component');
  }

  register() {
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
    this.form = this._formBuilder.group({
      username:  this.username,
      password: this.password
    });
  }
}
