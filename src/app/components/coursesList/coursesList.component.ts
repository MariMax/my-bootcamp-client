import {Component} from '@angular/core';
import {ComponentBase} from '../../components/componentBase';
import {CoursesService, Course} from '../../services';
import {LoaderService} from '../loaderModule/loader.service';
import {Router} from "@angular/router";
import {StoreService} from '../../services';
import {AppPaths} from '../../app.routes';


@Component({
  selector: `courses-list`,
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  host: {
    style: `display: flex;
           flex:1;
          overflow: hidden;`
  },
})
export class CoursesList extends ComponentBase {
  collection: Course[];
  store:any;

  constructor(private coursesService: CoursesService, private loaderService: LoaderService, private router: Router, private storeService:StoreService) {
    super();
    this.store = this.storeService.getStore();
  }

  ngOnInit() {
    this.loaderService.showLoader();
    const subscription = this.coursesService.downloadCollection()
      .subscribe(collection=> {
        this.collection = collection;
        this.loaderService.hideLoader();
        subscription.unsubscribe();
      });

      this._subscription(this.store.select(state=>({coursesState:state[this.coursesService.storageFiled].filtered, global:state.globalStorage}))
        .subscribe(state=>this.collection = state.coursesState.map(i=>state.global[i])))
  }

  removeCourse(course:Course){
    this.loaderService.showLoader();
    const subscription = this.coursesService.removeCourse(course.id)
      .subscribe(()=>{
        this.loaderService.hideLoader();
        subscription.unsubscribe();
      }, ()=>{
        this.loaderService.hideLoader();
        subscription.unsubscribe();
      })
  }

  editCourse(course:Course){
    const route = `/${AppPaths.COURSES}/(list:list//details:${AppPaths.COURSES_EDIT}/${course.id})`;
    this.router.navigateByUrl(route);
  }

  onDestroy() {
  }
}
