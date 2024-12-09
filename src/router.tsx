import { Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { WebSocketProvider } from '~/WebSocketContext'
import Footer from '~components/Footer'
import GlobalHookContainer from '~components/GlobalHookContainer'
import PageLoader from '~components/PageLoader'
import ModalContainer from '~modals/ModalContainer'
import * as Pages from './components/LazyComponents'

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
      <Suspense fallback={<PageLoader />}>
        <Pages.LoginPage />
        <ModalContainer />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Pages.RegisterPage />
        <ModalContainer />
      </Suspense>
    ),
  },
  {
    path: '/register/dog',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Pages.RegisterDogPage />
        <ModalContainer />
      </Suspense>
    ),
  },
])
