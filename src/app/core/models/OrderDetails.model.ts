import { ShopDetails } from './shop-details.model';
import { Address } from 'src/app/core/models/Address.model';
import { OrderItem } from './orders.model';
import { Product } from 'src/app/core/models/products.model';
export interface OrderDetails {
  strOrderID: string;
  strStoreId: string;
  intSubTotal: number;
  intGrandTotal: number;
  intDeliveryCharge: number;
  intTotalItemQuantity: number;
  intTotalDiscountAmount: number;
  intTotalRewardPoints: number;
  arrayPromocodeDetals: [];
  intDiscount: string;
  intRewardPointsRedeemed:any;
  intCashAmount: number;
  intCardAmount: number;
  intTotalCollectedAmount: number;
  fkAddressId: string;
  strPaymentMode: string;
  blnFrozen: string;
  strPaymentReferenceId: string,
  strPriorityStatus: string,
  strOrderStatus: string,
  strStoreStatus: string,
  strDeliveryAdminStatus: string ,
  strDeliveryStaffStatus: string,
  strDeliveryStaffId: string,
  strInvoiceNumber: string,
  strTripNumber: string,
  arrayProductDetails: Product[];
  objItem: OrderItem;
  dateDeliverOrReturn: string,
  dateOrderPlaceTimeStamp: string,
  dateOrderPlace: string,
  dateUpdateTimeStamp: string,
  dateUpdate: string,
  arrayUser: [{
    strUserName: string;
    strPhone: string
  }];
  arrayAddress: Address[];
  arrayShop: ShopDetails[];
  arrayDeliveryStaff?: [{
    strName?: string;
    strStaffId?: string;
  }]

}