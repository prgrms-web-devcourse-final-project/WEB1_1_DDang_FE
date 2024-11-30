import * as S from './styles'
import { MdOutlineEditLocation } from 'react-icons/md'
import { Typo14, Typo15, Typo17 } from '~components/Typo'
import { MdOutlineModeEdit } from 'react-icons/md'
import CountSection from '~components/WalkCountArea'
import { Avatar10, Avatar3 } from '~assets/avatars'
import Profile from '~components/Profile'

export default function FamilyDDang() {
  return (
    <S.FamilyDDang>
      <S.Header type='sm' title='패밀리댕'>
        <S.IconWrapper>
          <MdOutlineEditLocation cursor='pointer' size={28} />
        </S.IconWrapper>
      </S.Header>

      <S.FamilySection>
        <S.ProfileOneArea>
          <Profile $size={64} $src={Avatar10} userId='temp-user-id' />
          <S.FamilyInfoArea>
            <S.LineWrapper>
              <Typo17 $weight='700'>닉네임</Typo17>
              <Typo14 $weight='400'>여자 | 고모</Typo14>
            </S.LineWrapper>
            <S.LineWrapper>
              <Typo14 $weight='700'>산책 시간</Typo14>
              <Typo14 $weight='700' $color='default'>
                월, 금
              </Typo14>
            </S.LineWrapper>
            <S.LineWrapper>
              <Typo14 $weight='700'>산책 횟수</Typo14>
              <Typo14 $weight='700' $color='default'>
                4회
              </Typo14>
            </S.LineWrapper>
          </S.FamilyInfoArea>
          <S.EditIconWrapper>
            <MdOutlineModeEdit size={20} />
          </S.EditIconWrapper>
        </S.ProfileOneArea>
        <S.ProfileOneArea>
          <Profile $size={64} $src={Avatar3} userId='temp-user-id' />
          <S.FamilyInfoArea>
            <S.LineWrapper>
              <Typo17 $weight='700'>닉네임</Typo17>
              <Typo14 $weight='400'>여자 | 고모</Typo14>
            </S.LineWrapper>
            <S.LineWrapper>
              <Typo14 $weight='700'>산책 시간</Typo14>
              <Typo14 $weight='700' $color='default'>
                월, 금
              </Typo14>
            </S.LineWrapper>
            <S.LineWrapper>
              <Typo14 $weight='700'>산책 횟수</Typo14>
              <Typo14 $weight='700' $color='default'>
                4회
              </Typo14>
            </S.LineWrapper>
          </S.FamilyInfoArea>
        </S.ProfileOneArea>
      </S.FamilySection>
      <S.InviteSection>
        <Typo15 $weight='700'>밤톨이와 함께할 동반자를 초대하세요!</Typo15>
        <S.InviteBtn>
          <Typo14 $weight='700'>초대</Typo14>
        </S.InviteBtn>
      </S.InviteSection>

      <CountSection walkCount={80} totalDistance={204} gangCount={30} />
    </S.FamilyDDang>
  )
}
