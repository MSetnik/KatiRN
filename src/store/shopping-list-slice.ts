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
      state.loading = true
      const helperObject = {
        ...action.payload,
        id: `${action.payload.id}${Math.random().toFixed(20)}`
      }
      state.shoppingList.push(helperObject)
    },
    removeFromList  (state, action: PayloadAction<string>) {
      state.shoppingList.forEach((item: IShoppingListItem, index: number) => {
        if (item.id === action.payload) {
          state.shoppingList.splice(index, 1)
        }
      })
    },
    setLoading  (state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const { addToList, removeFromList, setLoading } = shoppingListSlice.actions
export default shoppingListSlice.reducer
