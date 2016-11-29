import { Component } from '@angular/core';

import { Login } from '../login/login';
import { UserList } from '../admin/user-list/user-list';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'rg-home',
  template: require('./home.html')
})
export class Home {
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

}
