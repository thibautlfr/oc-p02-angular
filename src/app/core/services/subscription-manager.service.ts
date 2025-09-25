import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionManagerService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();

  /**
   * Add a subscription to be managed
   * @param subscription Subscription to add
   */
  public add(subscription: Subscription): void {
    this.subscriptions.add(subscription);
  }

  /**
   * Unsubscribe from all managed subscriptions
   */
  public unsubscribeAll(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}