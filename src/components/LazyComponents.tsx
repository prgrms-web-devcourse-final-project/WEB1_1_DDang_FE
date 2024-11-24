import { lazy } from 'react'

export const HomePage = lazy(() => import('~pages/HomePage'))
export const LoginPage = lazy(() => import('~pages/LoginPage'))
export const LogPage = lazy(() => import('~pages/LogPage'))
export const MyPage = lazy(() => import('~pages/MyPage'))
export const WalkPage = lazy(() => import('~pages/WalkPage'))
export const RegisterPage = lazy(() => import('~pages/RegisterPage/Owner'))
export const RegisterDogPage = lazy(() => import('~pages/RegisterPage/Dog'))
