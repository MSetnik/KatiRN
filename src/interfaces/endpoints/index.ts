export interface IStores {
    id: string,
    name: string,
    imgUrl: string
}

export interface ICategory {
    id: string,
    name: string,
}

export interface IProduct {
    id: string,
    name: string,
    categoryId: string,
    storeId: string,
    imgUrl: string,
    fullPrice: number,
    discountedPrice: number,
    description: string,
    startAt: Date,
    endAt: Date
}
