import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {WeatherService} from '../shared/services/weather';
import {XLarge} from './directives/x-large';

@Component({
  selector: 'home',
  providers: [
    WeatherService
  ],
  directives: [
    ...FORM_DIRECTIVES,
    XLarge
  ],
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home {
  forecasts = [];
  city = '';
  errorMessage = '';

  constructor(public weatherService: WeatherService) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  searchForWeather() {
    this.weatherService.getForecast(this.city)
        .subscribe(data => {
          if (data) {
            this.forecasts = data;
            this.errorMessage = '';
          } else {
            this.forecasts = [];
            this.errorMessage = 'No forecasts found for this city';
          }
        },
        error => {
          this.forecasts = [];
          this.errorMessage = error.message;
        }
        );
  }

}
