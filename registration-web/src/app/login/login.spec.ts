import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {RegistrationService} from '../shared/services/registration';

// Load the implementations that should be tested
import {Login} from './login';

describe('Login', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    RegistrationService,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    Login
  ]);

  it('should log ngOnInit', inject([Login], (login) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    login.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
