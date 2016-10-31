import {
  inject,
  async,
  TestBed
} from '@angular/core/testing';

import {ToasterComponent, ToasterService, ToasterTypes, TimerService} from './toaster.component';
import {Subject} from "rxjs";
import {StoreService} from "../../services/storeService/storeService";
import {SvgUrlResolverService} from "../../services/svgUrlResolver/svgUrlResolver";

describe('ToasterComponent', () => {
  let observer = new Subject();
  let hideCalled = 0;
  let confirmCalled = 0;
  let toaster: ToasterComponent;

  beforeEach(()=> {
    hideCalled = 0;
    confirmCalled = 0;
    observer = new Subject();
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ToasterComponent,
      {
        provide: StoreService,
        useFactory: ()=>({
          select(){
            return observer;
          }
        })
      },
      {
        provide: ToasterService,
        useFactory: ()=>({
          hideToaster(){
            hideCalled++;
          },
          confirm(){
            confirmCalled++;
          }
        })
      },
      {
        provide: SvgUrlResolverService,
        useFactory: ()=>({
          getUrl(){
            return 'url';
          }
        })
      },
      {
        provide: TimerService,
        useFactory:()=>({
          setTimeout(callback){
            callback();
          },
          clearTimeout(){

          }
        })
      }
    ]
  }));

  beforeEach(inject([ToasterComponent], (_)=> {
    toaster = _;
  }));

  it('should be defined', () => {
    expect(toaster).toBeDefined();
  });

  it('should call confirm on toaster service on confirm action', () => {
    toaster.confirm();
    expect(confirmCalled).toBeGreaterThan(0);
  });

  it('should call hide on toaster service on close action', () => {
    toaster.close();
    expect(hideCalled).toBeGreaterThan(0);
  });

  it('should became active on open action', () => {
    observer.next({
      message: 'hi',
      type: ToasterTypes.confirmation,
      active: true
    });

    expect(toaster.active).toBeTruthy();
  });

  it('should be closed after 7 seconds', async(() => {
    observer.next({
      message: 'hi',
      type: ToasterTypes.confirmation,
      active: true
    });

    expect(hideCalled).toBeGreaterThan(0)
  }));

});
