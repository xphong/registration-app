import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.html'
})
export class App {
  title = 'Registration App';

  constructor() {

  }
}
