import { RouterProvider } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import { router } from './router.tsx'
import GlobalStyle from './styles/globalStyle.ts'

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <PWABadge />
    </>
  )
}

export default App
