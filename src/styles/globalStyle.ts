import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    /* 폰트  */
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  button, input, textarea, select {
    font-family: inherit;
    outline: none;
  }

`

export default GlobalStyle
