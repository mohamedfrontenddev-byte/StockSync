import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, initializeDatabase } from '../db/stockSyncDB';

export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
  await initializeDatabase();
  const items = await db.products.toArray();
  const stockItems = await db.stockItems.toArray();
  return { items, stockItems };
});

const initialState = {
  items: [],
  stockItems: [],
  status: 'idle',
  error: null,
  searchTerm: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.stockItems = action.payload.stockItems;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;
