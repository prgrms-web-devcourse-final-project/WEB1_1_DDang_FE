import { Suspense, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import PWABadge from '~/PWABadge'
import { router } from '~/router'
import GlobalStyle from '~/styles/globalStyle'
import { darkTheme, lightTheme } from '~/styles/theme'
import Loader from '~components/Loader'
import { deleteDogProfile } from '~apis/dog/deleteDogProfile'
import { fetchDogProfile } from '~apis/dog/fetchDogProfile'

function App() {
  //* 다크모드 확장성 고려
  const [theme, setTheme] = useState(lightTheme)
  const toggleTheme = () => setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme))

  useEffect(() => {
    // deleteDogProfile(6).then(response => {
    //   console.log(response)
    // })
    fetchDogProfile(6).then(response => {
      console.log(response)
    })
  }, [])
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
          <MobileContainer>
            <Suspense fallback={<Loader />}>
              <RouterProvider router={router} />
            </Suspense>
          </MobileContainer>
          <PWABadge />
        </ThemeProvider>
      </HelmetProvider>
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
