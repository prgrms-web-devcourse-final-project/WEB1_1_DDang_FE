import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProfile } from '~apis/member/useFetchProfile'
import DogProfile from '~components/DogProfile'
import Loader from '~components/Loader'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo13, Typo15, Typo20, Typo24 } from '~components/Typo'
import { FAMILY_ROLE } from '~constants/familyRole'
import * as S from './styles'
import { Helmet } from 'react-helmet-async'

export default function ProfilePage() {
  const { id = '0' } = useParams()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useFetchProfile(+id)

  if (isLoading) return <Loader />
  if (isError) return <div>Error fetching profile</div>

  return (
    <S.ProfilePage>
      <Helmet>
        <title>DDang | {data?.name}</title>
        <meta name='description' content={`${data?.name}님의 프로필 정보와 반려견을 확인하세요.`} />
      </Helmet>
      <S.Header type='sm' prevBtn onClickPrev={() => navigate(-1)} title={data?.name} />

      <S.ProfileArea>
        <Profile $size={140} $src={data?.profileImg || ''} />
        <Typo24 $weight='800'>{data?.name}</Typo24>
        <Typo15 $weight='500' $color='font_2'>
          {data?.address} 거주
        </Typo15>
        <S.TypoWrapper $gap={8}>
          <Typo13 $weight='700'>{data?.gender === 'MALE' ? '남자' : '여자'}</Typo13>
          <Separator $height={8} />
          <Typo13 $weight='700'>{data ? FAMILY_ROLE[data.familyRole] : ''}</Typo13>
        </S.TypoWrapper>
      </S.ProfileArea>

      <S.WalkInfoArea>
        <S.WalkInfoWrapper>
          <Typo20 $weight='800'>{data?.walkCount}회</Typo20>
          <Typo13 $weight='500'>누적 산책 횟수</Typo13>
        </S.WalkInfoWrapper>
        <S.WalkInfoWrapper>
          <Typo20 $weight='800'>{data?.totalDistance}km</Typo20>
          <Typo13 $weight='500'>총 산책 거리</Typo13>
        </S.WalkInfoWrapper>
        <S.WalkInfoWrapper>
          <Typo20 $weight='800'>{data?.countWalksWithMember}회</Typo20>
          <Typo13 $weight='500'>강번따 횟수</Typo13>
        </S.WalkInfoWrapper>
      </S.WalkInfoArea>

      {data && <DogProfile {...data.dog} />}
    </S.ProfilePage>
  )
}
