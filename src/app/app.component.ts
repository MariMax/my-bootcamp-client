import { Component, ViewEncapsulation } from '@angular/core';
import {FBConnector, ApiService} from './services';
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
  name = 'Angular 2 Webpack Starter';

  constructor(private api:ApiService) {}

  ngOnInit() {
    const fbCon: FBConnector = new FBConnector(fbAppID);
    fbCon.initFB();

    // setInterval(()=>{
    //   const subscription = this.api.get('/error')
    //     .subscribe(()=>{});
    // }, 1000)
  }

}
