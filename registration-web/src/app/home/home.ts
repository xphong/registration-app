import { Component } from '@angular/core';

import { Login } from '../login/login';

@Component({
  selector: 'rg-home',
  template: require('./home.html')
})
export class Home {
  constructor() {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

}
