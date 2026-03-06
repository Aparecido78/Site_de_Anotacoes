import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AutProvider } from './Conponents/AutContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AutProvider>
          <App />

    </AutProvider>

  </StrictMode>,
)
