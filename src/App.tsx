import PWABadge from '@/PWABadge'
import { router } from '@/router'
import GlobalStyle from '@/styles/globalStyle'
import { lightTheme, darkTheme } from '@/styles/theme'
import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

function App() {
  //* 다크모드 확장성 고려
  const [theme, setTheme] = useState(lightTheme)
  const toggleTheme = () => setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme))

  return (
    <>
      <ThemeProvider theme={theme}>
        <button onClick={toggleTheme} hidden>
          Toggle Theme
        </button>
        <GlobalStyle />
        <RouterProvider router={router} />
        <PWABadge />
      </ThemeProvider>
    </>
  )
}

export default App
