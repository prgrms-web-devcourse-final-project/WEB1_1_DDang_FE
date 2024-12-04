import * as S from './styles'
import React, { useState } from 'react'
import { RadioGroup } from '@mui/material'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'

interface PositionChoiceModalProps {
  onSelect: (position: string) => void
  initialValue?: string | null
}

interface Position {
  label: string
  value:
    | 'MOTHER'
    | 'FATHER'
    | 'ELDER_BROTHER'
    | 'OLDER_BROTHER'
    | 'ELDER_SISTER'
    | 'OLDER_SISTER'
    | 'GRANDFATHER'
    | 'GRANDMOTHER'
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

  // const positions = ['엄마', '아빠', '형', '오빠', '언니', '누나', '할머니', '할아버지']

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

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
