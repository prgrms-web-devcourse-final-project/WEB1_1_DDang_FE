import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import { Typo20 } from '~components/Typo'
import { ReactNode } from 'react'

interface SelectSectionButtonProps {
  title: string
  description: string
  src: string
  onClick: () => void
}

export default function SelectSectionButton({ title, description, src, onClick }: SelectSectionButtonProps) {
  return (
    <S.SelectSectionButton onClick={onClick}>
      <S.TypoWrapper>
        <Typo20 weight='700'>{title}</Typo20>
      </S.TypoWrapper>
      <S.Desc>{description}</S.Desc>
      <S.ImageWrapper>
        <img src={src} alt='반려견 등록' />
      </S.ImageWrapper>
    </S.SelectSectionButton>
  )
}
