/* eslint-disable no-undef */
import { checkIfCategoryHasItemsHelper, getProductsFromStoreCatalog } from '../../src/helpers'
import { ICatalog } from '../../src/interfaces/endpoints'
import { catalogs, categories, products } from '../mockData'

describe('testing helpers functions', () => {
  it(`checkIfCategoryHasItemsHelper(categories, products) expects categories and product list 
      and should return categories that contains products`,
  () => {
    expect(checkIfCategoryHasItemsHelper(categories, products)).toEqual(expect.arrayContaining([
      {
        name: 'category 3',
        id: '3'
      },
      {
        name: 'category 4',
        id: '4'
      }
    ]))
  })

  it(`getProductsFromStoreCatalog(catalogs, products) expects catalogs and products list 
      and should return only products that have same storeId as storeId from allCatalogs list and are in the
      current period (date) between catalog startDate and catalog endDate`,
  () => {
    expect(getProductsFromStoreCatalog(catalogs[3], products)).toEqual(expect.arrayContaining([
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
    ]))
  })
})
