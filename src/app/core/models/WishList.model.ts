export interface wishList {
    pkWishlistId?: any;
    fkProductId?: any;
    arrayProductDetails?: [{
        fkShopId?: any;
        strProductName: any;
        strProductType?: any;
        arrayThumbnail?: [{
            imageUrl: any;
            imageName: any;
        }];
        intMRP?: any;
        blnVeg: any;
        blnBestSeller: any;
    }]

}