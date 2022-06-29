export interface OrderListing {
    strOrderID: string;
    intGrandTotal: number;
    intTotalItemQuantity: number;
    strOrderStatus: string;
    dateCreateDateAndTime: string;
    objItem: OrderItem
  }
  
  export interface TransactionListing {
    
      _id: string;
      strOrderID: string,
      strRedeemedOrderId:string,
      intPointCount: any,
      strRewardStatus: string,
      dateCreateDateAndTime: any;
  
  }
  
  export interface OrderItem {
  
      strItemId: string;
      intQuantity: number;
      intTotalAmount: number;
      intDiscountPercentage: string;
      intTotalOneItem: string;
      blnCheck: string;
      strArticleNo: string;
      strBarcode: string;
      strImagUrl: [{
        imageUrl: string;
        imageName: string;
      }]
      strProductName: string;
      strProdArabicName: string;
      blnFrozenFood: string;
      blnCOD: string;
      blnCardOnDelivery: string,
      blnPayOnline: string,
      strAvailableType: string,
      blnVeg: string,
      blnStockAvailability: string,
      blnMorning: string,
      blnAfterNoon: string,
      blnEvening: string,
      blnNight: string
  
  }