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

  showToaster(message='Unknown error, please try again', type){
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

    this.observer.error('');
  }

  confirm(){
    this.observer.next();
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

@Injectable()
export class TimerService {

  setTimeout(callback, time: number) {
    return setTimeout(callback, time);
  }

  clearTimeout(timer) {
    clearTimeout(timer);
  }
}


@Component({
  selector: 'toaster',
  styles:[require('./styles.css')],
  template: require('./template.html'),
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
    private timerService: TimerService,
    private service: ToasterService){
    super();

    this._subscription(this.storeService.select('toaster')
      .subscribe(state=>{
        this.message = state.message;
        this.type = ToasterTypes[state.type];
        this.active = state.active;
        if (this.active){
          this.timer&&this.timerService.clearTimeout(this.timer);
          this.timer = this.timerService.setTimeout(()=>this.close(), 7000);
        } else {
          this.transition = true;
          this.timerService.setTimeout(_=>this.transition = false, 500);
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
