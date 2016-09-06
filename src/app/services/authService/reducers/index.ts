import * as actions from '../actions';
import {Action} from '@ngrx/store';

export const authReducer = (state:any={token:'', user:''}, action:Action)=>{
  switch(action.type){
    case actions.DROP_TOKEN:
      return Object.assign({}, state, {token:''});

    case actions.SET_TOKEN:
      return Object.assign({}, state, {token:action.payload});

    case actions.SET_USER:
      return Object.assign({}, state, {user: action.payload});

    case actions.DROP_USER:
      return Object.assign({}, state, {user:''});

    default:
      return state;
  }
};
