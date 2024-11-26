import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import CloseButton from '~components/Button/CloseButton'
import { useState } from 'react'
import * as avatars from '~/assets/avatars'

export default function RegisterAvatarModal() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)

  const handleSelectAvatar = (index: number) => {
    setSelectedAvatar(index)
  }

  const popModal = useModalStore(state => state.popModal)

  const avatarImages = Object.values(avatars)

  return (
    <S.RegisterAvatarModal>
      <S.HeaderArea type='lg'>
        <CloseButton onClick={popModal}></CloseButton>
      </S.HeaderArea>
      <S.TextSection weight='700'>맘에 드는{'\n'}캐릭터를 선택해 주세요.</S.TextSection>

      <S.SelectCharacterSection>
        {avatarImages.map((avatar, index) => (
          <S.CharacterArea key={index} index={index} onClick={() => handleSelectAvatar(index)}>
            <img src={avatar} alt={`avatar ${index + 1}`} />
            {selectedAvatar === index && (
              <S.SelectOverlay>
                <S.CheckIcon>
                  <S.CheckPath />
                </S.CheckIcon>
              </S.SelectOverlay>
            )}
          </S.CharacterArea>
        ))}
      </S.SelectCharacterSection>

      <S.CustomActionButton>선택</S.CustomActionButton>
    </S.RegisterAvatarModal>
  )
}
