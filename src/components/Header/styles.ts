import styled from 'styled-components'
import CloseButton from '~components/Button/CloseButton'
import PrevButton from '~components/Button/PrevButton'
import { HEADER_HEIGHT, HEADER_HEIGHT_LG, HEADER_Z_INDEX } from '~constants/layout'
import { HeaderType } from '~types/headerType'

type HeaderProps = {
  $type: HeaderType
}

export const Header = styled.header<HeaderProps>`
  height: ${({ $type }) => ($type === 'sm' ? HEADER_HEIGHT : HEADER_HEIGHT_LG)}px;
  position: fixed;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: ${HEADER_Z_INDEX};
`

export const HeaderPrevBtn = styled(PrevButton)`
  margin-right: 8px;
`
export const HeaderCloseBtn = styled(CloseButton)`
  position: absolute;
  right: 1.25rem;
`
