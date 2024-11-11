import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoadingProvider } from './context/LoadingContext.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<LoadingProvider>
<AuthProvider >
<App />
</AuthProvider>
  
</LoadingProvider>
  </StrictMode>,
)
