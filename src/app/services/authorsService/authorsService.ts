import {Injectable} from '@angular/core';
import {ApiService} from "../apiService/apiService";
import {StoreService} from '../storeService/storeService';
import {SAVE_GLOBAL_ITEM} from '../storeService/actions';
import {authorsStorageReducer} from './reducers';
import {SAVE_AUTHORS} from "./actions";

export class Author {
  constructor(public id: string, public name: string, public selected: boolean) { }
}

@Injectable()
export class AuthorsService {
  storageFiled: string = 'authorsIds';
  constructor(private storeService: StoreService,
    private api: ApiService) {

    this.storeService.addReducer(this.storageFiled, authorsStorageReducer);
  }

  buildAuthors(items) {
    return items.map(i => {
      const author = new Author(i.id, i.name, false);
      this.storeService.dispatch({
        type: SAVE_GLOBAL_ITEM,
        payload: { item: author, field: 'id' }
      });

      return author;
    })
  }

  downloadCollection() {
    return this.api.get('/authors')
      .map(res => this.buildAuthors(res.items))
      .do(courses => this.storeService.dispatch({
        type: SAVE_AUTHORS,
        payload: courses.map(i => i.id)
      }))
  }

  getAuthors() {
    const state = this.storeService.getState();
    const itemIds = state[this.storageFiled];
    return itemIds.map(i => state.globalStorage[i]);
  }
}
