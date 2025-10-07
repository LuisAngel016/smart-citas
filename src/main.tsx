import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SmartCitasApp } from './SmartCitasApp'
import { ThemeProvider } from './contexts/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SmartCitasApp />
    </ThemeProvider>
  </StrictMode>,
)
