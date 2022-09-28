import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './store-slice'
import categoryReducer from './category-slice'

export const globalStore = configureStore({
  reducer: {
    stores: storeReducer,
    categories: categoryReducer
  }
})
