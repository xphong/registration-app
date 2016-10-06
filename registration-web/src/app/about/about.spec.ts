import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { About } from './about';

describe('About', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ About ]
  }));

  it('should log ngOnInit', inject([About], (about) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    about.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
