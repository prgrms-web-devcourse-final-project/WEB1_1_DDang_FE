import * as S from './styles'

interface CountSectionProps {
  walkCount: number
  totalDistance: number
  gangCount: number
}

export default function WalkCountArea({ walkCount, totalDistance, gangCount }: CountSectionProps) {
  return (
    <S.CountSection>
      <S.CountArea>
        <S.CountWrapperBig>{walkCount}회</S.CountWrapperBig>
        <S.CountWrapperSmall>누적 산책 횟수</S.CountWrapperSmall>
      </S.CountArea>

      <S.CountArea>
        <S.CountWrapperBig>{totalDistance}km</S.CountWrapperBig>
        <S.CountWrapperSmall>총 산책거리</S.CountWrapperSmall>
      </S.CountArea>

      <S.CountArea>
        <S.CountWrapperBig>{gangCount}회</S.CountWrapperBig>
        <S.CountWrapperSmall>강번따 횟수</S.CountWrapperSmall>
      </S.CountArea>
    </S.CountSection>
  )
}
