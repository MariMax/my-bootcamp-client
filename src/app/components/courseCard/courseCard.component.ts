import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core'
import {Course} from "../../services/coursesService/coursesService";
import {ToasterService, ToasterTypes} from "../toaster/toaster.component";

@Component({
  selector: `course-card`,
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './template.html',
  styleUrls: ['./styles.css']
})
export class CourseCard {
  @Input() course: Course;
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();
  subscription:any;

  constructor(private toasterService: ToasterService){}

  ngOnInit(){

  }

  editCourse(){
    this.edit.emit(this.course);
  }

  removeCourse(){
    this.subscription = this.toasterService.showToaster(`Do you really want to remove ${this.course.title}`, ToasterTypes.confirmation)
      .subscribe(_=>{
        this.remove.emit(this.course);
        this.subscription&&this.subscription.unsubscribe();
      }, _=>this.subscription&&this.subscription.unsubscribe());
  }
}
