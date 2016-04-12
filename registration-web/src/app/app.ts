import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './shared/directives/router-active';
import {RegistrationService} from './shared/services/registration';
import {About} from './about/about';
import {Home} from './home/home';

@Component({
  selector: 'app',
  providers: [RegistrationService, FORM_PROVIDERS],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class App {
  title = 'Registration App';

  constructor() {

  }
}
