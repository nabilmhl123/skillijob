import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Désactiver les sourcemaps en production pour réduire la taille
    minify: 'esbuild', // Minification rapide avec esbuild
    target: 'es2015', // Support des navigateurs modernes
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les dépendances volumineuses pour un meilleur caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'convex-vendor': ['convex']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Augmenter la limite pour éviter les warnings
  }
})
