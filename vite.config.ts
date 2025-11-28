import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ⚠️ IMPORTANT: Change 'portfolio' to your GitHub repository name
  // If your repo is named e.g. 'my-portfolio', change to: base: '/my-portfolio/'
  // If using custom domain or username.github.io, set: base: '/'
  base: '/portfolio/',
})
