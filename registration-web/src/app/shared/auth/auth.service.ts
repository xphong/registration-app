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
  private user = {};

  constructor(private http: Http, private utils: UtilsService) {
    this.user = localStorage.getItem('user');
    this.loggedIn = !!this.user && !!this.user.token;
  }

  login(user) {
    const loginUrl = AppConstants.apiUrl + 'login';

    return this.http.post(loginUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .map(res => {
        this.user = {
          username: res.username,
          token: 'abc123'
        };

        localStorage.setItem('user', this.user);

        this.loggedIn = true;

        return res;
      })
      .catch(this.utils.handleError);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.user = {};
  }

  getUser() {
    return this.user;
  }
}
