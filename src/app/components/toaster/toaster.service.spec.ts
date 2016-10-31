import {inject, async, TestBed} from '@angular/core/testing';
import {ToasterService, ToasterTypes} from "./toaster.component";
import {StoreService} from "../../services/storeService/storeService";

import * as actions from './actions';

describe('ToasterService', ()=> {
  let toasterService: ToasterService;
  let dispatchParams = {};
  let reducerParams = {};


  beforeEach(()=> {
    dispatchParams = {};
    reducerParams = {};
    TestBed.configureTestingModule({
      providers: [
        ToasterService,
        {
          provide: StoreService,
          useFactory: ()=>({
            dispatch(params){
              dispatchParams = params
            },
            addReducer(name, func){
              reducerParams = {name, func};
            }
          })
        }
      ]
    });
  });

  beforeEach(inject([ToasterService], (toaser)=> {
    toasterService = toaser;
  }));

  it('should dispatch show event', async(()=> {
      toasterService.showToaster('hi', ToasterTypes.success);
      expect(dispatchParams).toEqual({
        type:actions.SHOW_TOAST,
        payload:{
          message:'hi',
          type:ToasterTypes.success
        }
      })
  }));

  it('should dispatch hide event', async(()=> {
      toasterService.hideToaster();
      expect(dispatchParams).toEqual({
        type:actions.HIDE_TOAST,
      })
  }));

  it('should resolve observable', async(()=> {
    toasterService.showToaster('hi', ToasterTypes.success)
      .subscribe(_=>{
        expect(1).toBe(1);
      });
    toasterService.confirm();
  }));

  it('should throw observable', async(()=> {
    toasterService.showToaster('hi', ToasterTypes.success)
      .subscribe(_=>{
        expect(0).toBe(1);
      },
      _=>expect(1).toBe(1));
    toasterService.hideToaster();
  }));
});
