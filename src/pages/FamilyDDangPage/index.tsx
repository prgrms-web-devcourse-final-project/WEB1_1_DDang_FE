import * as S from './styles'
import { MdOutlineEditLocation } from 'react-icons/md'
import { Typo14, Typo15, Typo17 } from '~components/Typo'
import { MdOutlineModeEdit } from 'react-icons/md'
import CountSection from '~components/WalkCountArea'
import Profile from '~components/Profile'
// import DogProfile from '~components/DogProfile'
import { useQuery } from '@tanstack/react-query'
import { APIResponse } from '~types/api'
import { useModalStore } from '~stores/modalStore'
import ShareCodeModal from '~modals/FamilyDDangModal/ShareCodeModal'
import OwnerUpdateModal from '~modals/OwnerUpdateModal'
import { fetchFamilyDDang, FetchFamilyDDangResponse } from '~apis/family/fetchFamilyDDang'

export default function FamilyDDang() {
  // const { data } = useQuery<APIResponse<FetchMypageResponse>>({
  //   queryKey: ['myPage'],
  //   queryFn: fetchMypage,
  // })
  // const dogInfo = data?.data?.dog

  const { data } = useQuery<APIResponse<FetchFamilyDDangResponse>>({
    queryKey: ['familyList'],
    queryFn: fetchFamilyDDang,
  })
  console.log(data)

  const familyInfo = data?.data
  const firstMember = familyInfo?.members[0] // members 배열의 첫 번째 멤버
  // const firstDog = familyInfo?.dogs[0]

  console.log('familyIdfo : ', familyInfo)

  const { pushModal } = useModalStore()

  const onClickCodeShare = () => {
    pushModal(<ShareCodeModal />)
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
      <S.FamilySection>
        {firstMember && ( // 첫 번째 멤버가 존재할 때만 렌더링
          <S.ProfileOneArea>
            <Profile $size={64} $src={firstMember.profileImg} userId={firstMember.memberId} />
            <S.FamilyInfoArea>
              <S.LineWrapper>
                <Typo17 $weight='700'>{firstMember.name}</Typo17>
                <Typo14 $weight='400'>
                  {firstMember.gender === 'MALE' ? '남자' : '여자'} |{' '}
                  {firstMember.familyRole === 'MOTHER' ? '엄마' : firstMember.familyRole}
                </Typo14>
              </S.LineWrapper>
              <S.LineWrapper>
                <Typo14 $weight='700'>산책 시간</Typo14>
                <Typo14 $weight='700' $color='default'>
                  {firstMember.walkScheduleInfoList.map(schedule => schedule.dayOfWeek).join(', ') || '없음'}
                </Typo14>
                <Typo14 $weight='700' $color='default'>
                  {firstMember.walkScheduleInfoList.map(schedule => schedule.walkTime).join(', ') || ''}
                </Typo14>
              </S.LineWrapper>
              <S.LineWrapper>
                <Typo14 $weight='700'>산책 횟수</Typo14>
                <Typo14 $weight='700' $color='default'>
                  {firstMember.totalWalkCount}
                </Typo14>
              </S.LineWrapper>
            </S.FamilyInfoArea>
            <S.EditIconWrapper onClick={onClickMemberUpdate}>
              <MdOutlineModeEdit size={20} />
            </S.EditIconWrapper>
          </S.ProfileOneArea>
        )}
      </S.FamilySection>
      <S.InviteSection>
        <Typo15 $weight='700'>밤톨이와 함께할 동반자를 초대하세요!</Typo15>
        <S.InviteBtn onClick={onClickCodeShare}>
          <Typo14 $weight='700'>초대</Typo14>
        </S.InviteBtn>
      </S.InviteSection>

      <CountSection walkCount={80} totalDistance={204} gangCount={30} />
    </S.FamilyDDang>
  )
}
