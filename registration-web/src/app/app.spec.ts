import {
  it,
  inject,
  injectAsync,
  beforeEach,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import { RootRouter } from 'angular2/src/router/router';
import { Location, RouteParams, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { SpyLocation } from 'angular2/src/mock/location_mock';
import { provide } from 'angular2/core';

import { App } from './app';

describe('App', () => {

  beforeEachProviders(() => [
    App
  ]);

  it('should have an app title', inject([ App ], (app) => {
    expect(app.title).toEqual('Registration App');
  }));

});

describe('Router', () => {

  let location, router;

  beforeEachProviders(() => [
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(Router, {useClass: RootRouter}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App})
  ]);

  beforeEach(inject([Router, Location], (_router, _location) => {
    router = _router;
    location = _location;
  }));

  it('Should be able to navigate to Home', done => {
    router.navigate(['Home']).then(() => {
      expect(location.path()).toBe('');
      done();
    }).catch(e => done.fail(e));
  });

  it('should redirect not registered urls to Home', done => {
    router.navigateByUrl('/unknown').then(() => {
      expect(location.path()).toBe('');
      done();
    }).catch(e => done.fail(e));
  });

  it('Should be able to navigate to About', done => {
    router.navigate(['About']).then(() => {
      expect(location.path()).toBe('/about');
      done();
    }).catch(e => done.fail(e));
  });

  it('Should be able to navigate to Login', done => {
    router.navigate(['Login']).then(() => {
      expect(location.path()).toBe('/login');
      done();
    }).catch(e => done.fail(e));
  });

  it('Should be able to navigate to Register', done => {
    router.navigate(['Register']).then(() => {
      expect(location.path()).toBe('/register');
      done();
    }).catch(e => done.fail(e));
  });

});
