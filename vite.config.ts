import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Pokepedia/",
  plugins: [react()],
  server: {
    port: 3000 //use port 3000 instead of the default
  }
})
