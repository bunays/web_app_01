export interface ShopType {
    pkShopTypeId?: string,
    strName?: string,
    strArabicName?: any,
    strStatus?: string,
    strImageUrl?: string,
    strColorCode?: string,
    strShowStatus?: string,
    intSort?: number,
    strType?: string,
    strIcon?: string,
}

export interface ShopTypes {

    pkShopTypeId?: string,
    strName?: string,
    strImageUrl?: string,
    strStatus?: string,
    strShowStatus?: string,
    strColorCode?: string,
    strArabicName?: string,
    intSort?: number,
    strIcon?: any,
    arrayStoreAndCategoryDetails?: [
        {
            arrayCategories?: [
                {
                    pkCategoryId?: string,
                    fkShopTypeId?: string,
                    strCreateUserId?: string,
                    strName?: string,
                    strDescription?: string,
                    strCategoryStatus?: string,
                    strImageUrl?: any,
                    strStatus?: string,
                    strType?: string,
                    intSortNo?: any,
                    strViewType?: string,
                    strArabicName?: string,
                    fkShopId?: string,
                    fkShopName?: string
                }
            ],
            arrShop?: [
                {
                    pkShopId?: string;
                    strShopName?: string;
                    strShopTypeName?: string;
                    strShopTypeId?: string;
                    strImageUrl?: string;
                    strStatus?: string;
                    strStoreStatus?: string;
                    intMaxDistance?: any;
                    intSort?: any;
                    intMaxOrderCount?: any;
                    location?: {
                        type?: string;
                        coordinates?: any;
                    };
                    strAvailableDay?: [{
                        DAYS?: []
                    }];
                    FromTime?: number;
                    ToTime?: number;
                    intDeliveryCharge?: any;
                    intMinimumOrderAmount?: any;
                    intServicePercentage?: any;
                    strIconUrl?: string;
                    strHead?: string;
                    strMessage?: string;
                    strPlace?: string;
                    strImage?: string,
                    strDeliveryTime?: string;
                    strDishes?: string;
                    intRating?: any;
                    intDiscount?: any;
                    strListingType?: string;
                    strShopImage?: string,
                    intAmountPerKiloMeter?: any;
                    blnCategoryListing?: any;
                    strShopArabicName?: string;
                    strContactNumber?: string,
                    strShopEmail?: string,
                    strStaffName?: string,
                    dist?: {
                        calculated?: any
                    }
                }
            ]
        }
    ]
}
