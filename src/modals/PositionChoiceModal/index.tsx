import * as S from './styles'
import { useState } from 'react'
import { RadioGroup } from '@mui/material'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'
import { FAMILY_ROLE } from '~constants/familyRole'
import { FamilyRole } from '~types/common'

const familyRoles = Object.values(FAMILY_ROLE)
type FamilyRoleChoiceModalProps = { onSelectRole: (role: FamilyRole) => void; initialRole: FamilyRole }

export default function FamilyRoleChoiceModal({ onSelectRole, initialRole }: FamilyRoleChoiceModalProps) {
  const [selectedFamilyRole, setSelectedFamilyRole] = useState<FamilyRole>(initialRole)
  const { popModal } = useModalStore()

  const handleConfirm = () => {
    if (selectedFamilyRole !== null) {
      onSelectRole(selectedFamilyRole)
      popModal()
    }
  }

  return (
    <S.DialogContainer open={true} onClose={popModal}>
      <S.DialogTitle>가족 포지션 선택</S.DialogTitle>
      <RadioGroup value={selectedFamilyRole} onChange={e => setSelectedFamilyRole(e.target.value as FamilyRole)}>
        <S.RadioGroupContainer>
          {familyRoles.map(role => (
            <S.StyledFormControlLabel key={role} value={role} control={<S.StyledRadio />} label={role} />
          ))}
        </S.RadioGroupContainer>
      </RadioGroup>

      <S.ButtonContainer>
        <ActionButton onClick={popModal}>취소</ActionButton>
        <ActionButton onClick={handleConfirm} disabled={!selectedFamilyRole} $fontWeight='700'>
          확인
        </ActionButton>
      </S.ButtonContainer>
    </S.DialogContainer>
  )
}
