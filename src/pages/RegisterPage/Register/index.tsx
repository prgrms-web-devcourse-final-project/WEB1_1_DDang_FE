import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import AddOwnerAvatar from '~assets/add-dog-picture.svg'
import GenderSelectButton from '~components/GenderSelectButton'
import { useEffect } from 'react'
import { Input } from '~components/Input'
import RegisterAvatarModal from '~modals/RegisterAvatarModal'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'
import PositionChoiceModal from '~modals/PositionChoiceModal'
import { useGeolocation } from '~hooks/useGeolocation'
import { useOwnerProfileStore } from '~stores/ownerProfileStore'
import { validateOwnerProfile } from '~utils/validateOwnerProfile'
import RegisterDogPage from '~pages/RegisterPage/Dog'
import Toast from '~components/Toast'
import { useToastStore } from '~stores/toastStore'

export default function Register() {
  const { ownerProfile, setOwnerProfile } = useOwnerProfileStore()
  const { location, getCurrentLocation } = useGeolocation()
  const pushModal = useModalStore(state => state.pushModal)
  const { showToast } = useToastStore()

  const handleNextClick = () => {
    const alertMessage = validateOwnerProfile(ownerProfile)
    console.log('예외처리 확인 콘솔 : ', {
      alertMessage,
      ownerProfile,
    })
    if (alertMessage) {
      showToast(alertMessage)
      return
    }
    pushModal(<RegisterDogPage />)
  }

  const handleLocationClick = () => {
    getCurrentLocation()
  }

  useEffect(() => {
    if (location.address) {
      setOwnerProfile({ location: location.address })
    }
  }, [location])

  const handleRoleClick = () => {
    pushModal(
      <PositionChoiceModal onSelect={position => setOwnerProfile({ position })} initialValue={ownerProfile.position} />
    )
  }

  const handleAvatarClick = () => {
    pushModal(
      <RegisterAvatarModal
        onSelectAvatar={avatarSrc => setOwnerProfile({ avatar: avatarSrc })}
        initialSelectedAvatar={ownerProfile.avatar}
      />
    )
  }

  const handleGenderSelect = (gender: 'MALE' | 'FEMALE') => {
    setOwnerProfile({ gender })
  }

  return (
    <S.RegisterPage>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>

      <S.TextSection weight='700'>견주님에 대해{'\n'}알려주세요</S.TextSection>

      <S.AddOwnerAvatarBtnWrapper>
        {ownerProfile.avatar ? (
          <S.Avatar onClick={handleAvatarClick}>
            <img src={ownerProfile.avatar} alt='선택된 아바타' />
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
          <Input
            placeholder='닉네임 입력'
            value={ownerProfile.nickName}
            onChange={e => setOwnerProfile({ nickName: e.target.value })}
          />
        </S.NickNameWrapper>
        <S.PositionChoiceBtn onClick={handleRoleClick} $hasSelected={!!ownerProfile.position}>
          {ownerProfile.position || '가족 포지션 선택'}
        </S.PositionChoiceBtn>
        <S.LocationBtn onClick={handleLocationClick} $hasSelected={!!ownerProfile.location}>
          {ownerProfile.location || '내 동네 불러오기'}
        </S.LocationBtn>
        <S.GenderSelectBtnWrapper>
          <GenderSelectButton
            gender='MALE'
            isActive={ownerProfile.gender === 'MALE'}
            onClick={() => handleGenderSelect('MALE')}
          />
          <GenderSelectButton
            gender='FEMALE'
            isActive={ownerProfile.gender === 'FEMALE'}
            onClick={() => handleGenderSelect('FEMALE')}
          />
        </S.GenderSelectBtnWrapper>
      </S.OwnerProfileSection>
      <S.ToastWrapper>
        <ActionButton
          $fontWeight='700'
          $bgColor={validateOwnerProfile(ownerProfile) ? 'gc_1' : 'default'}
          onClick={handleNextClick}
        >
          다음
        </ActionButton>
        <Toast />
      </S.ToastWrapper>
    </S.RegisterPage>
  )
}
