import * as S from './styles'
import { MdOutlineEditLocation } from 'react-icons/md'
import { Typo14, Typo15, Typo17 } from '~components/Typo'
import { MdOutlineModeEdit } from 'react-icons/md'
import CountSection from '~components/WalkCountArea'
import { Avatar10, Avatar3 } from '~assets/avatars'
import Profile from '~components/Profile'
import DogProfile from '~components/DogProfile'
import { useQuery } from '@tanstack/react-query'
import { fetchMypage, FetchMypageResponse } from '~apis/myPage/fetchMypage'
import { APIResponse } from '~types/api'
import { useModalStore } from '~stores/modalStore'
import ShareCodeModal from '~modals/FamilyDDangModal/ShareCodeModal'
import OwnerUpdateModal from '~modals/OwnerUpdateModal'

export default function FamilyDDang() {
  const { data } = useQuery<APIResponse<FetchMypageResponse>>({
    queryKey: ['myPage'],
    queryFn: fetchMypage,
  })
  const dogInfo = data?.data?.dog

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

      {dogInfo && (
        <DogProfile
          name={dogInfo.name}
          gender={dogInfo.gender}
          profileImg={dogInfo.profileImg}
          birthDate={dogInfo.birthDate}
          breed={dogInfo.breed}
          comment={dogInfo.comment}
          isNeutered={dogInfo.isNeutered}
          weight={dogInfo.weight}
        />
      )}
      <S.FamilySection>
        <S.ProfileOneArea>
          <Profile $size={64} $src={Avatar10} userId={1} />
          <S.FamilyInfoArea>
            <S.LineWrapper>
              <Typo17 $weight='700'>{family1Info.nickName}</Typo17>
              <Typo14 $weight='400'>
                {family1Info.gender} | {family1Info.position}
              </Typo14>
            </S.LineWrapper>
            <S.LineWrapper>
              <Typo14 $weight='700'>산책 시간</Typo14>
              <Typo14 $weight='700' $color='default'>
                {family1Info.week}
              </Typo14>
              <Typo14 $weight='700' $color='default'>
                {family1Info.time}
              </Typo14>
            </S.LineWrapper>
            <S.LineWrapper>
              <Typo14 $weight='700'>산책 횟수</Typo14>
              <Typo14 $weight='700' $color='default'>
                {family1Info.count}
              </Typo14>
            </S.LineWrapper>
          </S.FamilyInfoArea>
          <S.EditIconWrapper onClick={onClickMemberUpdate}>
            <MdOutlineModeEdit size={20} />
          </S.EditIconWrapper>
        </S.ProfileOneArea>
        <S.ProfileOneArea>
          <Profile $size={64} $src={Avatar3} userId={1} />
          <S.FamilyInfoArea>
            <S.LineWrapper>
              <Typo17 $weight='700'>{family2Info.nickName}</Typo17>
              <Typo14 $weight='400'>
                {family2Info.gender} | {family2Info.position}
              </Typo14>
            </S.LineWrapper>
            <S.LineWrapper>
              <Typo14 $weight='700'>산책 시간</Typo14>
              <Typo14 $weight='700' $color='default'>
                {family2Info.week}
              </Typo14>
              <Typo14 $weight='700' $color='default'>
                {family2Info.time}
              </Typo14>
            </S.LineWrapper>
            <S.LineWrapper>
              <Typo14 $weight='700'>산책 횟수</Typo14>
              <Typo14 $weight='700' $color='default'>
                {family2Info.count}
              </Typo14>
            </S.LineWrapper>
          </S.FamilyInfoArea>
        </S.ProfileOneArea>
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
const family1Info = {
  nickName: '원돌이',
  gender: '여자',
  position: '엄마',
  week: '월, 수, 금',
  time: '10:00',
  count: '8',
}
const family2Info = {
  nickName: '투돌이',
  gender: '남자',
  position: '형',
  week: '화, 토',
  time: '17:00',
  count: '23',
}
