import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSuject = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isLoading() {
    return this.isLoadingSuject.asObservable();
  }

  showLoading() {
    this.isLoadingSuject.next(true);
  }

  hideLoading() {
    this.isLoadingSuject.next(false);
  }
}
