import { Component } from '@angular/core';

@Component({
  selector: 'rg-user-list',
  template: require('./user-list.html')
})
export class UserList {
  title = 'Registration App';

  constructor() {

  }

  ngOnInit() {
    console.log('hello `UserList` component');
  }

}
