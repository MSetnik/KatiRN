import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllCatalog, getStoreCatalog } from '../endpoints/firestore'
import { ICatalog } from '../interfaces/endpoints'

const catalogSlice = createSlice({
  name: 'catalogs',
  initialState: {
    catalog: <ICatalog[]>[],
    storeCatalog: <ICatalog[]>[],
    loading: <boolean>false
  },
  reducers: {
    setCatalogs (state, action: PayloadAction<ICatalog[]>) {
      state.catalog = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCatalogs.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCatalogs.fulfilled, (state, action) => {
      state.catalog = action.payload
      state.loading = false
    })
    builder.addCase(fetchCatalogs.rejected, state => {
      state.loading = false
    })
    builder.addCase(fetchStoreCatalog.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchStoreCatalog.fulfilled, (state, action) => {
      state.storeCatalog = action.payload
      state.loading = false
    })
    builder.addCase(fetchStoreCatalog.rejected, state => {
      state.loading = false
    })
  }
})

export const fetchCatalogs: any = createAsyncThunk('catalogs/fetchCatalogs', async () => {
  const response = await getAllCatalog()
  return (response as ICatalog[])
})

export const fetchStoreCatalog: any = createAsyncThunk('catalogs/fetchStoreCatalog', async (storeId: string) => {
  const response = await getStoreCatalog(storeId)
  return (response as ICatalog[])
})

export const { setCatalogs } = catalogSlice.actions
export default catalogSlice.reducer
