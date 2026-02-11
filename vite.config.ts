/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import { icpBindgen } from '@icp-sdk/bindgen/plugins/vite';

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
    // Generate bindings from .did files during dev and build
    icpBindgen({
      didFile: './backend/Backend.did',
      outDir: './src/declarations/backend',
    }),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
  cacheDir: '../node_modules/.vite',
  test: {
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
  },
});
