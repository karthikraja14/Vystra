import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // relative base so the build works on GitHub Pages project subpaths and custom domains
  base: './',
  plugins: [react()],
})
