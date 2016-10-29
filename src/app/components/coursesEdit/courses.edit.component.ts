import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppPaths} from '../../app.routes';
import {SvgUrlResolverService} from '../../services';

import {ComponentBase} from '../componentBase';
import {CoursesService} from "../../services/coursesService/coursesService";
import {BreadcrumbsService} from "../breadcrumbs/breadcrumbs.component";

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
  id: string;
  active: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private courseService: CoursesService,
              private breadcrumbsService: BreadcrumbsService,
              private svgUrlResolver: SvgUrlResolverService) {
    super();

    this._subscriptions([
      this.activatedRoute.params
        .subscribe(params => {
          this.id = params['id'];
          this.courseService.selectCourse(this.id);
          const courseName = this.courseService.getTitle(this.id);

          this.breadcrumbsService.addItem(
            courseName,
            'courseItem',
            this._transitTotheCourse.bind(this, this.id)
          );
        })
    ])
  }

  ngOnInit() {
    setTimeout(() => this.active = true, 100);
  }

  _transitTotheCourse(id) {
    this.router.navigate([AppPaths.courses.path, {
      outlets: {
        list: [AppPaths.courses.children.list.path],
        details: [AppPaths.courses.children.edit.path, id]
      }
    }]);
  }

  close() {
    this.active = false;
    setTimeout(() => this.router.navigate([AppPaths.courses.path, {
      outlets: {
        list: [AppPaths.courses.children.list.path],
        details: null
      }
    }]), 500);
  }

  onDestroy() {
    this.breadcrumbsService.removeItem('courseItem');
  }
}
