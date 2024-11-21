import PWABadge from '~/PWABadge'
import { router } from '~/router'
import GlobalStyle from '~/styles/globalStyle'
import { lightTheme, darkTheme } from '~/styles/theme'
import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Helmet, HelmetProvider } from 'react-helmet-async'

function App() {
  //* 다크모드 확장성 고려
  const [theme, setTheme] = useState(lightTheme)
  const toggleTheme = () => setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme))

  return (
    <>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Helmet>
            <title>DDang</title>
            <meta name='description' content='반려견과 함께하는 즐거운 산책, DDang.' />
          </Helmet>
          <button onClick={toggleTheme} hidden>
            Toggle Theme
          </button>
          <GlobalStyle />
          <RouterProvider router={router} />
          <PWABadge />
        </ThemeProvider>
      </HelmetProvider>
    </>
  )
}

export default App
