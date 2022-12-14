import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { storeShoppingList } from '../async-storage'
import { IProduct, IShoppingListItem } from '../interfaces/endpoints'

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    shoppingList: <IShoppingListItem[]> [],
    loading: <boolean> false
  },
  reducers: {
    setShoppingList (state, action: PayloadAction<IShoppingListItem[]>) {
      state.shoppingList = action.payload
    },
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
          console.log(state.shoppingList)
        }
      })
    },
    setLoading  (state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    loadFromAsync (state, action: PayloadAction<IShoppingListItem[]>) {
      state.shoppingList = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(storeListToAsync.pending, state => {
      state.loading = true
    })
    builder.addCase(storeListToAsync.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(storeListToAsync.rejected, state => {
      state.loading = false
    })
  }
})

export const storeListToAsync: any = createAsyncThunk('shoppingList/storeToAsync', async (shoppingList : IShoppingListItem[]) => {
  const response = await storeShoppingList(shoppingList)
  return (response as unknown)
})

export const { addToList, removeFromList, setLoading, loadFromAsync, setShoppingList } = shoppingListSlice.actions
export default shoppingListSlice.reducer
