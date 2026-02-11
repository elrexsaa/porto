import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Base path sesuai nama repo GitHub lo
  base: '/porto/', 
  
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    outDir: 'dist',
    // Hapus 'minify: terser' biar gak error 'terser not found' lagi
    // Secara default Vite udah pake esbuild yang lebih GG dan gacor
  }
})
