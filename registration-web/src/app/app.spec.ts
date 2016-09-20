import {
  inject,
  TestBed
} from '@angular/core/testing';

import { App } from './app.component';
import { AppState } from './app.service';

describe('App', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppState,
      App
    ]
  }));

  it('should have an app title', inject([ App ], (app) => {
    expect(app.title).toEqual('Registration App');
  }));

});
