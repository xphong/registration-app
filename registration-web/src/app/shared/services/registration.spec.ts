import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

import {RegistrationService} from './registration';

describe('RegistrationService', () => {

  let mockBackend, registrationService;
  const mockResponse = [
    {
      id: 1,
      username: "TestUser1",
      password: "TestPassword1"
    },
    {
      id: 2,
      username: "TestUser2",
      password: "TestPassword2"
    }
  ]; 
  const usersUrl = 'http://localhost:8080/api/users';
  const registerUrl = 'http://localhost:8080/api/register';
  const loginUrl = 'http://localhost:8080/api/login'

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    RegistrationService
  ]);

  beforeEach(inject([MockBackend, RegistrationService], (_mockBackend, _registrationService) => {
    mockBackend = _mockBackend;
    registrationService = _registrationService;
  }));

  it('should have http', inject([RegistrationService], (registration) => {
    expect(!!registration.http).toEqual(true);
  }));

  it('should return mocked users response', done => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response({ body: JSON.stringify(mockResponse) }));
      expect(connection.request.url).toBe(usersUrl);
    });

    registrationService.getUsers().subscribe(users => {
      expect(users[0].username).toEqual('TestUser1');
      expect(users[0].password).toEqual('TestPassword1');
      expect(users[1].username).toEqual('TestUser2');
      expect(users[1].password).toEqual('TestPassword2');
      expect(users.length).toBe(2);
      done();
    });
  });

  it('should return registered user', done => {
    const user = {
      username: 'TestUser1',
      password: 'TestPassword1'
    };

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response({ body: JSON.stringify(mockResponse[0]) }));
      expect(connection.request.url).toBe(registerUrl);
    });

    registrationService.registerUser(user).subscribe(user => {
      expect(user.username).toEqual('TestUser1');
      expect(user.password).toEqual('TestPassword1');
      done();
    });
  });

  it('should return login user', done => {
    const user = {
      username: 'TestUser1',
      password: 'TestPassword1'
    };

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response({ body: JSON.stringify(mockResponse[0]) }));
      expect(connection.request.url).toBe(loginUrl);
    });

    registrationService.loginUser(user).subscribe(user => {
      expect(user.username).toEqual('TestUser1');
      expect(user.password).toEqual('TestPassword1');
      done();
    });
  });

});
