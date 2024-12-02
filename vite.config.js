// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    sourcemap: false, // Ensure source maps are generated
  },

  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Optional: Allows using @ as an alias for src/
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
