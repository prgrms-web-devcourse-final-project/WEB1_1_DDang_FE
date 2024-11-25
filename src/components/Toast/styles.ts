import { styled } from 'styled-components'

export const ToastWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: -50px;

  width: 100%;
  display: flex;
  justify-content: center;

  visibility: ${({ isVisible }) => (isVisible ? 'visiblie' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`

export const Toast = styled.div`
  padding: 9.5px 16px;
  border-radius: 8px;
  width: fit-content;
  height: 40px;
  background-color: #fdf1f1;
  font-size: 16px;
  color: red;
  font-weight: bold;
`
