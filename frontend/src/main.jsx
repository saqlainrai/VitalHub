import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Page from './Page.jsx'
import './index.css'
import NavbarMain from './components/NavbarMain.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavbarMain/>
    <Page />
  </StrictMode>,
)

