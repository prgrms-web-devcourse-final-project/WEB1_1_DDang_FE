import { useState, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import GraphIcon from '~/assets/graph.svg'
import NoWalkSummaryImg from '~/assets/no-walk-summary.svg'
import NoWalkSummaryImg2 from '~/assets/no-walk-summary2.svg'
import Header from '~components/Header'
import WalkAnalysisModal from '~modals/WalkAnalysisModal'
import { useModalStore } from '~stores/modalStore'
import { formatTime } from '~utils/dateFormat'
import Calendar from './components/Calendar'
import WalkSummary from './components/WalkSummary'
import * as S from './styles'
import { useWalkDetail } from './useWalkInfo'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~components/ErrorFallback'
import PageLoader from '~components/PageLoader'

export default function LogPage() {
  const images = [NoWalkSummaryImg, NoWalkSummaryImg2]
  const randomImage = images[Math.floor(Math.random() * images.length)]
  const { pushModal } = useModalStore()
  const [date, setDate] = useState<Date>(new Date())
  const { data: walkDetails } = useWalkDetail(date)

  return (
    <S.LogPage>
      <Helmet>
        <title>DDang | 산책 기록</title>
        <meta name='description' content='반려견과의 소중한 산책 기록을 확인하세요.' />
      </Helmet>
      <Header type={'sm'}>
        <S.ProfileImg src='test.svg' alt='프로필 사진' />
        <S.DogName>밤톨이 일기</S.DogName>
        <S.GraphImage src={GraphIcon} alt='산책 기록 그래프' onClick={() => pushModal(<WalkAnalysisModal />)} />
      </Header>
      <S.CalendarWrapper>
        <Calendar date={date} setDate={setDate} />
      </S.CalendarWrapper>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
            <Suspense fallback={<PageLoader />}>
              <S.WalkSummaryWrapper>
                {walkDetails?.map(walkDetail => (
                  <WalkSummary
                    key={walkDetail.walkId}
                    profileImg={walkDetail.profileImg}
                    userName={walkDetail.name}
                    walkPhoto={walkDetail.walkImg}
                    walkDuration={formatTime(
                      walkDetail.timeDuration.hours,
                      walkDetail.timeDuration.minutes,
                      walkDetail.timeDuration.seconds
                    )}
                    walkDistance={Number((walkDetail.totalDistanceMeter / 1000).toFixed(2))}
                    calories={walkDetail.totalCalorie}
                  />
                ))}
                {!walkDetails?.length && (
                  <S.NoWalkSummary>
                    <img src={randomImage} alt='산책 기록 없음' />
                    <p>산책 기록이 없어요</p>
                  </S.NoWalkSummary>
                )}
              </S.WalkSummaryWrapper>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </S.LogPage>
  )
}
