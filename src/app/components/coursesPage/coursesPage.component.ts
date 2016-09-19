import {Component} from '@angular/core';
import {ComponentBase} from '../componentBase';

@Component({
  selector: `courses-page`,
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  host: {
    style: `flex: 1;
            overflow: hidden;
            display:flex;`
  }
})
export class CoursesPage extends ComponentBase {
  loading: boolean = true;

  constructor() {
    super();
  }

  onDestroy() {

  }
}
