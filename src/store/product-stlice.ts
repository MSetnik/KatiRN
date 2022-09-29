import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllProducts } from '../endpoints/firestore'
import { IProduct } from '../interfaces/endpoints'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: <IProduct[]>[],
    loading: <boolean>false
  },
  reducers: {
    setProducts (state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.loading = false
    })
    builder.addCase(fetchAllProducts.rejected, state => {
      state.loading = false
    })
  }
})

export const fetchAllProducts: any = createAsyncThunk('products/fetchAllProducts', async () => {
  const response = await getAllProducts()
  return (response as IProduct[])
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer
