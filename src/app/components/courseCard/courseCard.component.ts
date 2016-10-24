import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core'
import {Course} from "../../services/coursesService/coursesService";

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

  ngOnInit(){

  }

  editCourse(){
    this.edit.emit(this.course);
  }

  removeCourse(){
    this.remove.emit(this.course);
  }
}
