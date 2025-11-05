import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router'
import { AuthContextProvider } from './context/authContext/AuthContextProvider'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <Toaster richColors/>
    </AuthContextProvider>
  </StrictMode>,
)
