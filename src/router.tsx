import { createBrowserRouter, Outlet } from 'react-router-dom'
import { WebSocketProvider } from '~/WebSocketContext'
import Footer from '~components/Footer'
import ModalContainer from '~modals/ModalContainer'
import * as Pages from './components/LazyComponents'
import GlobalHookContainer from '~components/GlobalHookContainer'
import { Suspense } from 'react'
import PageLoader from '~components/PageLoader'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WebSocketProvider>
        <GlobalHookContainer>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
          <Footer />
          <ModalContainer />
        </GlobalHookContainer>
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
      {
        path: '*',
        element: <Pages.NotFoundPage />,
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
