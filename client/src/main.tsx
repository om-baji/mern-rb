import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Errorpage from './Pages/Errorpage.tsx'
import Loginpage from './Pages/Loginpage.tsx'
import { Toaster } from 'react-hot-toast'
import Home from './Pages/Home.tsx'
import Signuppage from './Pages/SignupPage.tsx'
import { AuthProvider } from './components/AuthProvider.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />
  },
  {
    path: "/login",
    element: <Loginpage />
  },
  {
    path: "/home",
    element: (
      <AuthProvider>
        <Home />
      </AuthProvider>

    ),
  },
  {
    path: "/signup",
    element: <Signuppage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
