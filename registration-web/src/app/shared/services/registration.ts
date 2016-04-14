import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RegistrationService {
  apiUrl = 'http://localhost:8080/api/';
  apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {

  }

  registerUser(user) {
    const registerUrl = this.apiUrl + 'register';

    return this.http.post(registerUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .catch(this._handleError);
  }

  loginUser(user) {
    const loginUrl = this.apiUrl + 'login';

    return this.http.post(loginUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .catch(this._handleError);
  }

  _handleError(error) {
    console.error(error);

    return Observable.throw(error.json().message || 'Server error');
  }
}
