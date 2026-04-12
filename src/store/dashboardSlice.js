import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, initializeDatabase } from '../db/stockSyncDB';

export const refreshDashboardStats = createAsyncThunk('dashboard/refreshStats', async () => {
  await initializeDatabase();
  const sales = await db.sales.toArray();
  const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.totalAmount || 0), 0);
  const lowStockCount = await db.stockItems.where('quantity').below(10).count();
  const activeBranches = await db.branches.count();
  const activeUsers = await db.users.count();
  return {
    totalSales: sales.length,
    todayRevenue: totalRevenue,
    lowStockCount,
    activeBranches,
    activeUsers,
  };
});

const initialState = {
  totalSales: 0,
  todayRevenue: 0,
  lowStockCount: 0,
  activeBranches: 0,
  activeUsers: 0,
  status: 'idle',
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalSales = action.payload.totalSales;
        state.todayRevenue = action.payload.todayRevenue;
        state.lowStockCount = action.payload.lowStockCount;
        state.activeBranches = action.payload.activeBranches;
        state.activeUsers = action.payload.activeUsers;
      })
      .addCase(refreshDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
