import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App.tsx'
import { initDb } from './db/index.ts'

initDb()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err)
    document.getElementById('root')!.innerHTML =
      `<div style="padding:2rem;font-family:sans-serif;color:red">
        <h2>Failed to load app</h2><pre>${err}</pre>
      </div>`
  })
