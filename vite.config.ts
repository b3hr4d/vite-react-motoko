/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import { icReactorPlugin } from '@ic-reactor/vite-plugin';

dotenv.config();

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    icReactorPlugin({
      canisters: [
        {
          name: 'backend',
          didFile: './backend/backend.did',
          clientManagerPath: '../../lib/client',
        },
      ],
    }),
  ],
  cacheDir: '../node_modules/.vite',
  test: {
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
  },
});
