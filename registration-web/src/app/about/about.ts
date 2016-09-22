import { Component } from '@angular/core';

@Component({
  selector: 'rg-about',
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
