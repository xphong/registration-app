import {Component} from 'angular2/core';

@Component({
  selector: 'about',
  template: require('./about.html')
})
export class About {
  title = 'Weather App';

  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
  }

}
