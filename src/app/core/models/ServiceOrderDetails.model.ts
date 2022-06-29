export interface ServiceOrderDetails {
    strOrderID: string;
    fkUtilityServiceId?: any,
    fkUserId?: any,
    intSubTotal?: any,
    intGrandTotal?: any,
    intDeliveryCharge?: any,
    intTotalItemQuantity?: any,
    intTotalDiscountAmount?: any,
    intTotalRewardPoints?: any,
    intDiscount?: any,
    intRewardPointsRedeemed?: any,
    arrayPromocodeDetals?: any,
    intCashAmount?: any,
    intCardAmount?: any,
    intTotalCollectedAmount?: any,
    intDeviationAmount?: any,
    fkAddressId?: any,
    strPaymentMode?: any,
    strPaymentReferenceId?: any,
    strPriorityStatus?: any,
    strOrderStatus?: any,
    strStoreStatus?: any,
    strServiceAdminStatus?: any,
    strServiceStaffStatus?: any,
    strServiceStaffId?: any,
    strInvoiceNumber?: any,
    strTripNumber?: any,
    arrayServiceDetails?: [
        {
            pkUtilityServiceId?: any,
            strServiceName?: any,
            strStatus?: any,
            intServiceCharge?: any,
            strServiceImageUrl?: any,
            strServiceDescription?: any,
            arrServiceQuestionnaire?: [
                {
                    strQuestion?: any,
                    strType?: any,
                    arrAnswers?: [
                        any,
                    ],
                    strAnswer?: any
                }
            ],
            strCreatedUserId?: any,
            dateCreatedTime?: any,
            strUpdatedUserId?: any,
            dateUpdateTime?: any,
            arrFrequency?: [
                any
            ],
            strFrequency?: any
        }
    ],
    strCreateUserId?: any,
    strUpdateUserId?: any,
    dateCreateDateAndTime?: any,
    dateUpdateDateAndTime?: any,
    strStatus?: any,
    dateOrderAccept?: any,
    dateBookingAccepted?: any,
    dateStaffAllocated?: any,
    dateServiceAllocated?: any,
    dateMoveToPack?: any,
    datePackAccepted?: any,
    datePacked?: any,
    dateServiceCompleted?: any,
    dateDeliveryCollect?: any,
    dateDelivered?: any,
    dateCompleted?: any,
    dateCancel?: any,
    dateDeliverOrReturnTimeStamp?: any,
    dateServiceCancel?: any,
    dateOrderPlaceTimeStamp?: any,
    dateOrderPlace?: any,
    dateUpdateTimeStamp?: any,
    dateUpdate?: any,
    arrayUser?: [
        {
            strUserName?: any,
            strPhone?: any
        }
    ],
    arrayAddress?: [
        {
            strAddress?: any,
            strLongitude?: any,
            strLatitude?: any,
            strFullName?: any,
            strCity?: any,
            strMobileNumber?: any,
            strAddressType?: any,
            strLandMark?: any,
            intDistance?: any
        }
    ],
    location?: {
        type?: any,
        coordinates?: [
            any,
        ]
    },
    strDescription?: any,
    intServicePercentage?: any,
    intMinimumOrderAmount?: any,
    strImageUrl?: any,
    strDeviceType?: any,
    arrServiceStaffDetails?: [
        any
    ],
}