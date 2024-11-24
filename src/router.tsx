import { Suspense } from 'react'
import Footer from '~components/Footer'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import * as Pages from './components/LazyComponents'
import Loader from '~components/Loader'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Pages.HomePage />,
      },
      {
        path: '/log',
        element: <Pages.LogPage />,
      },
      {
        path: '/walk',
        element: <Pages.WalkPage />,
      },
      {
        path: '/mypage',
        element: <Pages.MyPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Pages.LoginPage />,
  },
  {
    path: '/register',
    element: <Pages.RegisterPage />,
  },
])
