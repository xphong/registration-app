import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service.ts';
import { Login } from './login';

@Component({
  template: ''
})
class Register { }

@Component({
  template: ''
})
class UserList { }

class MockAuthService {
  login(user) {
    return Observable.of({
      username: 'TestUser1',
      password: 'TestPassword1'
    });
  }
}

describe('Login', () => {
  let mockAuthService = new MockAuthService();
  let routerStub;

  beforeEach(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [
        Login,
        Register,
        UserList
      ],
      providers: [
        Login,
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: mockAuthService }
      ],
      imports: [
        ReactiveFormsModule
      ]
    });
  });

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

    loginComponent.login();

    expect(loginComponent.successMessage).toEqual('Login successful');
    expect(loginComponent.errorMessage).toEqual('');
    expect(routerStub.navigate).toHaveBeenCalledWith(['admin/userlist']);
  }));

  it('should navigate to register', async(() => {
    let fixture = TestBed.createComponent(Login);
    let loginComponent = fixture.componentInstance;

    fixture.detectChanges();

    loginComponent.navigateToRegister();

    expect(routerStub.navigate).toHaveBeenCalledWith(['register']);
  }));

});
