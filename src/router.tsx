import Footer from '@components/Footer'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { HomePage } from './pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/hello',
        element: <div>hello</div>,
      },
    ],
  },
])
