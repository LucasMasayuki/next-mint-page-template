import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@@': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './'),
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
