import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { FOOTER_HEIGHT } from '~constants/layout'

export const Footer = styled.footer`
  height: ${FOOTER_HEIGHT}px;
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  box-shadow: inset 0 1px 0 0 ${({ theme }) => theme.colors.grayscale.gc_1};
`

export const FooterNavList = styled.ul`
  display: flex;
  justify-content: space-between;
  height: 100%;
`

export const FooterNavItem = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`
