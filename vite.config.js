import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  server: {
    host: true,   // needed for the DC port mapping to work
    strictPort: true,
    port: 8080,
    watch: {

      usePolling: true,

    },

  },
})

