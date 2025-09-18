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
      historyApiFallback: true,
      // Configuración de encabezados para el servidor de desarrollo
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Content-Type': 'text/javascript; charset=utf-8'
      }
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: isProduction ? false : 'inline',
      minify: isProduction ? 'esbuild' : false,
      
      // Desactivar la división de código para simplificar la carga de módulos
      modulePreload: {
        polyfill: false,
      },
      
      rollupOptions: {
        output: {
          // Usar un único archivo para simplificar la carga
          manualChunks: undefined,
          // Nombres de archivo sin hash para facilitar la depuración
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name][extname]',
          // Usar formato IIFE para mejor compatibilidad
          format: 'iife',
          // Asegurar que los nombres de las variables globales sean únicos
          name: 'TransportApp',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            firebase: 'firebase',
            'leaflet': 'L'
          }
        },
        // Mejorar el rendimiento de la compilación
        external: ['react', 'react-dom', 'react-router-dom', 'firebase', 'leaflet'],
        // Asegurar que los módulos se carguen correctamente
        preserveEntrySignatures: 'strict'
      }
    },
    
    preview: {
      port: 3000,
      strictPort: true,
      host: true,
      // Configuración de encabezados para el servidor de vista previa
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Content-Type': 'text/javascript; charset=utf-8'
      }
    },
    
    // La configuración del servidor ya está definida más arriba
  };
});
