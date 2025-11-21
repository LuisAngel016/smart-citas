import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppointlerApp } from './AppointlerApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppointlerApp />
  </StrictMode>,
)
