import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../constants';
import { UtilsService } from '../utils.service';

@Injectable()
export class AuthService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  private loggedIn = false;
  private token = '';

  constructor(private http: Http, private utils: UtilsService) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.token = localStorage.getItem('auth_token');
  }

  login(user) {
    const loginUrl = AppConstants.apiUrl + 'login';

    return this.http.post(loginUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .map(res => {
        localStorage.setItem('auth_token', 'abc123');
        this.loggedIn = true;
        return res;
      })
      .catch(this.utils.handleError);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.token = '';
  }

  getToken() {
    return this.token;
  }
}
