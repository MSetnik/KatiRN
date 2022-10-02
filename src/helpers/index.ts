import { ICatalog, ICategory, IProduct, IStores } from '../interfaces/endpoints'

export const checkIfCategoryHasItemsHelper = (categories: ICategory[], products: IProduct[]) => {
  const categoriesWithProductsHelper: ICategory[] = []
  const dateNow = new Date().getTime().toString().substr(0, 10)

  categories.map((c: ICategory) => {
    let hasCategoryItems: boolean = false
    products.map((p: IProduct) => {
      if (p.categoryId === c.id && !hasCategoryItems && p.categoryId !== '1' && dateNow >= p.startAt && dateNow <= p.endAt) {
        categoriesWithProductsHelper.push(c)
        hasCategoryItems = true
      }
    })
  })

  return categoriesWithProductsHelper
}

export const getProductsFromStoreCatalog = (catalog: ICatalog, products: IProduct[]) : IProduct[] => {
  const lProductsFromCatalog: IProduct[] = []

  products.forEach((p: IProduct) => {
    if (catalog.dateFrom <= p.startAt && catalog.dateTo >= p.endAt && p.storeId === catalog.storeId) {
      lProductsFromCatalog.push(p)
    }
  })
  return lProductsFromCatalog
}

const getStoreCatalogsWithProducts = (lProducts: IProduct[], lCatalogs: ICatalog[]) : ICatalog[] => {
  const lCatalogsWithProducts: ICatalog[] = []
  console.log(lProducts[3])

  lProducts.forEach((p: IProduct) => {
    lCatalogs.forEach((c: ICatalog) => {
      if (p.storeId === c.storeId && c.dateFrom <= p.startAt && c.dateTo >= p.endAt) {
        lCatalogsWithProducts.push(c)
      }
    })
  })

  return lCatalogsWithProducts
}

export const getStoresFromCatalogsWithProducts = (lProducts: IProduct[], lCatalogs: ICatalog[], lStores: IStores[]) => {
  const currentCatalogs = getStoreCatalogsWithProducts(lProducts, lCatalogs)

  const storesWithProductsFromCurrentCatalog : IStores[] = []

  lStores.forEach((store: IStores) => {
    let storeFound: boolean = false
    currentCatalogs.forEach((c: ICatalog) => {
      if (store.id === c.storeId && !storeFound) {
        storesWithProductsFromCurrentCatalog.push(store)
        storeFound = true
      }
    })
  })

  return storesWithProductsFromCurrentCatalog
}

export const checkIfCatalogCategoryHasItemsHelper = (categories: ICategory[], products: IProduct[]) => {
  const categoriesWithProductsHelper: ICategory[] = []
  const dateNow = new Date().getTime().toString().substr(0, 10)

  categories.map((c: ICategory) => {
    products.map((p: IProduct) => {
      if (p.categoryId === c.id && dateNow >= p.startAt && dateNow <= p.endAt) {
        categoriesWithProductsHelper.push(c)
      }
    })
  })

  return categoriesWithProductsHelper
}
