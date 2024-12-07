import Footer from '~components/Footer'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import * as Pages from './components/LazyComponents'
import ModalContainer from '~modals/ModalContainer'
import { WebSocketProvider } from '~/WebSocketContext'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WebSocketProvider>
        <Outlet />
        <Footer />
        <ModalContainer />
      </WebSocketProvider>
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
        path: '/walk-complete',
        element: <Pages.WalkCompletePage />,
      },
      {
        path: '/mypage',
        element: <Pages.MyPage />,
      },
      {
        path: '/familyddang',
        element: <Pages.FamilyDDangPage />,
      },
      {
        path: '/profile/:id',
        element: <Pages.ProfilePage />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <>
        <Pages.LoginPage />
        <ModalContainer />
      </>
    ),
  },
  {
    path: '/register',
    element: (
      <>
        <Pages.RegisterPage />
        <ModalContainer />
      </>
    ),
  },
  {
    path: '/register/dog',
    element: (
      <>
        <Pages.RegisterDogPage />
        <ModalContainer />
      </>
    ),
  },
])
