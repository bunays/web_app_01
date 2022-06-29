import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  addressSideNav = new BehaviorSubject(false);
  orderDetails = new BehaviorSubject(false);
  pickandDropOrderDetails = new BehaviorSubject(false);
  serviceOrderDetails = new BehaviorSubject(false);

  authSource: BehaviorSubject<any> = new BehaviorSubject({
    type: 'Login',
        isVisible: false,
    
  });

  rightSideNav: BehaviorSubject<any> = new BehaviorSubject({
    type: 'Auth',
        isVisible: false,
    
  });

  leftSideNav: BehaviorSubject<any> = new BehaviorSubject({
    type: 'ProductDetails',
        isVisible: false,
  });

  addrssSelectionMode:  BehaviorSubject<any> = new BehaviorSubject({
    mode: 'new'
  });

  constructor() { }
}
