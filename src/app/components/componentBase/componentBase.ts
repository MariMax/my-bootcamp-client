import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

export abstract class ComponentBase implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor() {
  }

  protected unsubscribe(){
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnDestroy() {
    this.unsubscribe();
    this.subscriptions = null;
    this.onDestroy();
  }

  protected _subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  protected _subscriptions(subscriptions: Subscription[]) {
    this.subscriptions.push(...subscriptions);
  }

  abstract onDestroy();
}
