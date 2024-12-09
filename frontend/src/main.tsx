import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import SignupPage from './pages/SignupPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { Toaster } from 'react-hot-toast'
import AdminPage from './pages/AdminPage.tsx'
import UserPage from './pages/UserPage.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path : "/login",
    element : <LoginPage />
  },
  {
    path: "/",
    element: <App />
  },
  {
    path : "/admin",
    element : <AdminPage />
  },
  {
    path : "/home",
    element : <UserPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
    <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
