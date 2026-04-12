import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, initializeDatabase } from '../db/stockSyncDB';

export const loadSettings = createAsyncThunk('settings/loadSettings', async () => {
  await initializeDatabase();
  const settings = await db.settings.toArray();
  const settingsMap = {};
  settings.forEach(setting => {
    settingsMap[setting.category] = setting;
  });
  return settingsMap;
});

export const updateSetting = createAsyncThunk('settings/updateSetting', async ({ category, data }) => {
  await initializeDatabase();
  const existing = await db.settings.where('category').equals(category).first();
  if (existing) {
    await db.settings.update(existing.id, { ...data, updatedAt: new Date().toISOString() });
  } else {
    await db.settings.add({
      id: crypto.randomUUID(),
      category,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return { category, data };
});

const defaultSettings = {
  identity: {
    storeName: 'StockSync Store',
    logo: null,
    currency: 'SAR',
    language: 'ar',
    theme: 'light',
  },
  accounting: {
    vatRate: 15,
    enableDiscounts: true,
  },
  alerts: {
    lowStockThreshold: 10,
  },
  printing: {
    receiptFooter: 'شكراً لزيارتكم',
    printerType: 'thermal',
    printerSize: '80mm',
  },
  sync: {
    autoSync: true,
  },
};

const initialState = {
  data: defaultSettings,
  status: 'idle',
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.data.identity.theme = action.payload;
      localStorage.setItem('stocksync-theme', action.payload);
      document.documentElement.classList.toggle('dark', action.payload === 'dark');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = { ...defaultSettings, ...action.payload };
        // Apply theme
        const theme = state.data.identity.theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('stocksync-theme', theme);
      })
      .addCase(loadSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.data[category] = { ...state.data[category], ...data };
      });
  },
});

export const { setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
