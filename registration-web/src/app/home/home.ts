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

  constructor(private _registrationService: RegistrationService, private _formBuilder: FormBuilder) {
    this._createForm();
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  register() {
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

    this.form = this._formBuilder.group({
      username:  this.username,
      password: this.password
    });
  }

}
