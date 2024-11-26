import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import Avatar1 from '~/assets/Avatar1.svg'
import Avatar2 from '~/assets/Avatar2.svg'
import Avatar3 from '~/assets/Avatar3.svg'
import Avatar4 from '~/assets/Avatar4.svg'
import Avatar5 from '~/assets/Avatar5.svg'
import Avatar6 from '~/assets/Avatar6.svg'
import Avatar7 from '~/assets/Avatar7.svg'
import Avatar8 from '~/assets/Avatar8.svg'
import Avatar9 from '~/assets/Avatar9.svg'
import Avatar10 from '~/assets/Avatar10.svg'
import CloseButton from '~components/Button/CloseButton'
import { useState } from 'react'

export default function RegisterAvatarModal() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)

  const handleSelectAvatar = (index: number) => {
    setSelectedAvatar(index)
  }

  const popModal = useModalStore(state => state.popModal)
  const avatarImages = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8, Avatar9, Avatar10]
  return (
    <S.RegisterAvatarModal>
      <S.HeaderArea type='lg'>
        <CloseButton onClick={popModal}></CloseButton>
      </S.HeaderArea>
      <S.TextSection weight='700'>맘에 드는{'\n'}캐릭터를 선택해 주세요.</S.TextSection>

      <S.SelectCharacterSection>
        {avatarImages.map((avatar, index) => (
          <S.CharacterArea key={index} onClick={() => handleSelectAvatar(index)}>
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
