import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

import {WeatherService} from './weather';

describe('WeatherService', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    WeatherService
  ]);

  it('should have http', inject([ WeatherService ], (weather) => {
    expect(!!weather.http).toEqual(true);
  }));

  it('should get temperature', inject([ WeatherService ], (weatherService) => {
    expect(weatherService._getTemperature(5.11, 'Snow')).toEqual('5.11°C Snow');
  }));

  it('should get humidity', inject([ WeatherService ], (weatherService) => {
    expect(weatherService._getHumidity(55)).toEqual('55%');
  }));

  it('should format pressure', inject([ WeatherService ], (weatherService) => {
    expect(weatherService._formatPressure(995.89)).toEqual(99.6);
  }));

  it('should convert UTC time', inject([ WeatherService ], (weatherService) => {
    expect(weatherService._convertUTC(1455210000)).toEqual('11/2/2016');
  }));

  it('should get wind', inject([ WeatherService ], (weatherService) => {
    expect(weatherService._getWind('', 1)).toEqual('1 km/h ');
    expect(weatherService._getWind(0, 1)).toEqual('1 km/h N');
    expect(weatherService._getWind(20, 1)).toEqual('1 km/h NE');
    expect(weatherService._getWind(90, 1)).toEqual('1 km/h E');
    expect(weatherService._getWind(110, 1)).toEqual('1 km/h SE');
    expect(weatherService._getWind(180, 1)).toEqual('1 km/h S');
    expect(weatherService._getWind(240, 1)).toEqual('1 km/h SW');
    expect(weatherService._getWind(270, 1)).toEqual('1 km/h W');
    expect(weatherService._getWind(319, 1)).toEqual('1 km/h NW');
  }));

  // it('should get data from the server', inject([ WeatherService, MockBackend ], (weather, mockBackend) => {
  //   let response = [{
  //       'dt': 1455210000,
  //       'temp': {
  //           'day': -13.67,
  //           'min': -17.08,
  //           'max': -12.52,
  //           'night': -16.15,
  //           'eve': -14.78,
  //           'morn': -13.67
  //       },
  //       'pressure': 995.89,
  //       'humidity': 52,
  //       'weather': [{
  //           'id': 600,
  //           'main': 'Snow',
  //           'description': 'light snow',
  //           'icon': '13d'
  //       }],
  //       'speed': 6.23,
  //       'deg': 319,
  //       'clouds': 24,
  //       'snow': 0.11
  //   }, {
  //       'dt': 1455296400,
  //       'temp': {
  //           'day': -6.11,
  //           'min': -18.98,
  //           'max': -5.95,
  //           'night': -18.98,
  //           'eve': -9.23,
  //           'morn': -11.92
  //       },
  //       'pressure': 989.7,
  //       'humidity': 65,
  //       'weather': [{
  //           'id': 600,
  //           'main': 'Snow',
  //           'description': 'light snow',
  //           'icon': '13d'
  //       }],
  //       'speed': 8.73,
  //       'deg': 240,
  //       'clouds': 76,
  //       'snow': 0.88
  //   }, {
  //       'dt': 1455382800,
  //       'temp': {
  //           'day': -21.77,
  //           'min': -25.7,
  //           'max': -21.08,
  //           'night': -25.7,
  //           'eve': -23.24,
  //           'morn': -25.3
  //       },
  //       'pressure': 1002.95,
  //       'humidity': 60,
  //       'weather': [{
  //           'id': 800,
  //           'main': 'Clear',
  //           'description': 'sky is clear',
  //           'icon': '01d'
  //       }],
  //       'speed': 6.36,
  //       'deg': 328,
  //       'clouds': 0
  //   }, {
  //       'dt': 1455469200,
  //       'temp': {
  //           'day': -17.81,
  //           'min': -27.43,
  //           'max': -15.42,
  //           'night': -22.54,
  //           'eve': -18.57,
  //           'morn': -27.43
  //       },
  //       'pressure': 1012.31,
  //       'humidity': 54,
  //       'weather': [{
  //           'id': 800,
  //           'main': 'Clear',
  //           'description': 'sky is clear',
  //           'icon': '01d'
  //       }],
  //       'speed': 4.04,
  //       'deg': 299,
  //       'clouds': 0,
  //       'snow': 0.01
  //   }, {
  //       'dt': 1455555600,
  //       'temp': {
  //           'day': -7.45,
  //           'min': -20.14,
  //           'max': -6.3,
  //           'night': -6.3,
  //           'eve': -7.23,
  //           'morn': -20.14
  //       },
  //       'pressure': 1014.52,
  //       'humidity': 0,
  //       'weather': [{
  //           'id': 600,
  //           'main': 'Snow',
  //           'description': 'light snow',
  //           'icon': '13d'
  //       }],
  //       'speed': 5.02,
  //       'deg': 188,
  //       'clouds': 43,
  //       'snow': 0.09
  //   }, {
  //       'dt': 1455642000,
  //       'temp': {
  //           'day': -1.05,
  //           'min': -4.33,
  //           'max': -1.05,
  //           'night': -2.58,
  //           'eve': -1.26,
  //           'morn': -4.33
  //       },
  //       'pressure': 1000.66,
  //       'humidity': 0,
  //       'weather': [{
  //           'id': 600,
  //           'main': 'Snow',
  //           'description': 'light snow',
  //           'icon': '13d'
  //       }],
  //       'speed': 6.75,
  //       'deg': 194,
  //       'clouds': 96,
  //       'snow': 1.27
  //   }, {
  //       'dt': 1455728400,
  //       'temp': {
  //           'day': -2.78,
  //           'min': -4.86,
  //           'max': -2.78,
  //           'night': -3.71,
  //           'eve': -3.28,
  //           'morn': -4.86
  //       },
  //       'pressure': 994.04,
  //       'humidity': 0,
  //       'weather': [{
  //           'id': 601,
  //           'main': 'Snow',
  //           'description': 'snow',
  //           'icon': '13d'
  //       }],
  //       'speed': 6.27,
  //       'deg': 292,
  //       'clouds': 25,
  //       'snow': 2.51
  //   }];

  //   let responseOptions = new ResponseOptions({body: response});
  //   mockBackend.connections.subscribe(
  //       c => c.mockRespond(new Response(responseOptions)));

  //   expect(weather.getForecast('toronto')).toEqual(response);
  // }));

});
