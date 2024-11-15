import { RouterProvider } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import { router } from './router.tsx'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <PWABadge />
    </>
  )
}

export default App
