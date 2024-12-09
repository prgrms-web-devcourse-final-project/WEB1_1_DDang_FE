import * as S from './styles'
import { useQuery } from '@tanstack/react-query'
import { fetchFamilyDDang, FetchFamilyDDangResponse } from '~apis/family/fetchFamilyDDang'
import { APIResponse } from '~types/api'

export default function WalkCountArea() {
  const { data } = useQuery<APIResponse<FetchFamilyDDangResponse>>({
    queryKey: ['familyList'],
    queryFn: fetchFamilyDDang,
  })
  const totalCalorie = data?.data?.totalCalorie
  const totalDistanceInKilometers = data?.data?.totalDistanceInKilometers
  const totalWalkCount = data?.data?.totalWalkCount

  return (
    <S.CountSection>
      <S.CountArea>
        <S.CountWrapperBig>{totalCalorie}회</S.CountWrapperBig>
        <S.CountWrapperSmall>누적 산책 횟수</S.CountWrapperSmall>
      </S.CountArea>

      <S.CountArea>
        <S.CountWrapperBig>{totalDistanceInKilometers}km</S.CountWrapperBig>
        <S.CountWrapperSmall>총 산책거리</S.CountWrapperSmall>
      </S.CountArea>

      <S.CountArea>
        <S.CountWrapperBig>{totalWalkCount}kcal</S.CountWrapperBig>
        <S.CountWrapperSmall>소요 칼로리</S.CountWrapperSmall>
      </S.CountArea>
    </S.CountSection>
  )
}
