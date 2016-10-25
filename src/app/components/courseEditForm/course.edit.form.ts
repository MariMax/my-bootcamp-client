import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {ComponentBase} from '../componentBase';
import {StoreService, CoursesService, Course} from '../../services';
import {ToasterService, ToasterTypes} from '../../components/toaster';
import {SvgUrlResolverService} from '../../services';
import {LoaderService} from '../loaderModule/loader.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorsService, Author} from "../../services/authorsService/authorsService";

@Component({
  selector: `course-edit-form`,
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
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

  editForm: FormGroup;

  course: Course;
  activeAuthors: any[];
  selectableAuthors: any[];


  constructor(private storageService: StoreService,
              private coursesService: CoursesService,
              private loaderService: LoaderService,
              private svgUrlResolver: SvgUrlResolverService,
              private authorsService: AuthorsService,
              private formBuilder: FormBuilder,
              private toasterService: ToasterService) {
    super();

    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._subscription(this.storageService.select(state => ({
      authorsIds: state[this.authorsService.storageFiled],
      coursesState: state[this.coursesService.storageFiled],
      globalStorage: state.globalStorage
    }))
      .subscribe(state => {
        this.selectableAuthors = state.authorsIds.map(i=>new Author(state.globalStorage[i].id, state.globalStorage[i].name, false));
        this.activeAuthors = [];
        if (this.courseId === 'new') {
          this.course = new Course();
          return;
        }

        if (!state.coursesState.fetching && state.coursesState.fetchingStarted && !state.globalStorage[this.courseId]) {
          this.closeForm();
          this.unsubscribe();
          this.toasterService.showToaster(`course ${this.courseId} is not found`, ToasterTypes.error);
          return;
        }

        this.course = state.globalStorage[this.courseId];
        if (this.course) {
          this.editForm.controls['title']['setValue'](this.course.title);
          this.editForm.controls['description']['setValue'](this.course.description);
          this.editForm.controls['date']['setValue'](this.course.date);
          this.editForm.controls['duration']['setValue'](this.course.duration);

          this.selectableAuthors = this.selectableAuthors.filter(i=> {
            const author = this.course.authors.find(u=>u === i.id);
            return !author;
          });
          this.activeAuthors = this.course.authors.map(i=>state.globalStorage[i]).filter(i=>i);
        }
        return;
      }))
  }

  // ngOnChanges() {
  //   this.storageService.dispatch({type: 'PING_REDUX'});
  // }

  closeForm() {
    this.done.next();
  }

  selectAuthor(author) {
    author.selected = !author.selected;
  }

  addAuthors() {
    this.activeAuthors = [...this.activeAuthors, ...this.selectableAuthors.filter(i=>i.selected)];
    this.selectableAuthors = this.selectableAuthors.filter(i=>!i.selected);
    this.activeAuthors.forEach(i=>i.selected = false);
  }

  removeAuthor(author) {
    this.activeAuthors = this.activeAuthors.filter(i=>i !== author);
    this.selectableAuthors = [...this.selectableAuthors, author];
  }

  submitChanges(data: any, form) {
    if (!form.valid) {
      return this.toasterService.showToaster(`Please fill the form`, ToasterTypes.error);
    }

    this.course.title = data.title;
    this.course.duration = data.duration;
    this.course.date = new Date(data.date);
    this.course.description = data.description;
    this.course.authors = this.activeAuthors.map(i=>i.id);

    const subscription = this.coursesService.addCourse(this.course)
      .subscribe(()=> {
        subscription.unsubscribe();
        this.closeForm();
      })

  }

  onDestroy() {

  }
}