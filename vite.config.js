import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Base path sesuai nama repository kamu
  base: '/porto/',
  
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // Tambahan config buat handle library AI
  build: {
    commonjsOptions: {
      include: [/@google\/generative-ai/, /node_modules/],
    },
  },

  optimizeDeps: {
    include: ['@google/generative-ai'],
  },
})
