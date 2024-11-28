import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import CloseButton from '~components/Button/CloseButton'
import { useState } from 'react'
import * as avatars from '~/assets/avatars'

interface RegisterAvatarModalProps {
  onSelectAvatar: (avatarSrc: string) => void
  initialSelectedAvatar?: string | null
}

export default function RegisterAvatarModal({ onSelectAvatar, initialSelectedAvatar }: RegisterAvatarModalProps) {
  const avatarImages: string[] = Object.values(avatars)
  const popModal = useModalStore(state => state.popModal)
  const initialIndex = initialSelectedAvatar ? avatarImages.findIndex(avatar => avatar === initialSelectedAvatar) : null
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(initialIndex)

  const handleSelectAvatar = (index: number) => {
    setSelectedAvatar(index)
  }

  const handleSelectComplete = () => {
    if (selectedAvatar !== null) {
      onSelectAvatar(avatarImages[selectedAvatar])
      popModal()
    }
  }

  return (
    <S.RegisterAvatarModal>
      <S.HeaderArea type='lg' closeBtn>
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
      <S.CustomActionButton isSelected={selectedAvatar !== null} onClick={handleSelectComplete}>
        선택
      </S.CustomActionButton>
    </S.RegisterAvatarModal>
  )
}
