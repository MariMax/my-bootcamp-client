import { ActionReducer, Action } from '@ngrx/store';

import {LOGIN_FORM, REGISTER_FORM} from '../actions/index';

export const loginFormReducer: ActionReducer<string> = (state = LOGIN_FORM, action: Action) => {
  switch (action.type) {
    case LOGIN_FORM:
      return LOGIN_FORM;

    case REGISTER_FORM:
      return REGISTER_FORM;

    default:
      return state;
  }
};
