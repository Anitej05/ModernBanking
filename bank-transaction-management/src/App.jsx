import React from 'react'
import Userform from './components/Userform'
import UserRegistration from './components/UserRegistration'
import Home from './components/Home'
import ProtectedRoute from './ProtectedRoute'
import Credit from './components/home-components/Credit'
import Debit from './components/home-components/Debit'
import Transaction from './components/home-components/Transaction'
import CreateAccount from './components/home-components/CreateAccount'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root_Layout from './Root_Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: '',
      element: <Root_Layout />,
      children: [
        {
          path: '',
          element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>),
        },
        {
          path: '/login',
          element: <Userform />
        },
        {
          path: '/register',
          element: <UserRegistration />
        },
        {
          path: '/create-account',
          element: (
            <ProtectedRoute>
              <CreateAccount />
            </ProtectedRoute>),
        },
        {
          path: '/credit-money',
          element: (
            <ProtectedRoute>
              <Credit />
            </ProtectedRoute>),
        },
        {
          path: '/debit-money',
          element: (
            <ProtectedRoute>
              <Debit />
            </ProtectedRoute>),
        },
        {
          path: '/send-money',
          element: (
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>),
        }
      ]
    }
  ])
  return (
    <RouterProvider router={browserRouterObj}/>
  )
}

export default App