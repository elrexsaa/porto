import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/porto/', 
  
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    // Tambahan: Mengatur rollup secara eksplisit
    rollupOptions: {
      output: {
        manualChunks: {
          'google-ai': ['@google/generative-ai'],
        },
      },
    },
    commonjsOptions: {
      include: [/@google\/generative-ai/, /node_modules/],
      transformMixedEsModules: true, 
    },
  },

  optimizeDeps: {
    include: ['@google/generative-ai'],
  },
})
