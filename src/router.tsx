import Footer from '~components/Footer'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import * as Pages from './components/LazyComponents'

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
        element: <Pages.HomePage />,
      },
      {
        path: '/log',
        element: <Pages.LogPage />,
      },
      {
        path: '/social',
        element: <Pages.SocialPage />,
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
  {
    path: '/register/dog',
    element: <Pages.RegisterDogPage />,
  },
])
