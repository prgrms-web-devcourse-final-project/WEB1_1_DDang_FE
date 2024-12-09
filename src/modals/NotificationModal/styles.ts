import { styled } from 'styled-components'
import { HEADER_HEIGHT } from '~constants/layout'

export const NotificationModal = styled.div`
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  overflow: auto;
  padding-top: ${HEADER_HEIGHT}px;
`
