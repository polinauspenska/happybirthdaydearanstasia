import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the same build works on GitHub Pages (/happybirthdaydearanstasia/)
  // and on a root domain like Cloudflare Pages.
  base: './',
  plugins: [react(), tailwindcss()],
})
