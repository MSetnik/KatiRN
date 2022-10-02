import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './store-slice'
import categoryReducer from './category-slice'
import productReducer from './product-stlice'
import catalogReducer from './catalog-slice'
import shoppingListReducer from './shopping-list-slice'

export const globalStore = configureStore({
  reducer: {
    stores: storeReducer,
    categories: categoryReducer,
    products: productReducer,
    catalogs: catalogReducer,
    shoppingList: shoppingListReducer
  }
})
