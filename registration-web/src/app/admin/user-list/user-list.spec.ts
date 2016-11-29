import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';

import { UsersService } from '../../shared/services/users/users.service';
import { UserList } from './user-list';

class MockUsersService {
  getUsers() {
    return Observable.of([{
      username: 'TestUser1',
      password: 'TestPassword1'
    }]);
  }
}

describe('User List', () => {
  let mockUsersService = new MockUsersService();

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      UserList
    ],
    providers: [
      UserList,
      {provide: UsersService, useValue: mockUsersService }
    ],
    imports: [
      ReactiveFormsModule,
      RouterTestingModule.withRoutes([ {path: 'admin/userlist', component: UserList} ])
    ]
  }));

  it('should log ngOnInit', inject([UserList], (userlist) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    userlist.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

  it('should successfully get list of users', async(() => {
    let fixture = TestBed.createComponent(UserList);
    let userListComponent = fixture.componentInstance;

    fixture.detectChanges();

    userListComponent.getUsers();

    expect(userListComponent.users[0].username).toEqual('TestUser1');
    expect(userListComponent.errorMessage).toEqual('');
  }));

});
