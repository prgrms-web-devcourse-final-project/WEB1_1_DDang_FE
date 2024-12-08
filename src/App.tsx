import { Suspense, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import PWABadge from '~/PWABadge'
import { router } from '~/router'
import GlobalStyle from '~/styles/globalStyle'
import { darkTheme, lightTheme } from '~/styles/theme'
import PageLoader from '~components/PageLoader'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
function App() {
  //* 다크모드 확장성 고려
  const [theme, setTheme] = useState(lightTheme)
  const toggleTheme = () => setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme))
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
            <MobileContainer>
              <Suspense fallback={<PageLoader />}>
                <RouterProvider router={router} />
              </Suspense>
            </MobileContainer>
            <PWABadge />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  )
}

export default App

const MobileContainer = styled.div`
  font-family: 'SUIT', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  min-width: 340px;
  max-width: 430px;

  min-height: 667px;
  height: 100dvh;
  max-height: 932px;
  margin: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  translate: -50% -50%;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
