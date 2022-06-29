export interface Category {
    pkCategoryId: string;
    fkShopTypeId: string;
    strCreateUserId: string;
    strName: string;
    strDescription: string;
    strCategoryStatus: string;
    strImageUrl: string;
    strType: string;

}

export interface SubCategory {
    pkCategoryId: string,
    fkShopTypeId: string,
    strShopTypeName: string,
    strCreateUserId: string,
    strName: string,
    strDescription: string,
    strCategoryStatus: string,
    strImageUrl: string,
    strParentCategoryId: string,
    strCategoryName: string,
}
