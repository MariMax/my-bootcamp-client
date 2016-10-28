import {Injectable} from '@angular/core';
import {ApiService} from "../apiService/apiService";
import {StoreService} from '../storeService/storeService';
import {SAVE_GLOBAL_ITEM} from '../storeService/actions';
import {coursesListReducer} from './reducers';
import {SAVE_FILTERED_COURSES, COURSES_FETCHING, COURSES_FETCHED, SAVE_COURSES, SELECT_COURSE} from "./actions";

export class Owner {
  constructor(public id: string, public login: string) { }
}

export class Course {
  public id: string;
  public title: string;
  public description: string;
  public duration: number;
  public owner: string;
  public authors: Array<string>;
  public date: Date;

  constructor(options: any = {}) {
    this.title = options.title;
    this.id = options.id;
    this.owner = options.owner;
    this.description = options.description;
    this.duration = options.duration;
    this.date = new Date(options.date || Date.now());
    this.authors = options.authors;
  }

  toString() {
    return `${this.id} ${this.title} ${this.description} ${this.duration} ${this.date}`;
  }
}

@Injectable()
export class CoursesService {
  storageFiled: string = 'coursesList';
  constructor(private storeService: StoreService,
    private api: ApiService) {

    this.storeService.addReducer(this.storageFiled, coursesListReducer);
  }

  buildCourses(items) {
    return items.map(i => {
      const course = new Course(i);
      this.storeService.dispatch({
        type: SAVE_GLOBAL_ITEM,
        payload: { item: course, field: 'id' }
      });

      return course;
    })
  }

  downloadCollection() {
    this.storeService.dispatch({ type: COURSES_FETCHING });
    return this.api.get('/course')
      .map(res => this.buildCourses(res.items))
      .do(courses => this.storeService.dispatch({
        type: SAVE_COURSES,
        payload: courses.map(i => i.id)
      }))
      .do(courses => this.storeService.dispatch({
        type: COURSES_FETCHED,
      }))
      .map(() => this.filterCourses())
      .map(() => this.getFilteredItems())
  }

  filterCourses(filter = '') {
    const state = this.storeService.getState();
    const itemIds = state[this.storageFiled].items;
    const filteredIds = itemIds.filter(i => state.globalStorage[i].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    this.storeService.dispatch({
      type: SAVE_FILTERED_COURSES,
      payload: filteredIds
    });
    return filteredIds;
  }

  getFilteredItems() {
    const state = this.storeService.getState();
    const itemIds = state[this.storageFiled].filtered;
    return itemIds.map(i => state.globalStorage[i]);
  }

  getCoutses(){
    const state = this.storeService.getState();
    const itemIds = state[this.storageFiled].items;
    return itemIds.map(i => state.globalStorage[i]);
  }

  removeCourse(id) {
    return this.api.delete(`/course?id=${id}`)
      .do(() => {
        const state = this.storeService.getState();
        const itemIds = state[this.storageFiled].items.filter(i => i !== id);
        const filteredItems = state[this.storageFiled].filtered.filter(i => i !== id);
        this.storeService.dispatch({
          type: SAVE_FILTERED_COURSES,
          payload: filteredItems
        });
        this.storeService.dispatch({
          type: SAVE_COURSES,
          payload: itemIds
        });
      });
  }

  addCourse(course: any) {
    const courses = this.getCoutses();
    const exists = courses.find(i=>i.id === course.id);
    if (exists){
      return this.api.put('/course', course)
        .do(course=>this.buildCourses([course]))
    }

    return this.api.post('/course', course)
      .do(course => {
        const newCourse = this.buildCourses([course]);
        const state = this.storeService.getState();
        const itemIds = [...state[this.storageFiled].items, newCourse[0].id];
        const currentFilter = state[this.storageFiled].filter;
        this.storeService.dispatch({
          type: SAVE_COURSES,
          payload: itemIds
        });
        this.filterCourses(currentFilter);
      });
  }

  selectCourse(id){
    this.storeService.dispatch({
      type: SELECT_COURSE,
      payload: id
    });
  }
}
