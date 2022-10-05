import { ICatalog, ICategory, IProduct } from '../../src/interfaces/endpoints'

export const categories: ICategory[] = [
  {
    name: 'category 2',
    id: '2'
  },
  {
    name: 'category 3',
    id: '3'
  },
  {
    name: 'category 4',
    id: '4'
  },
  {
    name: 'category 5',
    id: '5'
  }
]

export const products: IProduct[] = [
  {
    // valid
    name: 'name 1',
    description: 'desc',
    categoryId: '4',
    storeId: '1',
    startAt: (parseInt(Date.now().toString().substring(0, 10)) - (3600 * 12)).toString(),
    endAt: (parseInt(Date.now().toString().substring(0, 10)) + (3600 * 12)).toString(),
    fullPrice: 1,
    discountedPrice: 0.2,
    id: '1',
    imgUrl: 'daw'
  },
  {
    // expired
    name: 'name 2',
    description: 'desc',
    categoryId: '2',
    storeId: '2',
    startAt: (parseInt(Date.now().toString().substring(0, 10)) - (3600 * 12)).toString(),
    endAt: (parseInt(Date.now().toString().substring(0, 10)) - (3600 * 2)).toString(),
    fullPrice: 1,
    discountedPrice: 0.2,
    id: '2',
    imgUrl: 'daw'
  },
  {
    // valid
    name: 'name 3',
    description: 'desc',
    categoryId: '3',
    storeId: '3',
    startAt: (parseInt(Date.now().toString().substring(0, 10)) - (3600 * 1)).toString(),
    endAt: (parseInt(Date.now().toString().substring(0, 10)) + (3600 * 1)).toString(),
    fullPrice: 1,
    discountedPrice: 0.2,
    id: '3',
    imgUrl: 'daw'
  },
  {
    // valid
    name: 'name 4',
    description: 'desc',
    categoryId: '4',
    storeId: '1',
    startAt: (parseInt(Date.now().toString().substring(0, 10)) - (3600 * 1)).toString(),
    endAt: (parseInt(Date.now().toString().substring(0, 10)) + (3600 * 12)).toString(),
    fullPrice: 1,
    discountedPrice: 0.2,
    id: '4',
    imgUrl: 'daw'
  }
]

export const catalogs: ICatalog[] = [
  {
    // Catalog valid now
    id: '1',
    dateFrom: (parseInt(new Date().getTime().toString().substring(0, 10)) - (3600 * 48)).toString(),
    dateTo: new Date().getTime().toString().substring(0, 10) + (3600 * 48), // 3600s = 1h
    storeId: '1'
  },
  {
    // Catalog valid now
    id: '2',
    dateFrom: (parseInt(new Date().getTime().toString().substring(0, 10)) - (3600 * 48)).toString(), // 3600s = 1h
    dateTo: new Date().getTime().toString().substring(0, 10) + (3600 * 5), // 3600s = 1h
    storeId: '2'
  },
  {
    // Catalog expired
    id: '3',
    dateFrom: (parseInt(new Date().getTime().toString().substring(0, 10)) - (3600 * 48)).toString(), // 3600s = 1h
    dateTo: (parseInt(new Date().getTime().toString().substring(0, 10)) - (3600 * 2)).toString(), // 3600s = 1h
    storeId: '3'
  },
  {
    // Catalog valid now
    id: '4',
    dateFrom: (parseInt(new Date().getTime().toString().substring(0, 10)) - (3600 * 2)).toString(),
    dateTo: (parseInt(new Date().getTime().toString().substring(0, 10)) + (3600 * 48)).toString(), // 3600s = 1h
    storeId: '1'
  }
]
