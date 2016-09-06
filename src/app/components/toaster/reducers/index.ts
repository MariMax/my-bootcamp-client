import {ActionReducer, Action} from '@ngrx/store';
import {SHOW_TOAST, HIDE_TOAST} from '../actions';
import {ToasterTypes} from '../toaster.component';

export const toasterReducer: ActionReducer<any> = (state: Object = {
  message: '',
  type: ToasterTypes.default,
  active: false
}, action: Action) => {
  switch (action.type) {

    case SHOW_TOAST:
      return Object.assign({}, state, action.payload, {active: true});

    case HIDE_TOAST:
      return Object.assign({}, state, {active: false});

    default:
      return state;
  }
};
