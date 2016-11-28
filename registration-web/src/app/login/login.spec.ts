import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';

import { RegistrationService } from '../shared/services/registration';
import { Login } from './login';

@Component({
  template: ''
})
class Register { }

@Component({
  template: ''
})
class UserList { }

class MockRegistrationService {
  loginUser(user) {
    return Observable.of({
      username: 'TestUser1',
      password: 'TestPassword1'
    });
  }
}

describe('Login', () => {
  let mockRegistrationService = new MockRegistrationService();

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      Login,
      Register,
      UserList
    ],
    providers: [
      Login,
      {provide: RegistrationService, useValue: mockRegistrationService }
    ],
    imports: [
      ReactiveFormsModule,
      RouterTestingModule.withRoutes([ {path: 'register', component: Register}, {path: 'admin/userlist', component: UserList} ])
    ]
  }));

  it('should log ngOnInit', inject([Login], (login) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    login.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

  it('should successfully login', async(() => {
    let fixture = TestBed.createComponent(Login);
    let loginComponent = fixture.componentInstance;

    fixture.detectChanges();

    loginComponent.login({
      username: 'TestUser1',
      password: 'TestPassword1'
    });

    expect(loginComponent.successMessage).toEqual('Login successful');
    expect(loginComponent.errorMessage).toEqual('');
  }));

});
