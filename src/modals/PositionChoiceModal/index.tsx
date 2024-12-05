import * as S from './styles'
import { useState } from 'react'
import { RadioGroup } from '@mui/material'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'
import { FamilyRole } from '~types/common'

interface PositionChoiceModalProps {
  onSelect: (position: string) => void
  initialValue?: string | null
}
interface Position {
  label: string
  value: FamilyRole
}

const positions: Position[] = [
  { label: '엄마', value: 'MOTHER' },
  { label: '아빠', value: 'FATHER' },
  { label: '형', value: 'OLDER_BROTHER' },
  { label: '오빠', value: 'ELDER_BROTHER' },
  { label: '언니', value: 'ELDER_SISTER' },
  { label: '누나', value: 'OLDER_SISTER' },
  { label: '할머니', value: 'GRANDMOTHER' },
  { label: '할아버지', value: 'GRANDFATHER' },
]

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
            <S.StyledFormControlLabel
              key={position.value}
              value={position.value}
              control={<S.StyledRadio />}
              label={position.label}
            />
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
