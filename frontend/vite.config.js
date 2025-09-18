// @ts-check
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    // Configuración base para producción y desarrollo
    base: isProduction ? '/' : '/',
    
    plugins: [
      react({
        // Habilita el modo estricto de React
        jsxRuntime: 'automatic',
        jsxImportSource: 'react',
        babel: {
          plugins: [],
        },
      })
    ],
    
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
      },
      // Configuración para manejar correctamente las rutas en desarrollo
      historyApiFallback: true
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: isProduction ? false : 'inline',
      minify: isProduction ? 'esbuild' : false,
      
      rollupOptions: {
        output: {
          // Dividir el código en chunks más pequeños
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              if (id.includes('leaflet')) {
                return 'vendor-leaflet';
              }
              return 'vendor';
            }
          },
          // Nombres de archivo con hash para el cache busting
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]'
        },
        // Mejorar el rendimiento de la compilación
        external: [],
        // Asegurar que los módulos se carguen correctamente
        preserveEntrySignatures: 'strict'
      }
    },
    
    preview: {
      port: 3000,
      strictPort: true,
      host: true
    }
  };
});
