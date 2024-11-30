import { styled } from 'styled-components'
import { Box } from '~components/Box'
import Header from '~components/Header'

export const FamilyDDang = styled.div`
  width: 375px;
  height: 698px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
`
export const StyledHeader = styled(Header)`
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
`
export const FamilyArea = styled(Box)`
  width: 335px;
  height: 420px;
  flex-shrink: 0;
`
export const FamilySection = styled.div`
  // 가족 정보 섹션 스타일
`

export const PhotoArea = styled.div`
  // 사진 영역 스타일
`

export const FamilyInfoArea = styled.div`
  // 가족 정보 영역 스타일
`

export const FirstLineWrapper = styled.div`
  // 첫 번째 줄 래퍼 스타일
`

export const Nickname = styled.span`
  // 닉네임 스타일
`

export const Role = styled.span`
  // 역할 스타일
`

export const SecondLineWrapper = styled.div`
  // 두 번째 줄 래퍼 스타일
`

export const WalkTime1 = styled.span`
  // 산책 시간 1 스타일
`

export const WalkTime2 = styled.span`
  // 산책 시간 2 스타일
`

export const ThirdLineWrapper = styled.div`
  // 세 번째 줄 래퍼 스타일
`

export const WalkCnt1 = styled.span`
  // 산책 횟수 1 스타일
`

export const WalkCnt2 = styled.span`
  // 산책 횟수 2 스타일
`

export const EditIcon = styled.div`
  // 편집 아이콘 스타일
`

export const InviteSection = styled.div`
  // 초대 섹션 스타일
`

export const InviteBtn = styled.button`
  // 초대 버튼 스타일
`

export const CountSection = styled.div`
  // 카운트 섹션 스타일
`
