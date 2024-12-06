import { styled } from 'styled-components'
import { HEADER_HEIGHT_LG } from '~constants/layout'
import DogHowling from '~assets/dog_howling.svg'

export const ChatModal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${HEADER_HEIGHT_LG}px 20px 0;
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  &::after {
    background: url(${DogHowling}) center/cover;
    content: '';
    width: 190px;
    height: 260px;
    position: fixed;
    bottom: 95px;
    left: 50%;
    translate: -50%;
  }
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
