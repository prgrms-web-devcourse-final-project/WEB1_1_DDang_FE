import * as S from './styles'
import { Typo13, Typo15, Typo20 } from '~components/Typo'
import { Separator } from '~components/Separator'
import { fetchMypage, GetDogInfoResponse } from '~apis/myPage/fetchMypage'
import { APIResponse } from '~types/api'
import Profile from '~components/Profile'
import { useQuery } from '@tanstack/react-query'
export default function DogProfile() {
  const { data } = useQuery<APIResponse<GetDogInfoResponse>>({
    queryKey: ['myPage'],
    queryFn: fetchMypage,
  })

  const dogInfo = data?.data?.dog

  return (
    <S.DogInfoArea>
      <S.DogInfoWrapper>
        <Profile $size={80} $src={dogInfo?.profileImg} />
        <S.DogDetailWrapper>
          <S.TypoWrapper>
            <Typo20 $weight='700'>{dogInfo?.name}</Typo20>
            <Typo15 $weight='400'>{dogInfo?.breed}</Typo15>
            <Separator $height={8} />
            {/* birthDate를 나이로 변환하는 로직 필요 */}
            <Typo15 $weight='400'>{dogInfo?.birthDate}살</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{dogInfo?.gender === 'MALE' ? '남' : '여'}</Typo15>
          </S.TypoWrapper>
          <S.TypoWrapper>
            <Typo13>중성화 {dogInfo?.isNeutered === 'TRUE' ? 'O' : 'X'}</Typo13>
            <Separator $height={8} />
            <Typo13>{dogInfo?.weight}KG</Typo13>
          </S.TypoWrapper>
        </S.DogDetailWrapper>
      </S.DogInfoWrapper>

      <S.OneLineIntro>
        <Typo15 $weight='700' $color='default'>
          우리 댕댕이를 소개해요!
        </Typo15>
        <Typo13 $weight='500' style={{ lineHeight: 1.2 }}>
          {dogInfo?.comment}
        </Typo13>
      </S.OneLineIntro>
    </S.DogInfoArea>
  )
}