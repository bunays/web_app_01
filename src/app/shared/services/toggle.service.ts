import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  addressSideNav = new BehaviorSubject(false);


  leftSideNav: BehaviorSubject<any> = new BehaviorSubject({
    type: 'Location',
    isVisible: false,
  });


  addrssSelectionMode: BehaviorSubject<any> = new BehaviorSubject({
    mode: 'new'
  });
  constructor() { }
}
