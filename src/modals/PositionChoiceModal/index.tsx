import * as S from './styles'
import React, { useState } from 'react'
import { RadioGroup } from '@mui/material'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'

interface PositionChoiceModalProps {
  onSelect: (position: string) => void
  initialValue?: string | null
}

export default function PositionChoiceModal({ onSelect, initialValue = 'null' }: PositionChoiceModalProps) {
  const [value, setValue] = useState(initialValue)
  const { popModal } = useModalStore()

  const positions = ['엄마', '아빠', '오빠', '언니', '형', '누나', '할머니', '할아버지']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  const handleConfirm = () => {
    if (value !== null) {
      onSelect(value)
      popModal()
    }
  }

  return (
    <S.DialogContainer open={true} onClose={popModal}>
      <S.DialogTitle>가족 포지션 선택</S.DialogTitle>

      <RadioGroup value={value} onChange={handleChange}>
        {positions.map(position => (
          <S.StyledFormControlLabel key={position} value={position} control={<S.StyledRadio />} label={position} />
        ))}
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
