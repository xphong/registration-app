import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';

import { UsersService } from './users.service';

describe('Users Service', () => {

  let mockBackend, usersService;
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

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockBackend,
      UsersService,
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

  beforeEach(inject([ MockBackend, UsersService ], (_mockBackend, _usersService) => {
    mockBackend = _mockBackend;
    usersService = _usersService;
  }));

  it('should have http', () => {
    expect(!!usersService.http).toEqual(true);
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

    usersService.getUsers().subscribe(data => {
      expect(data.users[0].username).toEqual('TestUser1');
      expect(data.users[0].password).toEqual('TestPassword1');
      expect(data.users[1].username).toEqual('TestUser2');
      expect(data.users[1].password).toEqual('TestPassword2');
      expect(data.users.length).toEqual(2);
      done();
    });
  });

});
