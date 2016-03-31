import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';

import {RegistrationService} from '../shared/services/registration';
import {RegistrationValidator} from '../shared/validation/registrationvalidator';

@Component({
  selector: 'home',
  directives: [...FORM_DIRECTIVES],
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home {
  form: ControlGroup;
  username: Control;
  password: Control;

  errorMessage = '';
  successMessage = '';

  constructor(public registrationService: RegistrationService, public formBuilder: FormBuilder) {
    this.username = new Control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        RegistrationValidator.startsWithNumber,
        RegistrationValidator.alphaNumericValues
      ])
    );

    this.password = new Control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        RegistrationValidator.validatePassword
      ])
    );

    this.form = formBuilder.group({
      username:  this.username,
      password: this.password
    });
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  register() {
    console.log(this.form.value);
    this.registrationService.registerUser(this.form.value)
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
