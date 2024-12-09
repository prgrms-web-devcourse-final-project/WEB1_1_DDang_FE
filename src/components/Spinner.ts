// styles.js
import styled from 'styled-components'

export const Spinner = styled.div<{
  $size?: number
  $stroke?: number
}>`
  border: ${({ $stroke }) => $stroke || 4}px solid ${({ theme }) => theme.colors.brand.default};
  border-top: ${({ $stroke }) => $stroke || 4}px solid transparent;
  border-radius: 50%;
  width: ${props => props.$size || 30}px;
  height: ${props => props.$size || 30}px;
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const PageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`
