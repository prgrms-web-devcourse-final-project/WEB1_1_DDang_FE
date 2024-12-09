import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { UnreadChatCount } from '~components/UnreadChatCount'
import { FOOTER_HEIGHT } from '~constants/layout'

export const Footer = styled.footer`
  height: ${FOOTER_HEIGHT}px;
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  box-shadow: inset 0 1px 0 0 ${({ theme }) => theme.colors.grayscale.gc_1};
  z-index: 1000;
`

export const FooterNavList = styled.ul`
  display: flex;
  justify-content: space-between;
  height: 100%;
`

export const FooterNavItem = styled(Link)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`

export const ChatCount = styled(UnreadChatCount)`
  left: calc(50% + 3px);
  top: 2px;
  translate: 8px;
  font-size: ${({ theme }) => theme.typography._9};
  min-width: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
`
