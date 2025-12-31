import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,          // optional: change if you want a custom port
    open: true,          // optional: auto open browser
  },
})
