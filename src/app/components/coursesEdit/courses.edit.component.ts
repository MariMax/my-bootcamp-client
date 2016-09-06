import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ComponentBase} from '../componentBase';

@Component({
  selector:`courses-list`,
  styleUrls:[`./styles.css`],
  templateUrl: './template.html'
})
export class CoursesEdit extends ComponentBase{
  id;

  constructor(private activatedRoute:ActivatedRoute,){
    super();

    this._subscriptions([
      this.activatedRoute.params
        .subscribe(params => {
          this.id = params['id'];
        })
      ])
  }

  onDestroy(){

  }
}
