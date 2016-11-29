import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { App } from './app.component';
import { AuthService } from './shared/auth/auth.service';

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

@Component({
  template: ''
})
class UserList { }

class MockAuthService {
  isLoggedIn() {
    return true;
  }

  logout() {

  }
}

describe('App', () => {
  let mockAuthService = new MockAuthService();
  let routerStub, app, authService;

  beforeEach(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        App,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: routerStub }
      ]
    });
  });

  beforeEach(inject([App, AuthService], (_app: App, _authService: AuthService) => {
    app = _app;
    authService = _authService;
  }));

  it('should have an app title', () => {
    expect(app.title).toEqual('Registration App');
  });

  it('should have navigate to login', () => {
    app.navigateToLogin();

    expect(routerStub.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should logout and redirect to login', () => {
    app.logout();

    expect(routerStub.navigate).toHaveBeenCalledWith(['login']);
  });


});

describe('Router', () => {
  const routes = [
    { path: '',      component: Home },
    { path: 'home',  component: Home },
    { path: 'about', component: About },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'admin/userlist', component: UserList },
    { path: '**',    component: Home }
  ];

  let mockAuthService = new MockAuthService();

  let location, router, fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ],
      imports: [ RouterTestingModule.withRoutes(routes) ],
      declarations: [
        App,
        Home,
        About,
        Register,
        Login,
        UserList
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
