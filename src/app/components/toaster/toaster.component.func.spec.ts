import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ToasterComponent, ToasterService, TimerService, ToasterTypes} from './toaster.component';
import {StoreService} from "../../services/storeService/storeService";
import {SvgUrlResolverService} from "../../services/svgUrlResolver/svgUrlResolver";
import {Subject} from "rxjs";

describe('ToasterComponent Func', () => {
  let observer = new Subject();
  let hideCalled = 0;
  let confirmCalled = 0;
  let fixture, comp;

  beforeEach(() => {
    observer = new Subject();
    hideCalled = 0;
    confirmCalled = 0;

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ToasterComponent],
      providers: [
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
          useFactory: ()=>({
            setTimeout(callback){
              callback();
            },
            clearTimeout(){

            }
          })
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToasterComponent);
    comp = fixture.componentInstance;
  });


  it('should show message', () => {
    observer.next({
      message: 'very special message',
      type: ToasterTypes.confirmation,
      active: true
    });

    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.toast > p'));
    expect(message.nativeElement.textContent).toContain('very special message');
  });

  it('should confirm action on click', () => {
    observer.next({
      message: 'very special message',
      type: ToasterTypes.confirmation,
      active: true
    });

    fixture.detectChanges();
    const confirmButton = fixture.debugElement.query(By.css('.confirm'));
    const eventObj = new Event('click');
    confirmButton.nativeElement.dispatchEvent(eventObj);
    fixture.detectChanges();
    expect(confirmCalled).toBeGreaterThan(0);
  });

  it('should hide toaster on decline button click', () => {
    observer.next({
      message: 'very special message',
      type: ToasterTypes.confirmation,
      active: true
    });

    fixture.detectChanges();
    const hideButton = fixture.debugElement.query(By.css('.decline'));
    const eventObj = new Event('click');
    hideButton.nativeElement.dispatchEvent(eventObj);
    fixture.detectChanges();
    expect(hideCalled).toBeGreaterThan(0);
  });

  it('should hide toaster on close button click', () => {
    observer.next({
      message: 'very special message',
      type: ToasterTypes.confirmation,
      active: true
    });

    fixture.detectChanges();
    const hideButton = fixture.debugElement.query(By.css('.close'));
    const eventObj = new Event('click');
    hideButton.nativeElement.dispatchEvent(eventObj);
    fixture.detectChanges();
    expect(hideCalled).toBeGreaterThan(0);
  });

  it('should not have confirm/decline buttons if type !== confirmation', () => {
    observer.next({
      message: 'very special message',
      type: ToasterTypes.error,
      active: true
    });

    fixture.detectChanges();
    const buttonsSection = fixture.debugElement.query(By.css('.prompt.confirmation'));
    expect(buttonsSection).toBeNull();
  });

  it('should have confirm/decline buttons if type === confirmation', () => {
    observer.next({
      message: 'very special message',
      type: ToasterTypes.confirmation,
      active: true
    });

    fixture.detectChanges();
    const buttonsSection = fixture.debugElement.query(By.css('.prompt.confirmation'));
    expect(buttonsSection).toBeDefined();
  });


});
