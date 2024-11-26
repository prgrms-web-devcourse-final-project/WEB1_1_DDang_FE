import PWABadge from '~/PWABadge'
import { router } from '~/router'
import GlobalStyle from '~/styles/globalStyle'
import { lightTheme, darkTheme } from '~/styles/theme'
import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import ModalContainer from '~modals/ModalContainer'
import useInitializeFirebase from '~hooks/useInitializeFirebase'

function App() {
  //* 다크모드 확장성 고려
  const [theme, setTheme] = useState(lightTheme)
  const toggleTheme = () => setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme))

  useInitializeFirebase()

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
          <MobileWrapper>
            <RouterProvider router={router} />
          </MobileWrapper>
          <PWABadge />
          <ModalContainer />
        </ThemeProvider>
      </HelmetProvider>
    </>
  )
}

export default App

const MobileWrapper = styled.div`
  font-family: 'SUIT', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${({ theme }) => theme.colors.grayscale.font_1}; /* 기본 텍스트 색상 (Font_1) */
  background-color: ${({ theme }) => theme.colors.brand.lighten_3}; /* 배경색 (GC_4) */
  min-width: 340px;
  max-width: 430px;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: auto;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
