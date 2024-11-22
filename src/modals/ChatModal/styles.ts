import { styled } from 'styled-components'
import { HEADER_HEIGHT_LG } from '~constants/layout'

export const ChatModal = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  padding: ${HEADER_HEIGHT_LG}px 20px 0;
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  overflow: auto;
`
export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const TypoWrapper = styled.div``

export const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const EllipsisWrapper = styled.div`
  position: absolute;
  right: 20px;
`
