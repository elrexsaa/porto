import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Base path sesuai nama repository GitHub kamu
  base: '/porto/', 
  
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // Build config dibuat simpel karena kita tidak pakai library Google AI lagi
  build: {
    outDir: 'dist',
    minify: 'terser', // Opsional: biar file hasil build lebih kecil & kencang
  }
})
