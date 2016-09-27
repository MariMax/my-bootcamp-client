import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ComponentBase} from '../componentBase';

@Component({
  selector:`courses-list`,
  styleUrls:['./styles.css'],
  templateUrl: './template.html'
})
export class CoursesEdit extends ComponentBase{
  id;
  active:boolean = false;

  constructor(private activatedRoute:ActivatedRoute, private router:Router){
    super();

    this._subscriptions([
      this.activatedRoute.params
        .subscribe(params => {
          this.id = params['id'];
        })
      ])
  }

  ngOnInit(){
    setTimeout(()=>this.active = true, 10);
  }

  close(){
    this.active = false;
  setTimeout(()=>this.router.navigateByUrl(`/courses/(list:list)`), 500);
  }

  onDestroy(){

  }
}
