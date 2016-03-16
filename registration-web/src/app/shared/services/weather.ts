import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WeatherService {
  apiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';
  apiKey = '0f39b39c55f9f764c41360fbe41282b7';
  apiOptions = '&cnt=7&mode=json&units=metric&appid=' + this.apiKey;
  forecastsCached = {};

  constructor(public http: Http) {

  }

  getForecast(city) {
    let url = this.apiUrl + '?q=' + city + this.apiOptions;

    return this.http.get(url)
                    .map(res => {
                      var forecasts,
                          response;

                      this.forecastsCached = res.json();

                      response = res.json().list;

                      if (response && response.length > 0) {
                        forecasts = response.map(forecast => {
                          return {
                            temp: this._getTemperature(forecast.temp.day, forecast.weather[0].main),
                            date: this._convertUTC(forecast.dt),
                            humidity: this._getHumidity(forecast.humidity),
                            wind: this._getWind(forecast.deg, forecast.speed),
                            pressure: this._formatPressure(forecast.pressure)
                          };
                        });
                      }

                      return forecasts;
                    })
                    .catch(this._handleError);
  }

  _handleError (error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  _getTemperature = function (temp, condition) {
    return temp + '°C ' + condition;
  }

  _getHumidity = function (humidity) {
    return humidity + '%';
  }

  _formatPressure = function (pressure) {
    return Math.round( (pressure / 10) * 10 ) / 10;
  };

  _convertUTC = function (utc) {
    let date = new Date(utc * 1000),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();

    return day + '/' + month + '/' + year;
  };

  _getWind = function (degrees, speed) {
    let direction;

    if (degrees === 0) {
      direction = 'N';
    } else if (degrees > 0 && degrees < 90) {
      direction = 'NE';
    } else if (degrees === 90) {
      direction = 'E';
    } else if (degrees > 90 && degrees < 180) {
      direction = 'SE';
    } else if (degrees === 180) {
      direction = 'S';
    } else if (degrees > 180 && degrees < 270) {
      direction = 'SW';
    } else if (degrees === 270) {
      direction = 'W';
    } else if (degrees > 270 && degrees < 360) {
      direction = 'NW';
    } else {
      direction = '';
    }

    return speed + ' km/h ' + direction;
  };

}
