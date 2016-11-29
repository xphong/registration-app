import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RegistrationService } from '../shared/services/registration/registration.service';
import { RegistrationValidator } from '../shared/validation/registrationvalidator';
import { Login } from '../login/login';

@Component({
  selector: 'rg-register',
  template: require('./register.html')
})
export class Register {
  public errorMessage = '';
  public successMessage = '';

  private form: FormGroup;
  private username = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      RegistrationValidator.startsWithNumber,
      RegistrationValidator.alphaNumericValues
    ])
  );
  private password = new FormControl('',
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      RegistrationValidator.validatePassword
    ])
  );

  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    console.log('hello `Register` component');
  }

  register() {
    this.registrationService.registerUser(this.form.value)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Account successfully created';
            this.createForm();
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        }, error => {
          this.errorMessage = error;
          this.successMessage = '';
        });
  }

  createForm() {
    this.form = this.formBuilder.group({
      username:  this.username,
      password: this.password
    });
  }
}
