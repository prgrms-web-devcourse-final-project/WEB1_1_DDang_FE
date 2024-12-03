import { Suspense, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import PWABadge from '~/PWABadge'
import { router } from '~/router'
import GlobalStyle from '~/styles/globalStyle'
import { darkTheme, lightTheme } from '~/styles/theme'
import { fetchWalkSchedules } from '~apis/walkSchedule/fetchWalkSchedules'
import Loader from '~components/Loader'

function App() {
  //* 다크모드 확장성 고려
  const [theme, setTheme] = useState(lightTheme)
  const toggleTheme = () => setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme))
  useEffect(() => {
    fetchWalkSchedules({}).then(data => {
      console.log(data)
    })
    // fetch('https://ddang.shop/api/v1/walk-schedules', {
    //   method: 'GET', // 요청 메소드를 명시적으로 설정할 수 있습니다.
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Authorization:
    //   },
    //   // credentials: 'include', // 자격 증명을 모든 요청에 포함
    // })
    //   .then(response => response.json()) // 응답을 JSON으로 변환
    //   .then(data => {
    //     console.log(data) // 데이터를 콘솔에 출력
    //   })
    //   .catch(error => {
    //     console.error('Error:', error) // 오류를 콘솔에 출력
    //   })
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
