import {Component} from '@angular/core';

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
export class CoursesPage{}
