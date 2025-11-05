import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Usar ruta relativa
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/firestore', 'firebase/auth', 'leaflet', 'react-leaflet']
  }
});
