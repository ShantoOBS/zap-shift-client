import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './routes/routes.jsx'
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import InitialLoader from './page/Shared/InitialLoader.jsx';
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function AppBoot({ children }) {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {showLoader && <InitialLoader />}
      <div style={{ visibility: showLoader ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppBoot>
            <RouterProvider router={router} />
          </AppBoot>
    </AuthProvider>
    </QueryClientProvider>
     
  </StrictMode>
)
