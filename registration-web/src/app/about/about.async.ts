import {Component} from 'angular2/core';

@Component({
  selector: 'about',
  template: require('./about.html')
})
export class About {
  title = 'Registration App';

  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
  }

}
