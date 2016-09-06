import {Injectable} from '@angular/core';
import {Store, combineReducers, Action} from '@ngrx/store';
import {globalStorageReducer} from './reducers';
import {SAVE_GLOBAL_ITEMS, SAVE_GLOBAL_ITEM, REMOVE_GLOBAL_ITEM} from './actions';

@Injectable()
export class StoreService {
  private initialState = {name:'globalStorage', reducer:globalStorageReducer};
  private reducers:{name:string, reducer}[] = [this.initialState];

  constructor(private store:Store<any>){}

  private _combineReducers(){
    const combination = this.reducers.reduce((result, i)=>{
      result[i.name] = i.reducer;
      return result;
    },{});
    this.store.replaceReducer(combineReducers(combination));
  }

  dropStore(){
    this.store.dispatch({type:'ERASE_STORE'});
  }

  addReducer(name:string, reducer){
    this.reducers = [...this.reducers, {name, reducer}];
    this._combineReducers();  }

  // removeReducer(name){
  //   this.reducers = this.reducers.filter(i=>i.name!==name);
  //   this._combineReducers();
  // }

  saveGlobalItem(item, identityField){
    this.store.dispatch({
      type: SAVE_GLOBAL_ITEM,
      payload: {field: identityField, item}
    })
  }

  // saveGlobalItems(items, identityField){
  //   this.store.dispatch({
  //     type: SAVE_GLOBAL_ITEMS,
  //     payload: {field: identityField, items}
  //   })
  // }

  // removeGlobalItem(id){
  //   this.store.dispatch({
  //     type: REMOVE_GLOBAL_ITEM,
  //     payload: id
  //   })
  // }

  dispatch(action:Action){
    this.store.dispatch(action);
  }

  getStore(){
    return this.store;
  }
}
