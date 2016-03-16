import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './shared/directives/router-active';
import {Home} from './home/home';
import {City} from './city/city';

@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' },
  { path: '/city/:city', component: City, name: 'City' },
  { path: '/**', redirectTo: ['Home'] }
])
export class App {
  title = 'Weather App';

  constructor() {

  }
}
