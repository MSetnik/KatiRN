import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCategories } from '../endpoints/firestore'
import { ICategory } from '../interfaces/endpoints'

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: <ICategory[]>[],
    loading: <boolean>false
  },
  reducers: {
    setCategories (state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.loading = false
    })
    builder.addCase(fetchCategories.rejected, state => {
      state.loading = false
    })
  }
})

export const fetchCategories: any = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await getCategories()
  return (response as ICategory[])
})

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer
