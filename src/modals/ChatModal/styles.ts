import { styled } from 'styled-components'
import { HEADER_HEIGHT_LG } from '~constants/layout'

export const ChatModal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${HEADER_HEIGHT_LG}px 20px 0;
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
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

export const FallbackWrapper = styled.div`
  position: absolute;
  height: ${HEADER_HEIGHT_LG}px;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
`
