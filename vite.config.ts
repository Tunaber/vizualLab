import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/books': {
        target: 'https://fakeapi.extendsclass.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});