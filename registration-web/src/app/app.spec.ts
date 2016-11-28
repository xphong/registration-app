import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { App } from './app.component';

@Component({
  template: ''
})
class Home { }

@Component({
  template: ''
})
class About { }

@Component({
  template: ''
})
class Register { }

@Component({
  template: ''
})
class Login { }

describe('App', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ App ]
    });
  });

  it('should have an app title', inject([ App ], (app) => {
    expect(app.title).toEqual('Registration App');
  }));

});

describe('Router', () => {

  const Routes = [
    { path: '',      component: Home },
    { path: 'home',  component: Home },
    { path: 'about', component: About },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: '**',    component: Home }
  ];

  let location, router, fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(Routes) ],
      declarations: [
        App,
        Home,
        About,
        Register,
        Login
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
  }));

  it('should be able to navigate to Home', async(() => {
    router.navigate(['/home']).then(() => {
      expect(location.path()).toBe('/home');
    });
  }));

  it('should be able to navigate to About', async(() => {
    router.navigate(['/about']).then(() => {
      expect(location.path()).toBe('/about');
    });
  }));

  it('should be able to navigate to Register', async(() => {
    router.navigate(['/register']).then(() => {
      expect(location.path()).toBe('/register');
    });
  }));

  it('should be able to navigate to Login', async(() => {
    router.navigate(['/login']).then(() => {
      expect(location.path()).toBe('/login');
    });
  }));

  it('should be able to navigate to Admin User', async(() => {
    router.navigate(['/admin/userlist']).then(() => {
      expect(location.path()).toBe('/admin/userlist');
    });
  }));

});
