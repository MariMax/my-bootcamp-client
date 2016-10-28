import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppPaths} from '../../app.routes';
import {SvgUrlResolverService} from '../../services';

import {ComponentBase} from '../componentBase';
import {CoursesService} from "../../services/coursesService/coursesService";

@Component({
  selector: `courses-edit`,
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  host: {
    style: `display: flex;
           flex:1;
          overflow: hidden;`
  },
})
export class CoursesEdit extends ComponentBase {
  id:string;
  active: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private svgUrlResolver: SvgUrlResolverService) {
    super();

    this._subscriptions([
      this.activatedRoute.params
        .subscribe(params => {
          this.id = params['id'];
          this.courseService.selectCourse(this.id);
        })
    ])
  }

  ngOnInit() {
    setTimeout(() => this.active = true, 100);
  }

  close() {
    this.active = false;
    setTimeout(() => this.router.navigate([AppPaths.courses.path, { outlets: { list: [AppPaths.courses.children.list.path], details: null } }]), 500);
  }

  onDestroy() {

  }
}
