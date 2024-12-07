import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import AddOwnerAvatar from '~assets/add-dog-picture.svg'
import GenderSelectButton from '~components/GenderSelectButton'
import { Input } from '~components/Input'
import RegisterAvatarModal from '~modals/RegisterAvatarModal'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'
import FamilyRoleChoiceModal from '~modals/PositionChoiceModal'
import { useGeolocation } from '~hooks/useGeolocation'
import { useOwnerProfileStore } from '~stores/ownerProfileStore'
import { validateOwnerProfile } from '~utils/validateOwnerProfile'
import RegisterDogPage from '~pages/RegisterPage/Dog'
import Toast from '~components/Toast'
import { useToastStore } from '~stores/toastStore'
import { useSearchParams } from 'react-router-dom'
import { createRegister } from '~apis/register/createRegister'
import { FamilyRole } from '~types/common'
import { useEffect } from 'react'

export default function Register() {
  const { ownerProfile, setOwnerProfile } = useOwnerProfileStore()
  const { location, getCurrentLocation } = useGeolocation()
  const pushModal = useModalStore(state => state.pushModal)
  const { showToast } = useToastStore()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const provider = searchParams.get('provider') || ''

  const handleNextClick = async () => {
    const alertMessage = validateOwnerProfile(ownerProfile)
    if (alertMessage) {
      showToast(alertMessage)
      return
    }

    try {
      const registerData = {
        email,
        provider,
        name: ownerProfile.name,
        gender: ownerProfile.gender as 'MALE' | 'FEMALE',
        address: ownerProfile.address,
        familyRole: ownerProfile.familyRole as FamilyRole,
        profileImg: ownerProfile.profileImg || '',
      }

      const response = await createRegister({
        ...registerData,
        provider: registerData.provider as 'KAKAO' | 'GOOGLE',
      })
      if (response.code === 201) {
        pushModal(<RegisterDogPage />)
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : '회원가입에 실패했습니다')
    }
  }
  useEffect(() => {
    if (location.address) {
      setOwnerProfile({ address: location.address })
    }
  }, [location.address, setOwnerProfile])
  const handleLocationClick = () => {
    getCurrentLocation()
  }

  const handleRoleClick = () => {
    pushModal(
      <FamilyRoleChoiceModal
        onSelectRole={role => setOwnerProfile({ familyRole: role })}
        initialRole={ownerProfile.familyRole}
      />
    )
  }

  const handleAvatarClick = () => {
    pushModal(
      <RegisterAvatarModal
        onSelectAvatar={avatarSrc => setOwnerProfile({ profileImg: avatarSrc })}
        initialSelectedAvatar={ownerProfile.profileImg}
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
        {ownerProfile.profileImg ? (
          <S.Avatar onClick={handleAvatarClick}>
            <img src={ownerProfile.profileImg} alt='선택된 아바타' />
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
            value={ownerProfile.name}
            onChange={e => setOwnerProfile({ name: e.target.value })}
          />
        </S.NickNameWrapper>
        <S.PositionChoiceBtn onClick={handleRoleClick} $hasSelected={!!ownerProfile.familyRole}>
          {ownerProfile.familyRole || '가족 포지션 선택'}
        </S.PositionChoiceBtn>
        <S.LocationBtn onClick={handleLocationClick} $hasSelected={!!ownerProfile.address}>
          {ownerProfile.address || '내 동네 불러오기'}
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
