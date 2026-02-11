import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Base path sesuai nama repo kamu
  base: '/porto/', 
  
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // --- BAGIAN WAJIB UNTUK AI ---
  build: {
    commonjsOptions: {
      // Maksa Vite buat ngebaca library Google AI yang pake format lama (CommonJS)
      include: [/@google\/generative-ai/, /node_modules/],
      transformMixedEsModules: true, 
    },
  },

  optimizeDeps: {
    // Biar pas develop (npm run dev) AI-nya juga gak error
    include: ['@google/generative-ai'],
  },
  // -----------------------------
})
