import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getStoreData } from '../endpoints/firestore'
import { IStores } from '../interfaces/endpoints'

const storeSlice = createSlice({
  name: 'stores',
  initialState: {
    stores: <IStores[]>[],
    loading: false
  },
  reducers: {
    setStores (state, action: PayloadAction<IStores[]>) {
      state.stores = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchStores.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchStores.fulfilled, (state, action) => {
      state.stores = action.payload
      state.loading = false
    })
    builder.addCase(fetchStores.rejected, state => {
      state.loading = false
    })
  }
})

export const fetchStores:any = createAsyncThunk('stores/fetchStores', async () => {
  const response = await getStoreData()
  return (response as IStores[])
})

export const { setStores } = storeSlice.actions
export default storeSlice.reducer
