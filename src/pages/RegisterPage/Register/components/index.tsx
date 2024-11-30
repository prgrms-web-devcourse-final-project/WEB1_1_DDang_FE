import React, { useState } from 'react'
import { RadioGroup } from '@mui/material'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'

interface PositionChoiceDialogProps {
  onSelect: (position: string) => void
  initialValue?: string
}

const PositionChoiceDialog = ({ onSelect, initialValue = '엄마' }: PositionChoiceDialogProps) => {
  const [value, setValue] = useState(initialValue)
  const { popModal } = useModalStore()

  const positions = ['엄마', '아빠', '할머니', '할아버지', '오빠', '언니', '형']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  const handleConfirm = () => {
    onSelect(value)
    popModal()
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
        <S.StyledButton onClick={popModal}>취소</S.StyledButton>
        <S.StyledButton onClick={handleConfirm}>확인</S.StyledButton>
      </S.ButtonContainer>
    </S.DialogContainer>
  )
}
export default PositionChoiceDialog
