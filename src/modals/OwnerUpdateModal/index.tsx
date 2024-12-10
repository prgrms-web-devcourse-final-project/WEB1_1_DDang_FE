import { useEffect, useState } from 'react'
import * as S from '~pages/RegisterPage/Register/styles'
import { Helmet } from 'react-helmet-async'
import GenderSelectButton from '~components/GenderSelectButton'
import { Input } from '~components/Input'
import RegisterAvatarModal from '~modals/RegisterAvatarModal'
import { useModalStore } from '~stores/modalStore'
import { ActionButton } from '~components/Button/ActionButton'
import FamilyRoleChoiceModal from '~modals/PositionChoiceModal'
import Toast from '~components/Toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' // 추가
import { fetchOwnerProfile } from '~apis/family/fetchOwnerProfile'
import { UpdateOwnerProfileRequest, updateOwnerProfile } from '~apis/family/updateOwnerProfile' // 추가
import { Typo14 } from '~components/Typo'
import { queryKey } from '~constants/queryKey'
import { FAMILY_ROLE } from '~constants/familyRole'
import { REVERSE_FAMILY_ROLE } from '~constants/familyRole'

import { FamilyRole, Gender } from '~types/common'
// import { validateOwnerProfile } from '~utils/validateOwnerProfile'

interface updateProfileType {
  familyRole: FamilyRole
  gender: Gender
  name: string
  profileImg: string
}

export default function OwnerUpdateModal() {
  const pushModal = useModalStore(state => state.pushModal)
  const popModal = useModalStore(state => state.popModal)
  const [ownerProfile, setOwnerProfile] = useState<updateProfileType>({
    familyRole: 'MOTHER',
    gender: 'MALE', // 기본값
    name: '',
    profileImg: '',
  })

  const [ProfileImage, setProfileImage] = useState<React.ComponentType | null>(null)

  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.family.prevOwnerInto(),
    queryFn: fetchOwnerProfile,
  })

  useEffect(() => {
    if (data?.data) {
      setOwnerProfile(prev => ({
        ...prev, // 기존 상태 유지
        ...data.data, // 서버 데이터 병합
        familyRole: data.data.familyRole || prev.familyRole, // familyRole이 없으면 기존 값 유지
      }))
    }
  }, [data])

  const updateOwnerMutation = useMutation({
    mutationFn: (data: UpdateOwnerProfileRequest) => updateOwnerProfile(data),
    onSuccess: () => {
      alert('견주정보 수정 완료')
      queryClient.invalidateQueries({ queryKey: queryKey.family.UpdateOwner() })
      popModal()
    },
  })

  useEffect(() => {
    if (ownerProfile.profileImg) {
      const avatarNumber = ownerProfile.profileImg.match(/Avatar(\d+)/)?.[1] // 프로필 이미지에서 번호 추출
      if (avatarNumber) {
        import(`../../../src/assets/avatars/Avatar${avatarNumber}.svg?react`)
          .then(module => setProfileImage(() => module.default)) // 동적으로 가져온 컴포넌트를 상태에 저장
          .catch(err => console.error('Error loading SVG:', err))
      }
    }
  }, [ownerProfile.profileImg]) // profileImg가 변경될 때마다 실행

  if (!ownerProfile) {
    return null
  }

  const handleRoleClick = () => {
    pushModal(
      <FamilyRoleChoiceModal
        onSelectRole={role =>
          setOwnerProfile(prev => ({
            ...prev!,
            familyRole: role,
          }))
        }
        initialRole={ownerProfile.familyRole}
      />
    )
  }

  const handleAvatarClick = () => {
    pushModal(
      <RegisterAvatarModal
        onSelectAvatar={avatarSrc => {
          setOwnerProfile(prev => ({
            ...prev,
            profileImg: avatarSrc, // 선택된 아바타 경로 업데이트
          }))
        }}
        initialSelectedAvatar={ownerProfile.profileImg}
      />
    )
  }

  const handleGenderSelect = (gender: 'MALE' | 'FEMALE') => {
    setOwnerProfile(prev => ({
      ...prev!,
      gender,
    }))
  }

  const handleUpdateClick = () => {
    if (!ownerProfile.name || !ownerProfile.familyRole || !ownerProfile.gender || !ownerProfile.profileImg) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    // familyRole을 영어 Enum 값으로 변환
    const updatedProfile = {
      ...ownerProfile,
      familyRole: REVERSE_FAMILY_ROLE[ownerProfile.familyRole] || ownerProfile.familyRole, // ENUM 변환 또는 기존 값 유지
    }

    updateOwnerMutation.mutate(updatedProfile) // 서버로 전송
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <S.RegisterPage>
      <Helmet>
        <title>DDang | 내 정보 수정</title>
        <meta name='description' content='DDang 서비스 내 정보 수정' />
      </Helmet>

      <S.TextSection weight='700'>내 정보 수정</S.TextSection>

      <S.ProfileArea>
        {ProfileImage && <ProfileImage />}
        <S.ChoiceAvatarBtn onClick={handleAvatarClick}>
          <Typo14 $weight='700' color='white'>
            아바타 선택
          </Typo14>
        </S.ChoiceAvatarBtn>
      </S.ProfileArea>

      <S.OwnerProfileSection>
        <S.NickNameWrapper>
          <Input
            placeholder='닉네임 입력'
            value={ownerProfile.name}
            onChange={e =>
              setOwnerProfile(prev => ({
                ...prev!,
                name: e.target.value,
              }))
            }
          />
        </S.NickNameWrapper>
        <S.PositionChoiceBtn onClick={handleRoleClick} $hasSelected={!!ownerProfile.familyRole}>
          {FAMILY_ROLE[ownerProfile.familyRole] || ownerProfile.familyRole}
        </S.PositionChoiceBtn>
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
        <ActionButton $fontWeight='700' $bgColor={'default'} onClick={handleUpdateClick}>
          수정 완료
        </ActionButton>
        <Toast />
      </S.ToastWrapper>
    </S.RegisterPage>
  )
}
