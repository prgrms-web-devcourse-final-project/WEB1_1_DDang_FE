import * as S from './styles'
import { MdOutlineEditLocation } from 'react-icons/md'
import { Typo14, Typo15, Typo17 } from '~components/Typo'
import { MdOutlineModeEdit } from 'react-icons/md'
import CountSection from '~components/WalkCountArea'
import Profile from '~components/Profile'
import { useQuery } from '@tanstack/react-query'
import { useModalStore } from '~stores/modalStore'
import ShareCodeModal from '~modals/FamilyDDangModal/ShareCodeModal'
import OwnerUpdateModal from '~modals/OwnerUpdateModal'
import { fetchFamilyDDang } from '~apis/family/fetchFamilyDDang'
import { FAMILY_ROLE } from '~constants/familyRole'
import DogProfile from '~components/DogProfile'
import { useMyPage } from '~apis/myPage/useMyPage'
import { useEffect } from 'react'        
        
export default function FamilyDDang() {
  const { pushModal } = useModalStore()
  const { data, refetch } = useMyPage()
  const dogInfo = data?.dog

    const { data, isLoading, isError } = useQuery({
    queryKey: ['familyList'],
    queryFn: fetchFamilyDDang,
  })
    
  const { pushModal, modalList } = useModalStore()

  useEffect(() => {
    refetch()
  }, [modalList])
    

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>
  }
  console.log(data)

  const familyInfo = data?.data
  const members = familyInfo?.members

  // const firstDog = familyInfo?.dogs[0]

  console.log('familyIdfo : ', familyInfo)

  const onClickCodeShare = () => {
    pushModal(<ShareCodeModal />, 'slideLeft')
  }

  const onClickMemberUpdate = () => {
    pushModal(<OwnerUpdateModal />)
  }
  return (
    <S.FamilyDDang>
      <S.Header type='sm' title='패밀리댕'>
        <S.IconWrapper>
          <MdOutlineEditLocation cursor='pointer' size={28} />
        </S.IconWrapper>
      </S.Header>


      {/* {firstDog && (
        <DogProfile
          name={firstDog.name}
          gender={firstDog.gender === 'MALE' ? '남자' : '여자'}
          profileImg={firstDog.profileImg}
          birthDate={firstDog.birthDate}
          breed={firstDog.breed}
          comment={firstDog.comment}
          isNeutered={firstDog.isNeutered === 'TRUE' ? '중성화 O' : '중성화 X'}
          weight={`${firstDog.weight}kg`}
        />
      )} */}

      {dogInfo && <DogProfile dogProfile={dogInfo} isEditBtnVisible />}

      <S.FamilySection>
        {members?.map(member => (
          <S.ProfileOneArea key={member.memberId}>
            <Profile $size={64} $src={member.profileImg} userId={member.memberId} />
            <S.FamilyInfoArea>
              <S.LineWrapper>
                <Typo17 $weight='700'>{member.name}</Typo17>
                <Typo14 $weight='400'>
                  {member.gender === 'MALE' ? '남자' : '여자'} | {FAMILY_ROLE[member.familyRole] || member.familyRole}
                </Typo14>
              </S.LineWrapper>
              <S.LineWrapper>
                <Typo14 $weight='700'>산책 시간</Typo14>
                <Typo14 $weight='700' $color='default'>
                  {/* {member.walkScheduleInfoList.map(schedule => schedule.dayOfWeek).join(', ') || '없음'} */}
                </Typo14>
                <Typo14 $weight='700' $color='default'>
                  {member.walkScheduleInfoList.map(schedule => schedule.walkTime).join(', ') || ''}
                </Typo14>
              </S.LineWrapper>
              <S.LineWrapper>
                <Typo14 $weight='700'>산책 횟수</Typo14>
                <Typo14 $weight='700' $color='default'>
                  {member.totalWalkCount}
                </Typo14>
              </S.LineWrapper>
            </S.FamilyInfoArea>
            <S.EditIconWrapper onClick={onClickMemberUpdate}>
              <MdOutlineModeEdit size={20} />
            </S.EditIconWrapper>
          </S.ProfileOneArea>
        ))}
      </S.FamilySection>
      <S.InviteSection>
        <Typo15 $weight='700'>밤톨이와 함께할 동반자를 초대하세요!</Typo15>
        <S.InviteBtn onClick={onClickCodeShare}>
          <Typo14 $weight='700'>초대</Typo14>
        </S.InviteBtn>
      </S.InviteSection>

      <CountSection />
    </S.FamilyDDang>
  )
}
