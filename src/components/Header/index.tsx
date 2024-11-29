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
  className?: string
  title?: string
}

export default function Header({
  onClickPrev,
  onClickClose,
  children,
  type,
  prevBtn,
  closeBtn,
  className,
  title,
}: HeaderProps) {
  return (
    <S.Header className={className} $type={type}>
      {title ? <S.Title $weight='700'>{title}</S.Title> : null}
      {prevBtn ? <S.HeaderPrevBtn onClick={onClickPrev} /> : null}
      {closeBtn ? <S.HeaderCloseBtn onClick={onClickClose} /> : null}
      {children}
    </S.Header>
  )
}
