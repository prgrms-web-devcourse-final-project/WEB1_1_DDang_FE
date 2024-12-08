import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import { Typo20 } from '~components/Typo'
import { ReactNode } from 'react'

interface SelectSectionButtonProps {
  title: string
  description: string
  src: string
  modal: ReactNode
}

export default function SelectSectionButton({ title, description, src, modal }: SelectSectionButtonProps) {
  const { pushModal } = useModalStore()

  return (
    <S.SelectSectionButton onClick={() => pushModal(modal)}>
      <S.TypoWrapper>
        <Typo20 $weight='700' $color='font_1'>
          {title}
        </Typo20>
      </S.TypoWrapper>
      <S.Desc>{description}</S.Desc>
      <S.ImageWrapper>
        <img src={src} alt='반려견 등록' />
      </S.ImageWrapper>
    </S.SelectSectionButton>
  )
}
