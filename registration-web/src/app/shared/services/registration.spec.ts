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
  let mockResponse = [
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
      connection.mockRespond(new Response({body: JSON.stringify(mockResponse)}));
    });

    registrationService.getUsers().subscribe(users => {
      expect(users[0].username).toBe('TestUser1');
      expect(users[0].password).toBe('TestPassword1');
      expect(users[1].username).toBe('TestUser2');
      expect(users[1].password).toBe('TestPassword2');
      expect(users.length).toBe(2);
      done();
    });
  });
});
