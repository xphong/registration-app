import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UtilsService {
  constructor() {

  }

  handleError(error) {
    console.error(error);

    return Observable.throw(error.json().message || 'Server error');
  }
}
