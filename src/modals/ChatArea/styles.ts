import { styled } from 'styled-components'
import DogHowling from '~assets/dog_howling.svg'

export const ChatArea = styled.div`
  position: relative;
  height: calc(100% - 64px);
  overflow: auto;
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
export const ChatMessageList = styled.div``
