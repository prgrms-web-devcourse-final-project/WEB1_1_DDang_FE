import { styled } from 'styled-components'
import { Typo17 } from '~components/Typo'
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '~constants/layout'
import { SocialTabs } from '~types/social'

const SOCIAL_HEADER_HEIGHT = HEADER_HEIGHT * 2

export const SocialPage = styled.div`
  height: calc(100% - ${FOOTER_HEIGHT}px);
  padding-top: ${SOCIAL_HEADER_HEIGHT}px;
`

export const TabArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const Tab = styled.div`
  flex: 1;
  cursor: pointer;
  padding: 16.5px 0;
`
export const TabUnderBar = styled.span<{ $selectedTab: SocialTabs }>`
  display: block;
  background-color: ${({ theme }) => theme.colors.grayscale.font_1};
  width: 32px;
  height: 4px;
  position: absolute;
  top: calc(100% - 2px);
  left: ${({ $selectedTab }) => ($selectedTab === 'friendList' ? '25%' : '75%')};
  border-radius: 24px;
  translate: -50%;
  transition: left 0.23s ease-in-out;
`
export const Header = styled.header`
  position: fixed;
  height: ${SOCIAL_HEADER_HEIGHT}px;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
`

export const HeaderTypo = styled(Typo17)`
  padding: 15px 0;
`
