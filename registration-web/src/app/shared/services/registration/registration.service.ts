import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../../constants';
import { UtilsService } from '../../utils.service';

@Injectable()
export class RegistrationService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http, private utils: UtilsService) {

  }

  registerUser(user) {
    const registerUrl = AppConstants.apiUrl + 'register';

    return this.http.post(registerUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .catch(this.utils.handleError);
  }
}