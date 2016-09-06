import {Component, ViewEncapsulation, Injectable} from '@angular/core';

import {StoreService} from '../../services/storeService/storeService';
import {ComponentBase} from '../componentBase/componentBase';
import * as actions from './actions';
import {toasterReducer} from './reducers';

@Injectable()
export class ToasterService{
  constructor(private storageService:StoreService){

    this.storageService.addReducer('toaster', toasterReducer);
  }

  showToaster(message, type){
    this.storageService.dispatch({
      type: actions.SHOW_TOAST,
      payload:{
        message,
        type
      }
    })
  }

  hideToaster(){
    this.storageService.dispatch({
      type:actions.HIDE_TOAST
    })
  }
}

export enum ToasterTypes{
  default,
  error,
  warning,
  success
}


@Component({
  selector: 'toaster',
  styleUrls:['./styles.css'],
  templateUrl: './template.html',
  encapsulation: ViewEncapsulation.Emulated,

  host: {
    style:'position:absolute; right:0'
  }
})
export class ToasterComponent extends ComponentBase{
  message:string;
  type:string = 'default';
  active:boolean = false;
  store;
  timer;

  constructor(
    private storeService:StoreService,
    private service: ToasterService){
    super();

    this.store = this.storeService.getStore();

    this._subscription(this.store.select('toaster')
      .subscribe(state=>{
        this.message = state.message;
        this.type = ToasterTypes[state.type];
        this.active = state.active;
        if (this.active){
          this.timer&&clearTimeout(this.timer);
          this.timer = setTimeout(()=>this.close(), 7000);
        }
      }))
  }

  close(){
    this.timer&&clearTimeout(this.timer);
    this.service.hideToaster();
  }

  onDestroy(){}
}
