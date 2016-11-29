import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { AuthService } from '../shared/auth/auth.service';

class MockAuthService {

}

describe('Home', () => {
  let mockAuthService = new MockAuthService();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Home,
      { provide: AuthService, useValue: mockAuthService }
    ]
  }));

  it('should log ngOnInit', inject([ Home, AuthService ], (home, authService) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
