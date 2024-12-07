import * as S from './styles'
import { useState } from 'react'
import { RadioGroup } from '@mui/material'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'
import { FAMILY_ROLE } from '~constants/familyRole'

interface PositionChoiceModalProps {
  onSelect: (position: string) => void
  initialValue?: string | null
}

const positions = Object.values(FAMILY_ROLE)

export default function PositionChoiceModal({ onSelect, initialValue = 'null' }: PositionChoiceModalProps) {
  const [value, setValue] = useState(initialValue)
  const { popModal } = useModalStore()

  const handleConfirm = () => {
    if (value !== null) {
      onSelect(value)
      popModal()
    }
  }

  return (
    <S.DialogContainer open={true} onClose={popModal}>
      <S.DialogTitle>가족 포지션 선택</S.DialogTitle>
      <RadioGroup value={value} onChange={e => setValue(e.target.value)}>
        <S.RadioGroupContainer>
          {positions.map(position => (
            <S.StyledFormControlLabel key={position} value={position} control={<S.StyledRadio />} label={position} />
          ))}
        </S.RadioGroupContainer>
      </RadioGroup>

      <S.ButtonContainer>
        <ActionButton onClick={popModal}>취소</ActionButton>
        <ActionButton onClick={handleConfirm} disabled={!value} $fontWeight='700'>
          확인
        </ActionButton>
      </S.ButtonContainer>
    </S.DialogContainer>
  )
}
