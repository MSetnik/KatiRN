/* eslint-disable no-undef */
import { checkIfCategoryHasItemsHelper } from '../../src/helpers'
import { ICategory, IProduct } from '../../src/interfaces/endpoints'

const categories: ICategory[] = [
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

const products: IProduct[] = [
  {
    name: 'name 1',
    description: 'desc',
    categoryId: '4',
    storeId: '1',
    startAt: Date.now().toString(),
    endAt: Date.now().toString(),
    fullPrice: 1,
    discountedPrice: 0.2,
    id: '1',
    imgUrl: 'daw'
  },
  {
    name: 'name 1',
    description: 'desc',
    categoryId: '2',
    storeId: '1',
    startAt: Date.now().toString(),
    endAt: Date.now().toString(),
    fullPrice: 1,
    discountedPrice: 0.2,
    id: '1',
    imgUrl: 'daw'
  },
  {
    name: 'name 1',
    description: 'desc',
    categoryId: '3',
    storeId: '1',
    startAt: Date.now().toString(),
    endAt: Date.now().toString(),
    fullPrice: 1,
    discountedPrice: 0.2,
    id: '1',
    imgUrl: 'daw'
  }
]

describe('testing helpers functions', () => {
  it('checkIfCategoryHasItemsHelper should return categories that contains products', () => {
    expect(checkIfCategoryHasItemsHelper(categories, products)).toEqual(expect.arrayContaining([
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
      }
    ]))
  })
})
