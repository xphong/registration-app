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

import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import {Observable} from 'rxjs/Rx';
import {provide} from 'angular2/core';
import {RootRouter} from 'angular2/src/router/router';
import {Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';

import {RegistrationService} from '../shared/services/registration';
import {Login} from './login';
import {App} from '../app';

class MockRegistrationService {
  loginUser(user) {
    return Observable.of({
      username: 'TestUser1',
      password: 'TestPassword1'
    });
  }
}

describe('Login', () => {
  resetBaseTestProviders();
  setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

  let registrationService = new MockRegistrationService();

  beforeEachProviders(() => [
    Login,
    RouteRegistry,
    provide(RegistrationService, { useValue: registrationService }),
    provide(Location, {useClass: SpyLocation}),
    provide(Router, {useClass: RootRouter}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App})
  ]);

  it('should log ngOnInit', inject([Login], (login) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    login.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

  it('should successfully login', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb
        .createAsync(Login)
        .then(fixture => {
          let loginComponent = fixture.componentInstance;

          fixture.detectChanges();

          loginComponent.login({
            username: 'TestUser1',
            password: 'TestPassword1'
          });

          expect(loginComponent.successMessage).toEqual('Login successful');
          expect(loginComponent.errorMessage).toEqual('');
        });
    }));

});
