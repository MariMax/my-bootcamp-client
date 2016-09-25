import {Component} from '@angular/core';
import {ComponentBase} from '../../components/componentBase';
import {CoursesService, Course} from '../../services';
import {LoaderService} from '../loaderModule/loader.service';


@Component({
  selector: `courses-list`,
  styleUrls: [`./styles.css`],
  templateUrl: './template.html'
})
export class CoursesList extends ComponentBase {
  collection: Course[];

  constructor(private coursesService: CoursesService, private loaderService: LoaderService) {
    super();
  }

  ngOnInit() {
    this.loaderService.showLoader();
    const subscription = this.coursesService.downloadCollection()
      .subscribe((collection: Course[])=> {
        this.collection = collection;
        this.loaderService.hideLoader();
        subscription.unsubscribe();
      })
  }

  onDestroy() {
  }
}
