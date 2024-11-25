import { styled, keyframes } from 'styled-components'

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
`

export const DatePickerModal = styled.div<{ isExiting: boolean }>`
  background-color: white;
  width: 100%;

  animation: ${({ isExiting }) => (isExiting ? slideDown : slideUp)} 0.3s ease-out;

  > div {
    padding: 1rem;
  }

  > div div div div {
    font-family: 'SUIT', sans-serif;
    background-color: ${({ theme }) => theme.colors.grayscale.gc_3};
    cursor: grab;
  }
`
export const Divider = styled.div`
  height: 40px;
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayscale.gc_2};
`

export const ConfirmBtn = styled.button`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.brand.darken};
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  float: right;
`
