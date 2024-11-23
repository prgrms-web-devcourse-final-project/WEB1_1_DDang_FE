import { ReactNode } from 'react'
import * as S from './styles'
import { HeaderType } from '~types/headerType'

type HeaderProps = {
  prevBtn?: boolean
  closeBtn?: boolean
  onClickPrev?: () => void
  onClickClose?: () => void
  children?: ReactNode
  type: HeaderType
}

export default function Header({ onClickPrev, onClickClose, children, type, prevBtn, closeBtn }: HeaderProps) {
  return (
    <S.Header $type={type}>
      {prevBtn ? <S.HeaderPrevBtn onClick={onClickPrev} /> : null}
      {closeBtn ? <S.HeaderCloseBtn onClick={onClickClose} /> : null}
      {children}
    </S.Header>
  )
}
