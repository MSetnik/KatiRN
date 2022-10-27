import { ICatalog, ICategory, IProduct, IShoppingListItem, IStores } from '../interfaces/endpoints'

export const checkIfCategoryHasItemsHelper = (categories: ICategory[], products: IProduct[]) => {
  const categoriesWithProductsHelper: ICategory[] = []
  const dateNow = new Date().getTime().toString().substr(0, 10)

  categories.map((c: ICategory) => {
    let hasCategoryItems: boolean = false
    products.map((p: IProduct) => {
      if (p.categoryId === c.id && !hasCategoryItems && dateNow >= p.startAt && dateNow <= p.endAt) {
        categoriesWithProductsHelper.push(c)
        hasCategoryItems = true
      }
    })
  })

  categoriesWithProductsHelper.sort((a, b) => a.id.length - b.id.length)

  return categoriesWithProductsHelper
}

export const getProductsFromStoreCatalog = (catalog: ICatalog, products: IProduct[]) : IProduct[] => {
  const lProductsFromCatalog: IProduct[] = []

  products.forEach((p: IProduct) => {
    if (catalog.dateFrom <= p.startAt && catalog.dateTo >= p.endAt && p.catalogId === catalog.id) {
      lProductsFromCatalog.push(p)
    }
  })

  return lProductsFromCatalog
}

const getStoreCatalogsWithProducts = (lProducts: IProduct[], lCatalogs: ICatalog[]) : ICatalog[] => {
  const lCatalogsWithProducts: ICatalog[] = []
  const dateNow = Date.now().toString().substring(0, 10)

  lProducts.forEach((p: IProduct) => {
    lCatalogs.forEach((c: ICatalog) => {
      if (p.storeId === c.storeId &&
        c.dateFrom <= p.startAt &&
        c.dateTo >= p.endAt &&
        dateNow >= p.startAt &&
        dateNow <= p.endAt) {
        lCatalogsWithProducts.push(c)
      }
    })
  })

  return lCatalogsWithProducts
}

export const getStoresFromCatalogsWithProducts = (lProducts: IProduct[], lCatalogs: ICatalog[], lStores: IStores[]) => {
  const currentCatalogs = getStoreCatalogsWithProducts(lProducts, lCatalogs)

  const storesWithProductsFromCurrentCatalog : IStores[] = []

  const dateNow = Date.now().toString().substring(0, 10)

  lStores.forEach((store: IStores) => {
    let storeFound: boolean = false
    currentCatalogs.forEach((c: ICatalog) => {
      if (store.id === c.storeId && !storeFound && dateNow >= c.dateFrom && dateNow <= c.dateTo) {
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
    let categoryHelper: boolean = false
    products.map((p: IProduct) => {
      if (p.categoryId === c.id && dateNow >= p.startAt && dateNow <= p.endAt && !categoryHelper) {
        categoriesWithProductsHelper.push(c)
        categoryHelper = true
      }
    })
  })

  categoriesWithProductsHelper.sort((a, b) => a.id.length - b.id.length)

  return categoriesWithProductsHelper
}

export const shoppingListToRender = (shoppingList: IShoppingListItem[], stores: IStores[]) => {
  const shoppingListHelper: any[] = []

  stores.forEach((store: IStores) => {
    const shoppingListItems: IShoppingListItem[] = []

    shoppingList.forEach((sl: IShoppingListItem) => {
      if (store.id === sl.storeId) {
        shoppingListItems.push(sl)
      }
    })

    if (shoppingListItems.length !== 0) {
      const storeShoppingItem = {
        storeId: store.id,
        storeImg: store.imgUrl,
        storeName: store.name,
        items: shoppingListItems
      }

      shoppingListHelper.push(storeShoppingItem)
    }
  })

  return shoppingListHelper
}

export const calculatePercentage = (discountedPrice: number, fullPrice: number) : string => {
  const percent = (100 - (fullPrice * 100) / discountedPrice)

  return percent.toFixed(0)
}

export const getCurrentCatalogs = (lProducts: IProduct[], lCatalogs: ICatalog[], lStores: IStores[]) => {
  const dateNow = Date.now().toString().substring(0, 10)

  const currentCatalogs = lCatalogs.filter((c:ICatalog) => c.dateFrom < dateNow && dateNow < c.dateTo)

  const catalogs : any[] = []

  lStores.forEach((store: IStores) => {
    let storeFound: boolean = false
    currentCatalogs.forEach((c: ICatalog) => {
      if (store.id === c.storeId) {
        const catalogData: any = {
          catalogId: c.id,
          storeId: store.id,
          storeName: store.name,
          storeImg: store.imgUrl,
          catalogFrom: c.dateFrom,
          catalogTo: c.dateTo
        }

        catalogs.push(catalogData)
        storeFound = true
      }
    })
  })

  return catalogs
}
