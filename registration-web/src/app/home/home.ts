import { Component } from 'angular2/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup } from 'angular2/common';

import { Login } from '../login/login';

@Component({
  selector: 'rg-home',
  directives: [Login],
  pipes: [ ],
  template: require('./home.html')
})
export class Home {
  constructor() {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

}
