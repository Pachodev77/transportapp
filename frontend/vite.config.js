import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Usar ruta raíz para el enrutamiento del cliente
  plugins: [
    react(),
  ],
  server: {
    historyApiFallback: true, // Importante para el enrutamiento del lado del cliente
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'public': resolve(__dirname, 'public')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsInlineLimit: 0, // Asegura que las imágenes se copien como archivos
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'leaflet': ['leaflet', 'react-leaflet'],
          'react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/firestore', 'firebase/auth', 'leaflet', 'react-leaflet'],
    exclude: ['js-big-decimal']
  },
  define: {
    'process.env': {}
  }
});
