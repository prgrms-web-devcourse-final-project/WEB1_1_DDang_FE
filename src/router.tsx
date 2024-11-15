import Footer from '@components/Footer'
import { HomePage } from '@/pages'
import { createBrowserRouter, Outlet } from 'react-router-dom'

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
