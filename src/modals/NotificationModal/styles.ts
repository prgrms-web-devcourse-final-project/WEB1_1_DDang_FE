import { styled } from 'styled-components'
import { HEADER_HEIGHT } from '~constants/layout'

export const NotificationModal = styled.div`
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  overflow: auto;
  padding-top: ${HEADER_HEIGHT}px;
`
export const Header = styled.header`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  z-index: 3;
  width: 100%;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
`
