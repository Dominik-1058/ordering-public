import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ordering-public/',
  server: {
    proxy: {
      '/api': {
        target: 'https://ordering-kjcz.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
