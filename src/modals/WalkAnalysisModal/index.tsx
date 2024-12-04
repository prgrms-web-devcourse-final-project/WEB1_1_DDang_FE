import { useEffect, useRef, useState } from 'react'
import { fetchCurrentMonthWalks } from '~apis/log/fetchCurrentMonthWalks'
import { fetchFamilyYearlyWalks } from '~apis/log/fetchFamilyYearlyWalks'
import { fetchMonthlyWalks } from '~apis/log/fetchMonthlyWalks'
import { fetchTotalWalkRecords } from '~apis/log/fetchTotalWalkRecords'
import Prev from '~assets/prev.svg'
import { useModalStore } from '~stores/modalStore'
import { createBarChart, createLineChart } from './createChart'
import * as S from './styles'
import { formatTime } from '~utils/dateFormat'
interface FamilyMemberWalk {
  memberId: number
  familyRole: string
  count: number
}

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
  data.map(({ familyRole, count }, index) => ({
    name: '이름' + index,
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
          <S.Statistics>
            <h3>총 산책 내역</h3>
            <div>
              <div>
                <p>산책 시간</p>
                <strong>
                  {formatTime(
                    walkStats.total.timeDuration.hours,
                    walkStats.total.timeDuration.minutes,
                    walkStats.total.timeDuration.seconds
                  )}
                </strong>
              </div>
              <div>
                <p>산책 기록</p>
                <strong>{walkStats.total.walkCount}회</strong>
              </div>
              <div>
                <p>산책 거리</p>
                <strong>{walkStats.total.totalDistanceKilo}km</strong>
              </div>
            </div>
          </S.Statistics>
          <S.Statistics>
            <h3>이번달 통계</h3>
            <div>
              <div>
                <p>산책 시간</p>
                <strong>
                  {formatTime(
                    walkStats.monthly.timeDuration.hours,
                    walkStats.monthly.timeDuration.minutes,
                    walkStats.monthly.timeDuration.seconds
                  )}
                </strong>
              </div>
              <div>
                <p>산책 기록</p>
                <strong>{walkStats.monthly.walkCount}회</strong>
              </div>
              <div>
                <p>산책 거리</p>
                <strong>{walkStats.monthly.totalDistanceKilo}km</strong>
              </div>
            </div>
          </S.Statistics>
        </S.StatisticsArea>
      </S.WalkAnalysisModal>
    </>
  )
}
