import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import AddOwnerAvatar from '~assets/add-dog-picture.svg'
import { ActionButton } from '~components/Button/ActionButton'
import GenderSelectButton from '~components/GenderSelectButton'
import { useState } from 'react'
import TwoLineInput from '~components/Input/TwoLineInput'
import Header from '~components/Header'
import RegisterAvatarModal from '~modals/RegisterAvatarModal'
import { useModalStore } from '~stores/modalStore'

export default function Register() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null)
  // const [isAvatarMadalOpen, setIsAvatarModalOpen] = useState(true) //개발 중에는 true로 고정
  const pushModal = useModalStore(state => state.pushModal)
  const handleAvatarClick = () => {
    pushModal(<RegisterAvatarModal />)
  }

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender)
  }
  const handleClickPrev = () => {}
  return (
    <S.RegisterPage>
      <Header type='sm' onClickPrev={handleClickPrev} prevBtn={true} />
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>

      <S.TextSection weight='700'>견주님에 대해{'\n'}알려주세요</S.TextSection>

      <S.AddOwnerAvatarBtnWrapper>
        <S.AddOwnerAvatarBtn onClick={handleAvatarClick}>
          <img src={AddOwnerAvatar} alt='프로필 선택' />
          <div>아바타 선택</div>
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
      {/* 개발할 때는 조건부 렌더링을 제거하고 직접 렌더링 */}
      {/* {isAvatarMadalOpen && <RegisterAvatarModal onClose={handleCloseModal} />} */}
    </S.RegisterPage>
  )
}
