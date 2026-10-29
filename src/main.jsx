import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts (no Google Fonts request, faster first paint)
import '@fontsource/anton/400.css'
import '@fontsource/caveat/500.css'
import '@fontsource/caveat/700.css'
import '@fontsource-variable/dm-sans/index.css'
import '@fontsource-variable/dm-sans/wght-italic.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/900.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/700-italic.css'
import '@fontsource/playfair-display/900-italic.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
