import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

describe('Auth Service', () => {

  let mockBackend, authService;
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
  const loginUrl = 'http://localhost:8080/api/login';

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockBackend,
      AuthService,
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

  beforeEach(inject([ MockBackend, AuthService ], (_mockBackend, _authService) => {
    mockBackend = _mockBackend;
    authService = _authService;
  }));

  it('should have http', () => {
    expect(!!authService.http).toEqual(true);
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

    authService.login(user).subscribe(data => {
      expect(data.user.username).toEqual('TestUser1');
      expect(data.user.password).toEqual('TestPassword1');
      done();
    });
  });

  it('should return error for login user', done => {
    const user = {
      username: 'Test',
      password: 'test'
    };

    mockBackend.connections.subscribe(connection => {
      connection.mockError(new Error('error'));
      expect(connection.request.url).toEqual(loginUrl);
    });

    authService.login(user).subscribe(data => data, err => {
      done();
    });
  });

});
