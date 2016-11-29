import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../constants';

@Injectable()
export class AuthService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  private loggedIn = false;
  private token = '';
  private user = {
    username: '',
    token: ''
  };

  constructor(private http: Http) {
    let user = JSON.parse(localStorage.getItem('user'));
    this.user = user;
    this.loggedIn = !!this.user && !!this.user.token;
  }

  login(user) {
    const loginUrl = AppConstants.apiUrl + 'login';

    return this.http.post(loginUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .map(res => {
        if (res) {
          this.user = {
            username: res.username,
            token: 'abc123'
          };

          localStorage.setItem('user', JSON.stringify(this.user));
          this.loggedIn = true;
        }

        return res;
      })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.user = {
      username: '',
      token: ''
    };
  }

  getUser() {
    return this.user;
  }

  handleError(error) {
    console.error(error);

    return Observable.throw(error.json().message || 'Server error');
  }
}
