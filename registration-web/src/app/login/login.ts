import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationService } from '../shared/services/registration';

@Component({
  selector: 'rg-login',
  templateUrl: './login.html'
})
export class Login {
  form: FormGroup;
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  errorMessage = '';
  successMessage = '';

  constructor(private _registrationService: RegistrationService, private _formBuilder: FormBuilder, private _router: Router) {
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
            this._router.navigate(['admin/userlist']);
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        }, error => {
          this.errorMessage = error;
          this.successMessage = '';
        });
  }

  _createForm() {
    this.form = this._formBuilder.group({
      username:  this.username,
      password: this.password
    });
  }

  navigateToRegister() {
    this._router.navigate(['register']);
  }
}
