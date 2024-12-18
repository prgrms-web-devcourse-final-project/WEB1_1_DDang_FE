import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet-async'
import { useHomePageData } from '~apis/main/useHomePageData'
import useInfiniteNotificationList from '~apis/notification/useInfiniteNotificationList'
import DogHand from '~assets/dog_hand.svg?react'
import BellIcon from '~assets/icons/bell_icon.svg?react'
import ClockIcon from '~assets/icons/clock_icon.svg?react'
import GPSIcon from '~assets/icons/gps_icon.svg?react'
import { ActionButton } from '~components/Button/ActionButton'
import ErrorFallback from '~components/ErrorFallback'
import PageLoader from '~components/PageLoader'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo14, Typo17, Typo24 } from '~components/Typo'
import { FAMILY_ROLE } from '~constants/familyRole'
import NotificationModal from '~modals/NotificationModal'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'
import { getParticle } from '~utils/getParticle'

function HomeContent() {
  const {
    data: { pages: notificationListPages },
  } = useInfiniteNotificationList()
  const { data } = useHomePageData()
  const { pushModal } = useModalStore()
  const unreadNotificationCount = notificationListPages.reduce((count, page) => {
    return count + page.data.content.filter(noti => noti.isRead === 'FALSE').length
  }, 0)

  return (
    <>
      <S.Header>
        <Profile $size={32} $src={data?.memberProfileImgUrl || ''} />
        <S.BellIconWrapper>
          <BellIcon cursor='pointer' onClick={() => pushModal(<NotificationModal />)} />
          {unreadNotificationCount ? <S.UnreadCircle /> : null}
        </S.BellIconWrapper>
      </S.Header>
      <S.Visual>
        <Typo24 $weight='700' $textAlign='center'>
          오늘은{' '}
          <Typo24 as='span' $color='default' $weight='700'>
            {FAMILY_ROLE[data?.familyRole]}
          </Typo24>
          {getParticle(FAMILY_ROLE[data?.familyRole])}
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
  return (
    <S.HomePage>
      <Helmet>
        <title>DDang | 반려견 산책 서비스</title>
        <meta name='description' content='반려견과 함께하는 즐거운 산책, DDang.' />
      </Helmet>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
            <Suspense fallback={<PageLoader />}>
              <HomeContent />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </S.HomePage>
  )
}
