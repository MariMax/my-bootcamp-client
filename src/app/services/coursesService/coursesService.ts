import {Injectable} from '@angular/core';
import {ApiService} from "../apiService/apiService";
import {StoreService} from '../storeService/storeService';
import {SAVE_GLOBAL_ITEM} from '../storeService/actions';
import {coursesListReducer} from './reducers';
import * as actions from './actions';
import {SAVE_FILTERED_COURSES} from "./actions/index";

class Owner {
  constructor(public id: string, public login: string) {}
}

class Course {
  public id: string;
  public title: string;
  public description: string;
  public duration: number;
  public owner: string;
  public authors: Array<string>;
  public date: Date;

  constructor(options:any){
    this.title = options.title
  }

  toString(){
    return `${this.id} ${this.title} ${this.description} ${this.duration} ${this.date}`;
  }
}

@Injectable()
export class CoursesService {
  storageFiled:string = 'coursesList';
  constructor(private storeService: StoreService,
              private api: ApiService) {

    this.storeService.addReducer(this.storageFiled, coursesListReducer);
  }

  buildCourses(rawData) {
    return rawData.items.map(i=>{
      const owner = new Owner(i.owner.id, i.owner.login);
      this.storeService.dispatch({
        type: SAVE_GLOBAL_ITEM,
        payload: {item:owner, field:'id'}
      });
      const authors = i.authors.map(author=>{
        const item = new Owner(author.id, author.name);
        this.storeService.dispatch({
          type: SAVE_GLOBAL_ITEM,
          payload: {item:item, field:'id'}
        });
      });

      const course = new Course(Object.assign({}, i, {authors:authors.map(i=>i.id), owner:owner.id}));
      this.storeService.dispatch({
        type: SAVE_GLOBAL_ITEM,
        payload: {item:course, field:'id'}
      });

      return course;
    })
  }

  downloadCollection() {
    return this.api.get('/course')
      .map(res=>this.buildCourses(res.data))
      .do(courses=>this.storeService.dispatch({
        type: actions.SAVE_COURSES,
        payload: courses.map(i=>i.id)
      }))
  }

  filterCourses(filter){
    const state = this.storeService.getState();
    const itemIds = state[this.storageFiled].items;
    const filteredIds = itemIds.filter(i=>state.globalStorage[i].toString().indexOf(filter)>=0);
    this.storeService.dispatch({
      type:SAVE_FILTERED_COURSES,
      payload: filteredIds
    });
  }

  getFilteredItems(){
    const state = this.storeService.getState();
    const itemIds = state[this.storageFiled].filtered;
    return itemIds.map(i=>state.globalStorage[i]);
  }
}
