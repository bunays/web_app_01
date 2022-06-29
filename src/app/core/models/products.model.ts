export interface Product {
    pkShopProductId?: any;
    fkProductId?: any;
    fkShopId?: any;
    fkCategoryId?: any;
    intQuantity?: any;
    intTotalAmount?: any;
    intTotalOneItem?: any;
    fkSubCategoryId?: any;
    strProductName?: any;
    strDescription?: any;
    strProductStatus?: any;
    strSearchTags?: any;
    strBarcode?: any;
    strProductType?: any;
    arrayThumbnail?: [{
      imageUrl: any;
      imageName: any;
    }];
    arrayOtherImages?: [{
      imageUrl?: any;
      imageName?: any;
  
    }];
    blnFrozenFood?: any;
    intMRP?: any;
    intSellingPrice?: any;
    blnStockAvailability?: any;
    blnMorning?: any;
    blnAfterNoon?: any;
    blnEvening?: any;
    blnNight?: any;
    blnVeg?: any;
    blnBestSeller?: any;
    strProdArabicName?: any;
    strDeliveryTime?: any;
    strShopName?: any;
    pkShopId?: any;
    strUnit?:any;
    blnPriceVariation?: any;
    strVariation?: any;
    arrayAddOnPriceDetails?: [{
      size: any;
      price: any;
    }]
  
  }
  