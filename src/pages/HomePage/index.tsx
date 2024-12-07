import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet-async'
import BellIcon from '~assets/icons/bell_icon.svg?react'
import GPSIcon from '~assets/icons/gps_icon.svg?react'
import ClockIcon from '~assets/icons/clock_icon.svg?react'
import { useHomePageData } from '~apis/main/useHomePageData'
import DogHand from '~assets/dog_hand.svg?react'
import { ActionButton } from '~components/Button/ActionButton'
import ErrorFallback from '~components/ErrorFallback'
import Loader from '~components/Loader'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo14, Typo17, Typo24 } from '~components/Typo'
import { FAMILY_ROLE } from '~constants/familyRole'
import NotificationModal from '~modals/NotificationModal'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function HomeContent() {
  const { data } = useHomePageData()
  console.log(data)
  const { pushModal } = useModalStore()
  return (
    <>
      <S.Header>
        <Profile $size={32} $src={data?.memberProfileImgUrl || ''} />
        <BellIcon cursor='pointer' onClick={() => pushModal(<NotificationModal />)} />
      </S.Header>

      <S.Visual>
        <Typo24 $weight='700' $textAlign='center'>
          오늘은 {data && FAMILY_ROLE[data.familyRole as keyof typeof FAMILY_ROLE]}랑
        </Typo24>
        <Typo24 $weight='700' $textAlign='center'>
          산책가는 날!
        </Typo24>
      </S.Visual>

      <S.CharacterWrapper>
        <DogHand />
      </S.CharacterWrapper>

      <S.WalkInfoArea>
        <Typo17 $weight='700'>
          오늘 {data?.dogName}가&nbsp;
          <Typo17 as='span' $weight='700' $color='default'>
            {data?.totalCalorie}
          </Typo17>
          kcal 소비했어요!
        </Typo17>
        <S.WalkInfoWrapper>
          <S.WalkTime>
            <ClockIcon style={{ marginRight: 6 }} />
            <Typo14 $weight='700'>산책 시간&nbsp;</Typo14>
            <Typo14 $color='default' $weight='700'>
              {data?.timeDuration.hours}시간
              {data?.timeDuration.minutes}분
            </Typo14>
          </S.WalkTime>
          <Separator $height={20} />
          <S.WalkDistance>
            <GPSIcon style={{ marginRight: 6 }} />
            <Typo14 $weight='700'>산책한 거리&nbsp;</Typo14>{' '}
            <Typo14 as='span' color='default' $weight='700'>
              {data && (data.totalDistanceMeter / 100).toFixed(1)}km
            </Typo14>
          </S.WalkDistance>
        </S.WalkInfoWrapper>
      </S.WalkInfoArea>
      <ActionButton $fontWeight='700' $type='roundedRect'>
        산책 시작하기
      </ActionButton>
    </>
  )
}

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (accessToken) {
      localStorage.setItem('token', accessToken)
      console.log('토큰 가져옴(숨김처리 예정) : ', accessToken)
      //URL에서 토큰 파라미터 제거하고 홈페이지로 리다이렉트, JWT토큰이 URL에 노출되어 히스토리에 남지 않게 함
      window.history.replaceState({}, '', '/')
      return
    }
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      console.log('토큰 없음 비로그인 상태. login페이지 이동.')
      navigate('/login')
    }
  }, [searchParams, navigate])
  return (
    <S.HomePage>
      <Helmet>
        <title>DDang | 반려견 산책 서비스</title>
        <meta name='description' content='반려견과 함께하는 즐거운 산책, DDang.' />
      </Helmet>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <HomeContent />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </S.HomePage>
  )
}
