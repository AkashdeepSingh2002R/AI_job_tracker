import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom'
import App from './App'
import { AppProvider, useApp } from './context/AppContext'

// Pages
import { Dashboard } from './pages/Dashboard'
import { AddJob } from './pages/AddJob'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { EditJob } from './pages/EditJob'

function Protected(){
  const { state } = useApp()
  if(!state.isLoggedIn) return <Navigate to="/login" replace/>
  return <Outlet/>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace/> },
      { path: 'login', element: <Login/> },
      { path: 'register', element: <Register/> },
      {
        element: <Protected/>,
        children: [
          { path: 'dashboard', element: <Dashboard/> },
          { path: 'add', element: <AddJob/> },
          { path: 'profile', element: <Profile/> },
          { path: 'edit/:id', element: <EditJob/> },
        ]
      },
      { path: '*', element: <Navigate to="/dashboard" replace/> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </StrictMode>
)
