import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use Vercel-friendly base path. The previous value `/StockSync/` was the
// GitHub Pages URL prefix and caused assets to 404 on Vercel (blank page).
// On Vercel we want assets served from the root of the deployed domain.
export default defineConfig({
  base: '/',
  root: '.',
  plugins: [react()],
  server: {
    port: 4173,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
