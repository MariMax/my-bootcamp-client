import {SAVE_FILTERED_COURSES, SAVE_ACTIVE_COURSES_FILTER, SAVE_COURSES, COURSES_FETCHED, COURSES_FETCHING, SELECT_COURSE} from '../actions';

export const coursesListReducer = (state = { filtered: [], filter: '', items: [], fetching: false, fetchingStarted:false, selected: '' }, action) => {
  switch (action.type) {
    case SAVE_FILTERED_COURSES: {
      return Object.assign({}, state, { filtered: action.payload });
    }

    case SAVE_ACTIVE_COURSES_FILTER: {
      return Object.assign({}, state, { filter: action.payload });
    }

    case SAVE_COURSES: {
      return Object.assign({}, state, { items: action.payload });
    }

    case COURSES_FETCHING: {
      return Object.assign({}, state, { fetching: true, fetchingStarted:true });
    }

    case COURSES_FETCHED: {
      return Object.assign({}, state, { fetching: false });
    }

    case SELECT_COURSE: {
      return Object.assign({}, state, { selected: action.payload });
    }

    default: return state;
  }
};
