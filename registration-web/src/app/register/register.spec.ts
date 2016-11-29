import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';

import { RegistrationService } from '../shared/services/registration/registration.service';
import { Register } from './register';

class MockRegistrationService {
  registerUser(user) {
    return Observable.of({
      username: 'TestUser1',
      password: 'TestPassword1'
    });
  }
}

describe('Register', () => {
  let mockRegistrationService = new MockRegistrationService();

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      Register
    ],
    providers: [
      Register,
      {provide: RegistrationService, useValue: mockRegistrationService }
    ],
    imports: [
      ReactiveFormsModule,
      RouterTestingModule.withRoutes([ {path: 'register', component: Register} ])
    ]
  }));

  it('should log ngOnInit', inject([Register], (register) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    register.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

  it('should successfully register a user', async(() => {
    let fixture = TestBed.createComponent(Register);
    let registerComponent = fixture.componentInstance;

    fixture.detectChanges();

    registerComponent.register();

    expect(registerComponent.successMessage).toEqual('Account successfully created');
    expect(registerComponent.errorMessage).toEqual('');
  }));

});
