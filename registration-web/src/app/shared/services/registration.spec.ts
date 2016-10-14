import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';

import { RegistrationService } from './registration';

describe('RegistrationService', () => {

  let mockBackend, registrationService;
  const mockResponse = [
    {
      id: 1,
      username: 'TestUser1',
      password: 'TestPassword1'
    },
    {
      id: 2,
      username: 'TestUser2',
      password: 'TestPassword2'
    }
  ];
  const usersUrl = 'http://localhost:8080/api/users';
  const registerUrl = 'http://localhost:8080/api/register';
  const loginUrl = 'http://localhost:8080/api/login';
  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockBackend,
      RegistrationService,
      Http,
      ConnectionBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions],
      }
    ]
  }));

  beforeEach(inject([ MockBackend, RegistrationService ], (_mockBackend, _registrationService) => {
    mockBackend = _mockBackend;
    registrationService = _registrationService;
  }));

  it('should have http', () => {
    expect(!!registrationService._http).toEqual(true);
  });

  it('should return users', done => {
    const options = new ResponseOptions({
      body: {
        users: mockResponse,
        status: 200
      }
    });

    const response = new Response(options);
    
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(response);
      expect(connection.request.url).toEqual(usersUrl);
    });

    registrationService.getUsers().subscribe(data => {
      expect(data.users[0].username).toEqual('TestUser1');
      expect(data.users[0].password).toEqual('TestPassword1');
      expect(data.users[1].username).toEqual('TestUser2');
      expect(data.users[1].password).toEqual('TestPassword2');
      expect(data.users.length).toEqual(2);
      done();
    });
  });

  it('should return registered user', done => {
    const user = {
      username: 'TestUser1',
      password: 'TestPassword1'
    };

    const options = new ResponseOptions({
      body: {
        user: mockResponse[0],
        status: 200
      }
    });

    const response = new Response(options);

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(response);
      expect(connection.request.url).toEqual(registerUrl);
    });

    registrationService.registerUser(user).subscribe(data => {
      expect(data.user.username).toEqual('TestUser1');
      expect(data.user.password).toEqual('TestPassword1');
      done();
    });
  });

  it('should return login user', done => {
    const user = {
      username: 'TestUser1',
      password: 'TestPassword1'
    };

    const options = new ResponseOptions({
      body: {
        user: mockResponse[0],
        status: 200
      }
    });

    const response = new Response(options);

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(response);
      expect(connection.request.url).toEqual(loginUrl);
    });

    registrationService.loginUser(user).subscribe(data => {
      expect(data.user.username).toEqual('TestUser1');
      expect(data.user.password).toEqual('TestPassword1');
      done();
    });
  });

  it('should return error for register user', done => {
    const user = {
      username: 'Test',
      password: 'test'
    };

    mockBackend.connections.subscribe(connection => {
      connection.mockError(new Error('error'));
      expect(connection.request.url).toEqual(loginUrl);
    });

    registrationService.loginUser(user).subscribe(user => user, err => {
      done();
    });
  });

});
