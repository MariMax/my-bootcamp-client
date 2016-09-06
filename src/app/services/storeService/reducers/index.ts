import { Action} from '@ngrx/store';
import * as actions from '../actions';

export const globalStorageReducer = (state:Object = {}, action: Action) => {
  switch (action.type) {
    case actions.SAVE_GLOBAL_ITEM: {
      const {item, field} = action.payload;
      return Object.assign({}, state, {[item[field]]: item});
    }

    case actions.SAVE_GLOBAL_ITEMS: {
      const {items, field} = action.payload;
      return Object.assign({}, state, items.reduce((result, i)=>result[i[field]] = i, {}));
    }

    case actions.REMOVE_GLOBAL_ITEM: {
      const id = action.payload;
      let newState = Object.assign({}, state);
      delete newState[id];
      return newState;
    }

    default:
      return state
  }
};
