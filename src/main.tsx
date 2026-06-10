import { StrictMode, Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App.tsx'
import { initDb } from './db/index.ts'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: 'red' }}>
          <h2>Render Error</h2>
          <pre>{String(this.state.error)}</pre>
          <pre>{(this.state.error as Error).stack}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

const root = document.getElementById('root')!
root.innerHTML = '<p style="padding:1rem;font-family:sans-serif">Loading...</p>'

initDb()
  .then(() => {
    createRoot(root).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    )
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err)
    root.innerHTML =
      `<div style="padding:2rem;font-family:sans-serif;color:red">
        <h2>DB Init Failed</h2><pre>${err}</pre><pre>${err?.stack ?? ''}</pre>
      </div>`
  })
