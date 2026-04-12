import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import productsReducer from './productSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productsReducer,
    settings: settingsReducer,
  },
});
