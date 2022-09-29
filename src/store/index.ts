import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './store-slice'
import categoryReducer from './category-slice'
import productReducer from './product-stlice'

export const globalStore = configureStore({
  reducer: {
    stores: storeReducer,
    categories: categoryReducer,
    products: productReducer
  }
})
