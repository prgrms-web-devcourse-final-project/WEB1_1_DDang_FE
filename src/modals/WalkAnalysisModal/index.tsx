import { useEffect, useRef, Suspense } from 'react'
import Prev from '~assets/prev.svg'
import { useModalStore } from '~stores/modalStore'
import { createBarChart, createLineChart } from './createChart'
import * as S from './styles'
import { FamilyMemberWalk } from '~apis/log/fetchFamilyYearlyWalks'
import Statistics from './components/Statistics'
import { useCurrentMonthWalks, useFamilyWalks, useMonthlyWalks, useTotalWalks } from '~pages/LogPage/useWalkInfo'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~components/ErrorFallback'
import Loader from '~components/Loader'

interface ChartData {
  month: string
  value: number
}

interface FamilyChartData {
  name: string
  familyPosition: string
  value: number
}

const formatMonthlyData = (data: number[]): ChartData[] =>
  data.map((value, index) => ({
    month: `${index + 1}월`,
    value,
  }))

const formatFamilyData = (data: FamilyMemberWalk[]): FamilyChartData[] =>
  data.map(({ name, familyRole, count }) => ({
    name: name,
    familyPosition: familyRole,
    value: count,
  }))

export default function WalkAnalysisModal() {
  const { popModal } = useModalStore()
  const lineChartRef = useRef<SVGSVGElement | null>(null)
  const barChartRef = useRef<SVGSVGElement | null>(null)

  const { data: monthlyWalks } = useMonthlyWalks()
  const { data: familyWalks } = useFamilyWalks()
  const { data: totalWalks } = useTotalWalks()
  const { data: currentMonthWalks } = useCurrentMonthWalks()

  useEffect(() => {
    if (lineChartRef.current && monthlyWalks) {
      createLineChart(lineChartRef.current, formatMonthlyData(monthlyWalks))
    }

    if (barChartRef.current && familyWalks) {
      createBarChart(barChartRef.current, formatFamilyData(familyWalks))
    }
  }, [monthlyWalks, familyWalks])
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <Suspense fallback={<Loader />}>
            <S.Header>
              <S.PrevBtn src={Prev} alt='뒤로 가기' onClick={popModal} />
              <S.Title>산책 분석</S.Title>
            </S.Header>
            <S.WalkAnalysisModal>
              <S.ChartArea>
                <S.ChartWrapper>
                  <S.ChartTitle>올해 월 별 산책기록</S.ChartTitle>
                  <S.Chart ref={lineChartRef} width='100%' height='100%'></S.Chart>
                </S.ChartWrapper>
                <S.ChartWrapper>
                  <S.ChartTitle>올해 가족별 산책 횟수</S.ChartTitle>
                  <S.Chart ref={barChartRef} width='100%' height='100%'></S.Chart>
                </S.ChartWrapper>
              </S.ChartArea>
              <S.StatisticsArea>
                <Statistics title={'총 산책 내역'} stats={totalWalks} />
                <Statistics title={'이번달 통계'} stats={currentMonthWalks} />
              </S.StatisticsArea>
            </S.WalkAnalysisModal>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
