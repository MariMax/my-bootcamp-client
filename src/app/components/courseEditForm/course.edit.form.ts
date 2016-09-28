import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {ComponentBase} from '../componentBase';
import {StoreService, CoursesService, Course} from '../../services';
import {ToasterService, ToasterTypes} from '../../components/toaster';
import {LoaderService} from '../loaderModule/loader.service';

@Component({
  selector: `course-edit-form`,
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: `display: flex;
           flex:1;
           width:100%;
          overflow: hidden;`
  },
})
export class CourseEditForm extends ComponentBase {
  @Input() courseId: string;
  @Output() done = new EventEmitter();

  course: Course;

  constructor(
    private storageService: StoreService,
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private toasterService: ToasterService) {
    super();
  }

  ngOnInit() {
    this._subscription(this.storageService.select(state => ({ coursesState: state[this.coursesService.storageFiled], globalStorage: state.globalStorage }))
      .subscribe(state => {
        if (!state.coursesState.fetching && state.coursesState.fetchingStarted && !state.globalStorage[this.courseId]){
          this.closeForm();
          this.unsubscribe();
          return this.toasterService.showToaster(`course ${this.courseId} is not found`, ToasterTypes.error);
        }

        this.course = state.globalStorage[this.courseId];
      }))
  }

  ngOnChanges(){
    this.storageService.dispatch({type:'PING_REDUX'});
  }

  closeForm() {
    this.done.next();
  }

  onDestroy() {
    
  }
}
