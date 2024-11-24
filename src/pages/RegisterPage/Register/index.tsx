import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import AddOwnerAvatar from '~assets/add-dog-picture.svg'
import { ActionButton } from '~components/Button/ActionButton'
import GenderSelectButton from '~pages/LoginPage/components/GenderSelectButton'
import { useState } from 'react'
import TwoLineInput from '~components/Input/TwoLineInput'

export default function Register() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null)

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender)
  }

  return (
    <S.Register>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>

      <S.TextSection weight='700'>견주님에 대해{'\n'}알려주세요</S.TextSection>

      <S.AddOwnerAvatarBtnWrapper>
        <S.AddOwnerAvatarBtn>
          <img src={AddOwnerAvatar} alt='프로필 선택' />
          <div>프로필 선택</div>
        </S.AddOwnerAvatarBtn>
      </S.AddOwnerAvatarBtnWrapper>

      <S.OwnerProfileSection>
        <S.NickNameWrapper>
          <TwoLineInput placeholder='닉네임 입력' />
        </S.NickNameWrapper>
        <S.PositionChoiceBtn>가족 포지션 선택</S.PositionChoiceBtn>
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
      <ActionButton>다음</ActionButton>
    </S.Register>
  )
}
