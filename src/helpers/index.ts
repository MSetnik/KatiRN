import { ICatalog, ICategory, IProduct } from '../interfaces/endpoints'

export const checkIfCategoryHasItemsHelper = (categories: ICategory[], products: IProduct[]) => {
  const categoriesWithProductsHelper: ICategory[] = []
  categories.map((c: ICategory) => {
    let hasCategoryItems: boolean = false
    products.map((p: IProduct) => {
      if (p.categoryId === c.id && !hasCategoryItems && p.categoryId !== '1') {
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
