import {Component} from '@angular/core';
import {ComponentBase} from '../componentBase';
import {AuthService} from '../../services';

@Component({
  selector:`courses-list`,
  styleUrls:[`./styles.css`],
  templateUrl: './template.html'
})
export class CoursesPage extends ComponentBase{

  constructor(private auth:AuthService){
    super();
  }

  signout(){
    this.auth.signout();
  }

  onDestroy(){

  }
}
