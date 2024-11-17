import Footer from '@components/Footer'
import { HomePage, LoginPage, LogPage, MyPage, WalkPage } from '@/pages'
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
        path: '/log',
        element: <LogPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/walk',
        element: <WalkPage />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
    ],
  },
])
