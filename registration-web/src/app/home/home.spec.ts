import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ Home ]
  }));

  it('should log ngOnInit', inject([ Home ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
