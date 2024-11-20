import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  /* 모든 요소에 기본 박스 모델과 여백 제거 */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* SUIT 폰트 패밀리 설정 */
  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
  }

  /* 기본 body 스타일 */
  body {
    font-family: 'SUIT', sans-serif; /* SUIT 폰트 적용 */
    line-height: 1.5; 
    letter-spacing: -0.025em; 
    color: ${({ theme }) => theme.colors.grayscale.font_1}; /* 기본 텍스트 색상 (Font_1) */
    background-color: ${({ theme }) => theme.colors.grayscale.gc_4}; /* 배경색 (GC_4) */
  }

  /* 버튼 스타일 */
  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  /* 입력 요소 스타일 */
  button, input, textarea, select {
    font-family: inherit; /* 폰트 상속 */
    outline: none;
  }
`

export default GlobalStyle
