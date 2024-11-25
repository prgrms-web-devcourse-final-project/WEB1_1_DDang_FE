import * as S from './styles'
import { useModalStore } from '~stores/modalStore'

export default function RegisterAvatarModal() {
  const popModal = useModalStore(state => state.popModal)

  return (
    <S.RegisterAvatarModal>
      <S.CloseButton onClick={popModal}>닫기</S.CloseButton>
      <S.TextSection weight='700'>맘에 드는{'\n'}캐릭터를 선택해 주세요.</S.TextSection>
    </S.RegisterAvatarModal>
  )
}
