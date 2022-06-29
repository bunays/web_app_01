import { Injectable } from '@angular/core';
import { Address } from 'src/app/core/models/Address.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  objAddressSelected: Address

  constructor() { }
}
