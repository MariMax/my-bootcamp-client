import {Component} from '@angular/core';
import {ComponentBase} from '../componentBase';

@Component({
  selector:`courses-list`,
  styleUrls:[`./styles.css`],
  templateUrl: './template.html'
})
export class CoursesNew extends ComponentBase{
  constructor(){
    super();
  }

  onDestroy(){

  }
}
