import { useEffect, useRef, useState } from 'react'
import { fetchCurrentMonthWalks } from '~apis/log/fetchCurrentMonthWalks'
import { fetchFamilyYearlyWalks } from '~apis/log/fetchFamilyYearlyWalks'
import { fetchMonthlyWalks } from '~apis/log/fetchMonthlyWalks'
import { fetchTotalWalkRecords } from '~apis/log/fetchTotalWalkRecords'
import Prev from '~assets/prev.svg'
import { useModalStore } from '~stores/modalStore'
import { createBarChart, createLineChart } from './createChart'
import * as S from './styles'
import { FamilyMemberWalk } from '~apis/log/fetchFamilyYearlyWalks'
import Statistics from './components/Statistics'

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
  const [walkStats, setWalkStats] = useState({
    total: {
      timeDuration: { hours: 0, minutes: 0, seconds: 0 },
      walkCount: 0,
      totalDistanceKilo: 0,
    },
    monthly: {
      timeDuration: { hours: 0, minutes: 0, seconds: 0 },
      walkCount: 0,
      totalDistanceKilo: 0,
    },
  })

  useEffect(() => {
    const fetchAndCreateCharts = async () => {
      try {
        const [monthlyWalks, familyWalks, totalWalks, currentMonthWalks] = await Promise.all([
          fetchMonthlyWalks(),
          fetchFamilyYearlyWalks(),
          fetchTotalWalkRecords(),
          fetchCurrentMonthWalks(),
        ])
        console.log(familyWalks.data)

        setWalkStats({
          total: totalWalks.data,
          monthly: currentMonthWalks.data,
        })

        if (lineChartRef.current) {
          createLineChart(lineChartRef.current, formatMonthlyData(monthlyWalks.data))
        }

        if (barChartRef.current) {
          createBarChart(barChartRef.current, formatFamilyData(familyWalks.data))
        }
      } catch (error) {
        console.error('차트 데이터 로딩 실패:', error)
      }
    }

    fetchAndCreateCharts()
  }, [])

  return (
    <>
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
          <Statistics title={'총 산책 내역'} stats={walkStats.total} />
          <Statistics title={'이번달 통계'} stats={walkStats.monthly} />
        </S.StatisticsArea>
      </S.WalkAnalysisModal>
    </>
  )
}
