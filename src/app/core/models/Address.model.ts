export interface Address {
    pkAddressId?: string;
    fkUserId?: string;
    strName?: string;
    strPhone?: string;
    strAddress?: string;
    strLongitude?: number;
    strLatitude?: string;
    strOptional?: string;
    strStatus?: string;
    dateCreated?: string;
    strHouseNumber?: string;
    strLandMark?: string;
    strBuildingNumber?: any;
    strZoneNumber?: any;
    strStreetNumber?: any;
    strAddressType?: string;
    strFullName?: string;
    strMobileNumber?: string;
    strCity?: string;
    arrayStore?: [{
        strStoreId?: string;
        strShopName?: string;
        intDistance?: string;
    }];

}