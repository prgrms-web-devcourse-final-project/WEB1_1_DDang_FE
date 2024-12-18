import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProfile } from '~apis/member/useFetchProfile'
import DogProfile from '~components/DogProfile'
import ErrorFallback from '~components/ErrorFallback'
import PageLoader from '~components/PageLoader'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo13, Typo15, Typo20, Typo24 } from '~components/Typo'
import { FAMILY_ROLE } from '~constants/familyRole'
import * as S from './styles'

function ProfileContent({ id }: { id: number }) {
  const { data } = useFetchProfile(+id)
  const navigate = useNavigate()

  return (
    <S.ProfilePage>
      <Helmet>
        <title>{`DDang | ${data?.name}`}</title>
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
          <Typo13 $weight='700'>{data ? FAMILY_ROLE[data.familyRole as keyof typeof FAMILY_ROLE] : ''}</Typo13>
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

      {data && <DogProfile dogProfile={data.dog} />}
    </S.ProfilePage>
  )
}

export default function ProfilePage() {
  const { id = '0' } = useParams()

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <Suspense fallback={<PageLoader />}>
            <ProfileContent id={+id} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
