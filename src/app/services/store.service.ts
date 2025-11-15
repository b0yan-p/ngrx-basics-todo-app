import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  store$ = new Subject<any>();

  subscription?: Subscription;

  constructor() {
    this.store$.next({});
  }

  writeToStore(value: any) {
    this.store$.next(value);
  }
}
