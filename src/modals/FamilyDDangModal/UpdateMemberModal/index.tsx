import * as S from './styles'
import GenderSelectButton from '~components/GenderSelectButton'
import { useEffect } from 'react'
import { Input } from '~components/Input'
import { useModalStore } from '~stores/modalStore'
import { useToastStore } from '~stores/toastStore'
import Toast from '~components/Toast'
import { useGeolocation } from '~hooks/useGeolocation'
import AddOwnerAvatar from '~assets/add-dog-picture.svg'
import RegisterAvatarModal from '~modals/RegisterAvatarModal'
import { ActionButton } from '~components/Button/ActionButton'
import PositionChoiceModal from '~modals/PositionChoiceModal'
import { useOwnerProfileStore } from '~stores/ownerProfileStore'
import { validateOwnerProfile } from '~utils/validateOwnerProfile'
import Header from '~components/Header'
// type UpdateMemberModalProps = {
//   :
// }

export default function UpdateMemberModal({}: UpdateMemberModalProps) {
  const popModal = useModalStore()
  return (
    <S.UpdateMemberModal>
      <Header type='lg' prevBtn onClickPrev={popModal} />
      <Header type='lg' prevBtn onClickPrev={popModal} />
      UpdateMemberModal
    </S.UpdateMemberModal>
  )
}
