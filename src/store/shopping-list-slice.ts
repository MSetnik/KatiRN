import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IShoppingListItem } from '../interfaces/endpoints'

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    shoppingList: <IShoppingListItem[]>[],
    loading: <boolean>false
  },
  reducers: {
    addToList (state, action: PayloadAction<IShoppingListItem>) {
      state.shoppingList.push(action.payload)
    },
    removeFromList  (state, action: PayloadAction<IShoppingListItem>) {
      // state.shoppingList.push(action.payload)
    }
  }
})

export const { addToList, removeFromList } = shoppingListSlice.actions
export default shoppingListSlice.reducer
