import {Injectable} from '@angular/core';
import {StoreService} from '../../services';
import {loaderReducer, showLoader, hideLoader} from './reduxStaff';

@Injectable()
export class LoaderService{
  storageField:string = 'loaderState';
  constructor(private storageService: StoreService){
    this.storageService.addReducer(this.storageField, loaderReducer);
  }

  showLoader(){
    this.storageService.dispatch(showLoader());
  }

  hideLoader(){
    this.storageService.dispatch(hideLoader());
  }
}
