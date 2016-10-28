import {Injectable} from '@angular/core';
import {Store, combineReducers, Action} from '@ngrx/store';
import {globalStorageReducer} from './reducers';
import {SAVE_GLOBAL_ITEM} from './actions';

@Injectable()
export class StoreService {
  private initialState = {name: 'globalStorage', reducer: globalStorageReducer};
  private reducers: {name: string, reducer}[] = [this.initialState];

  constructor(private store: Store<any>) {
  }

  private _combineReducers() {
    const combination = this.reducers.reduce((result, i)=> {
      result[i.name] = i.reducer;
      return result;
    }, {});
    this.store.replaceReducer(combineReducers(combination));
  }

  select = this.store.select.bind(this.store);

  dropStore() {
    this.store.dispatch({type: 'ERASE_STORE'});
  }

  addReducer(name: string, reducer) {
    this.reducers = [...this.reducers, {name, reducer}];
    this._combineReducers();
  }

  getState():any {
    let state;
    this.store.take(1).subscribe(s => state = s);
    return state;
  }

  saveGlobalItem(item, identityField) {
    this.store.dispatch({
      type: SAVE_GLOBAL_ITEM,
      payload: {field: identityField, item}
    })
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getStore() {
    return this.store;
  }
}
