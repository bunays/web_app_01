export interface Notifications {
    strOrderID: string,
    fkUserId: any,
    strItemId: any,
    arrayProductDetails: {
        strItemId: any,
        intQuantity: number,
        intTotalAmount: number,
        intDiscountPercentage: any,
        intTotalOneItem: number,
        blnCheck: any,
        strArticleNo: any,
        strBarcode: any,
        strImagUrl: [
            {
                imageUrl: any,
                imageName: any
            }
        ],
        strProductName: any,
        blnFrozenFood: any,
        blnCOD: any,
        blnCardOnDelivery: any,
        blnPayOnline: any,
        strAvailableType: any,
        blnVeg: any,
        blnStockAvailability: any,
        blnMorning: any,
        blnAfterNoon: any,
        blnEvening: any,
        blnNight: any
    },
    intTotalItemQuantity: number,
    strOrderStatus: any
}