import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/scss/global.scss';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)