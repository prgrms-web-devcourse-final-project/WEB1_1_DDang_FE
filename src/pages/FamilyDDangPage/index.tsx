import * as S from './styles'
import { MdOutlineEditLocationAlt } from 'react-icons/md'
import { MdOutlineEditLocation } from 'react-icons/md'
import { MdEditLocationAlt } from 'react-icons/md'
import { Typo14, Typo15, Typo17, Typo24 } from '~components/Typo'
import { Box } from '~components/Box'
import { MdOutlineModeEdit } from 'react-icons/md'

export default function FamilyDDang() {
  return (
    <S.FamilyDDang>
      <S.StyledHeader type='sm' title='패밀리댕'>
        <MdOutlineEditLocationAlt cursor='pointer' size={28} />
      </S.StyledHeader>

      <S.FamilySection>
        <S.PhotoArea></S.PhotoArea>
        <S.FamilyInfoArea>
          <S.FirstLineWrapper>
            <S.Nickname>닉네임</S.Nickname>
            <S.Role></S.Role>
          </S.FirstLineWrapper>
          <S.SecondLineWrapper>
            <S.WalkTime1></S.WalkTime1>
            <S.WalkTime2></S.WalkTime2>
          </S.SecondLineWrapper>
          <S.ThirdLineWrapper>
            <S.WalkCnt1></S.WalkCnt1>
            <S.WalkCnt2></S.WalkCnt2>
          </S.ThirdLineWrapper>
        </S.FamilyInfoArea>
        <S.EditIcon>
          <MdOutlineModeEdit />
        </S.EditIcon>
      </S.FamilySection>

      <S.InviteSection>
        <Typo15 $weight='700'>밤톨이와 함께할 동반자를 초대하세요!</Typo15>
        <S.InviteBtn>
          <Typo14 $weight='700'>초대</Typo14>
        </S.InviteBtn>
      </S.InviteSection>
      <S.CountSection></S.CountSection>
    </S.FamilyDDang>
  )
}
