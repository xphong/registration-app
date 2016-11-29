import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../constants';

@Injectable()
export class RegistrationService {
  apiUrl = AppConstants.apiUrl;
  apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  loggedIn = false;

  constructor(private _http: Http) {

  }

  getUsers() {
    const usersUrl = this.apiUrl + 'users';

    return this._http.get(usersUrl)
      .map(res => res.json())
      .catch(this._handleError);
  }

  registerUser(user) {
    const registerUrl = this.apiUrl + 'register';

    return this._http.post(registerUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .catch(this._handleError);
  }

  loginUser(user) {
    const loginUrl = this.apiUrl + 'login';

    return this._http.post(loginUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .map(res => {
        this.loggedIn = true;
        return res;
      })
      .catch(this._handleError);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }

  _handleError(error) {
    console.error(error);

    return Observable.throw(error.json().message || 'Server error');
  }
}
