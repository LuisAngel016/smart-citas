import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SmartCitasApp } from './SmartCitasApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmartCitasApp />
  </StrictMode>,
)
