export interface ShopDetails {
  pkShopId: string;
  strShopName?: string;
  strShopTypeName?: string;
  strShopTypeId: string;
  strStatus: string;
  strStoreStatus: string;
  intMaxDistance: string;
  location: {
    type: string;
    coordinates: any;
  };
  dateCreatedTime: string;
  dateUpdateTime: string;
  strAvailableDay: [{
    DAYS: []
  }];
  FromTime: number;
  ToTime: number;
  intSort: string;
  intDeliveryCharge: string;
  intMinimumOrderAmount: string;
  intServicePercentage: string;
  strIconUrl: string;
  strShopImage: string;
  strImageUrl: string;
  intMaxOrderCount: string;
  strHead: string;
  strMessage: string;
  strPlace: string;
  strDeliveryTime: string;
  strDishes: string;
  intRating: string;
  intDiscount: string;
  strListingType: string;
  intAmountPerKiloMeter: string;
  blnCategoryListing: string;
  strShopArabicName: string;
  }