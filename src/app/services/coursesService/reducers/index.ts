import {SAVE_FILTERED_COURSES, SAVE_ACTIVE_COURSES_FILTER, SAVE_COURSES} from '../actions';

export const coursesListReducer = (state = {filtered:[], filter:'', items:[]}, action) =>{
  switch (action.type){
    case SAVE_FILTERED_COURSES:{
      return Object.assign({}, state, {filtered:action.payload});
    }

    case SAVE_ACTIVE_COURSES_FILTER:{
      return Object.assign({}, state, {filter: action.payload});
    }

    case SAVE_COURSES:{
      return Object.assign({}, state, {items: action.payload});
    }

    default: return state;
  }
};
