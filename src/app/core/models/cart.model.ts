export interface Cart {
  pkCartId?: any;
  fkProductId?: any;
  fkUserID?: any;
  intQuantity?: any;
  strVariation?:any;
  intPrice?: any;
  arrayProductDetails?: [{
    strProductName?: any;
    strDescription?: any;
    strBarcode?: any;
    strProductType?: any;
    arrayThumbnail?: [{
      imageUrl?: any;
      imageName?: any;
    }];
    blnFrozenFood?: any;
    intMRP?: any;
    blnMorning?: any;
    blnAfterNoon?: any;
    blnEvening?: any;
    blnNight?: any;
    blnBestSeller?: any;
    blnVeg?: any;
    strProdArabicName?: any;
  }]

}

export interface CartCount {
  intTotalCount: number;
}

export interface CartCharges {

  intDeliveryCharge?: any;
  intMinimumOrderAmount?: any;
  intServicePercentage?: any;
  intAmountPerKiloMeter?: any;
  
}

