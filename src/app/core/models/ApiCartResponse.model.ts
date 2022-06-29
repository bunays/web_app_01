import { CartCharges, CartCount } from './cart.model';
export interface ApiCartResponse {
  success: boolean;
  message: string;
  data: any;
  count: CartCount;
  shopDetails?: any;
  charges: CartCharges

}