// @ts-check
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  // Configuración para asegurar que las rutas funcionen correctamente en producción
  base: '/',
  plugins: [react({
    // Habilita el modo estricto de React
    jsxRuntime: 'automatic',
    jsxImportSource: 'react',
    babel: {
      plugins: [],
    },
  })],
  resolve: {
    alias: {
      // Configura alias para rutas absolutas
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom']
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true
  }
});
