import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RegistrationService {
  apiUrl = 'http://localhost:8080/api/register';
  apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {

  }

  registerUser(user) {
    return this.http.post(this.apiUrl, JSON.stringify(user), { headers: this.apiHeaders })
      .map(res => res.json())
      .catch(this._handleError);
  }

  _handleError(error) {
    console.error(error);

    return Observable.throw(error.json().message || 'Server error');
  }
}
