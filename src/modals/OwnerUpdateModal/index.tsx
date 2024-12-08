import { useEffect } from 'react'
import * as S from '~pages/RegisterPage/Register/styles'
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
import Toast from '~components/Toast'
import { useQuery } from '@tanstack/react-query'
import { fetchOwnerProfile } from '~apis/family/fetchOwnerProfile'
import { Typo14 } from '~components/Typo'

export default function OwnerUpdateModal() {
  const { location, getCurrentLocation } = useGeolocation()
  // const popModal = useModalStore(state => state.popModal)
  const pushModal = useModalStore(state => state.pushModal)
  const setOwnerProfile = useOwnerProfileStore(state => state.setOwnerProfile) // 상태 업데이트 함수
  const ownerProfile = useOwnerProfileStore(state => state.ownerProfile) // 상태 값 가져오기

  // Fetch owner profile data
  const { data } = useQuery({
    queryKey: ['ownerUpdatePage'],
    queryFn: fetchOwnerProfile,
  })
  console.log('희희, ', data)

  // Update address when location changes
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
        <title>DDang | 내 정보 수정</title>
        <meta name='description' content='DDang 서비스 내 정보 수정' />
      </Helmet>

      <S.TextSection weight='700'>내 정보 수정</S.TextSection>

      <S.AddOwnerAvatarBtnWrapper>
        {ownerProfile.profileImg ? (
          <S.Avatar onClick={handleAvatarClick}>
            <img src={ownerProfile.profileImg} alt='선택된 아바타' />
          </S.Avatar>
        ) : (
          <S.AddOwnerAvatarBtn>
            <img src={AddOwnerAvatar} alt='프로필 선택' />
            <div>아바타 선택</div>
          </S.AddOwnerAvatarBtn>
        )}
        <S.ChoiceAvatarBtn onClick={handleAvatarClick}>
          <Typo14 $weight='700' color='white'>
            아바타 선택
          </Typo14>
        </S.ChoiceAvatarBtn>
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
          onClick={() => console.log('수정 완료')}
        >
          수정 완료
        </ActionButton>
        <Toast />
      </S.ToastWrapper>
    </S.RegisterPage>
  )
}
