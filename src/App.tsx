import PWABadge from '@/PWABadge'
import { router } from '@/router'
import GlobalStyle from '@/styles/globalStyle'
import { lightTheme, darkTheme } from '@/styles/theme'
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
            <meta
              httpEquiv='Content-Security-Policy'
              content={`
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval';
                style-src 'self' 'unsafe-inline';
                img-src 'self' data: https:;
                font-src 'self' data:;
                connect-src 'self' https:;
                frame-src 'self';
                base-uri 'self';
                form-action 'self';
              `}
            />
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
