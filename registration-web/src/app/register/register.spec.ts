import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder,
  resetBaseTestProviders,
  setBaseTestProviders
} from 'angular2/testing';

import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS } from 'angular2/platform/testing/browser';
import { Observable } from 'rxjs/Rx';
import { provide } from 'angular2/core';
import { RootRouter } from 'angular2/src/router/router';
import { Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { SpyLocation } from 'angular2/src/mock/location_mock';

import { RegistrationService } from '../shared/services/registration';
import { Register } from './register';
import { App } from '../app';

class MockRegistrationService {
  registerUser(user) {
    return Observable.of({
      username: 'TestUser1',
      password: 'TestPassword1'
    });
  }
}

describe('Register', () => {
  resetBaseTestProviders();
  setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

  let registrationService = new MockRegistrationService();

  beforeEachProviders(() => [
    Register,
    RouteRegistry,
    provide(RegistrationService, { useValue: registrationService }),
    provide(Location, {useClass: SpyLocation}),
    provide(Router, {useClass: RootRouter}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App})
  ]);

  it('should log ngOnInit', inject([Register], (register) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    register.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

  it('should successfully register a user', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb
        .createAsync(Register)
        .then(fixture => {
          let registerComponent = fixture.componentInstance;

          fixture.detectChanges();

          registerComponent.register({
            username: 'TestUser1',
            password: 'TestPassword1'
          });

          expect(registerComponent.successMessage).toEqual('Account successfully created');
          expect(registerComponent.errorMessage).toEqual('');
        });
    }));

});
