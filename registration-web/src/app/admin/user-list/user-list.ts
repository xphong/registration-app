import { Component } from '@angular/core';

import { RegistrationService } from '../../shared/services/registration';

@Component({
  selector: 'rg-user-list',
  template: require('./user-list.html')
})
export class UserList {
  users = [];
  noUsersMessage = '';
  errorMessage = '';

  constructor(private _registrationService: RegistrationService) {

  }

  ngOnInit() {
    console.log('hello `UserList` component');
    this.getUsers();
  }

  getUsers() {
    this._registrationService.getUsers()
        .subscribe(data => {
          if (data.length) {
            this.users = data;
          } else {
            this.noUsersMessage = 'No users found';
          }
        }, error => {
          this.errorMessage = error;
        });
  }

}
