import { styled } from 'styled-components'
import { FOOTER_HEIGHT } from '~constants/layout'

export const FriendChatList = styled.div`
  overflow: auto;
  margin-top: 8px;
  height: calc(100% - ${FOOTER_HEIGHT}px);
`
