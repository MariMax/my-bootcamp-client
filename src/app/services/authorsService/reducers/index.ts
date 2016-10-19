import {SAVE_AUTHORS} from '../actions';

export const authorsStorageReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_AUTHORS: {
      return action.payload;
    }

    default: return state;
  }
};
