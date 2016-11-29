import { Component } from '@angular/core';

import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'rg-user-list',
  template: require('./user-list.html')
})
export class UserList {
  users = [];
  noUsersMessage = '';
  errorMessage = '';

  constructor(private userService: UsersService) {

  }

  ngOnInit() {
    console.log('hello `UserList` component');
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
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
