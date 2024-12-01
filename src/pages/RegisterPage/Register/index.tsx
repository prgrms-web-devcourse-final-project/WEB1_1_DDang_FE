import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import AddOwnerAvatar from '~assets/add-dog-picture.svg'
import GenderSelectButton from '~components/GenderSelectButton'
import { useState } from 'react'
import TwoLineInput from '~components/Input/TwoLineInput'
import RegisterAvatarModal from '~modals/RegisterAvatarModal'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'
import PositionChoiceModal from '~modals/PositionChoiceModal'
export default function Register() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)

  const pushModal = useModalStore(state => state.pushModal)

  const handleRoleClick = () => {
    pushModal(<PositionChoiceModal onSelect={handleSelectPosition} initialValue={selectedPosition} />)
  }

  const handleSelectPosition = (positionSrc: string) => {
    setSelectedPosition(positionSrc)
  }

  const handleAvatarClick = () => {
    pushModal(<RegisterAvatarModal onSelectAvatar={handleSelectAvatar} initialSelectedAvatar={selectedAvatar} />)
  }

  const handleSelectAvatar = (avatarSrc: string) => {
    setSelectedAvatar(avatarSrc)
  }

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender)
  }

  return (
    <S.RegisterPage>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>

      <S.TextSection weight='700'>견주님에 대해{'\n'}알려주세요</S.TextSection>

      <S.AddOwnerAvatarBtnWrapper>
        {selectedAvatar ? (
          <S.Avatar onClick={handleAvatarClick}>
            <img src={selectedAvatar} alt='선택된 아바타' />
          </S.Avatar>
        ) : (
          <S.AddOwnerAvatarBtn onClick={handleAvatarClick}>
            <img src={AddOwnerAvatar} alt='프로필 선택' />
            <div>아바타 선택</div>
          </S.AddOwnerAvatarBtn>
        )}
      </S.AddOwnerAvatarBtnWrapper>

      <S.OwnerProfileSection>
        <S.NickNameWrapper>
          <TwoLineInput placeholder='닉네임 입력' />
        </S.NickNameWrapper>
        <S.PositionChoiceBtn onClick={handleRoleClick} $hasSelected={!!selectedPosition}>
          {selectedPosition || '가족 포지션 선택'}
        </S.PositionChoiceBtn>
        <S.LocationBtn>내 동네 불러오기</S.LocationBtn>
        <S.GenderSelectBtnWrapper>
          <GenderSelectButton
            gender='male'
            isActive={selectedGender === 'male'}
            onClick={() => handleGenderSelect('male')}
          />
          <GenderSelectButton
            gender='female'
            isActive={selectedGender === 'female'}
            onClick={() => handleGenderSelect('female')}
          />
        </S.GenderSelectBtnWrapper>
      </S.OwnerProfileSection>

      <ActionButton $fontWeight='700'>다음</ActionButton>
    </S.RegisterPage>
  )
}
