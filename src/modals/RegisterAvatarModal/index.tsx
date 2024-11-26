import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import Avatar1 from '~/assets/Avatar1.svg'
import Avatar2 from '~/assets/Avatar2.svg'
import Avatar3 from '~/assets/Avatar3.svg'

export default function RegisterAvatarModal() {
  const popModal = useModalStore(state => state.popModal)

  return (
    <S.RegisterAvatarModal>
      <S.CloseButton onClick={popModal}>닫기</S.CloseButton>
      <S.TextSection weight='700'>맘에 드는{'\n'}캐릭터를 선택해 주세요.</S.TextSection>

      <S.SelectCharacterSection>
        <S.CharacterArea>
          <img src={Avatar1} alt='avatar 1' />
        </S.CharacterArea>
        <S.CharacterArea>
          <img src={Avatar2} alt='avatar 2' />
        </S.CharacterArea>
        <S.CharacterArea>
          <img src={Avatar3} alt='avatar 3' />
        </S.CharacterArea>
        <S.CharacterArea>
          <img src={Avatar1} alt='avatar 4' />
        </S.CharacterArea>
        <S.CharacterArea>
          <img src={Avatar2} alt='avatar 5' />
        </S.CharacterArea>
        <S.CharacterArea>
          <img src={Avatar3} alt='avatar 6' />
        </S.CharacterArea>
        <S.CharacterArea>
          <img src={Avatar1} alt='avatar 7' />
        </S.CharacterArea>
        <S.CharacterArea>
          <img src={Avatar2} alt='avatar 8' />
        </S.CharacterArea>
      </S.SelectCharacterSection>

      <S.CustomActionButton>선택</S.CustomActionButton>
    </S.RegisterAvatarModal>
  )
}
