import { Component, ViewEncapsulation } from '@angular/core';
import {FBConnector} from './services';
import {fbAppID} from './appConfig';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
    <main>
      <toaster></toaster>
      <router-outlet></router-outlet>
    </main>
    <footer></footer>`
})
export class App {
  constructor() {}

  ngOnInit() {
    const fbCon: FBConnector = new FBConnector(fbAppID);
    fbCon.initFB();
  }

}
