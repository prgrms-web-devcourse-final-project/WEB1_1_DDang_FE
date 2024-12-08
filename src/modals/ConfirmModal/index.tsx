import * as S from './styles'
import { Typo20 } from '~components/Typo'

interface ConfirmModalProps {
  content: string
  onClick: () => void
}

export default function ConfirmModal({ content, onClick }: ConfirmModalProps) {
  return (
    <S.ConfirmModalOverlay>
      <S.ConfirmModal>
        <Typo20>{content}</Typo20>
        <S.ConfirmButton onClick={onClick}>확인</S.ConfirmButton>
      </S.ConfirmModal>
    </S.ConfirmModalOverlay>
  )
}
