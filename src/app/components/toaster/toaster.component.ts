import {Component, ViewEncapsulation, Injectable} from '@angular/core';

import {StoreService} from '../../services/storeService/storeService';
import {SvgUrlResolverService} from '../../services/svgUrlResolver/svgUrlResolver';
import {ComponentBase} from '../componentBase/componentBase';
import * as actions from './actions';
import {toasterReducer} from './reducers';
import {Subject} from 'rxjs'


@Injectable()
export class ToasterService{
  observer = new Subject();

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
    });

    return this.observer;
  }

  hideToaster(){
    this.storageService.dispatch({
      type:actions.HIDE_TOAST
    });

    this.observer.error("");
  }

  confirm(){
    this.observer.next("");
    this.storageService.dispatch({
      type:actions.HIDE_TOAST
    });
  }
}

export enum ToasterTypes{
  default,
  error,
  warning,
  success,
  confirmation
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
  transition: boolean = false;
  timer;

  constructor(
    private storeService:StoreService,
    private svgUrlResolver: SvgUrlResolverService,
    private service: ToasterService){
    super();

    this._subscription(this.storeService.select('toaster')
      .subscribe(state=>{
        this.message = state.message;
        this.type = ToasterTypes[state.type];
        this.active = state.active;
        if (this.active){
          this.timer&&clearTimeout(this.timer);
          this.timer = setTimeout(()=>this.close(), 7000);
        } else {
          this.transition = true;
          setTimeout(_=>this.transition = false, 500);
        }
      }))
  }

  close(){
    this.timer&&clearTimeout(this.timer);
    this.service.hideToaster();
  }

  confirm(){
    this.service.confirm()
  }

  onDestroy(){}
}
