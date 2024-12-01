import { useRef, useEffect } from 'react'
import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import Prev from '~assets/prev.svg'
import { createBarChart, createLineChart } from './createChart'

const barChartDummydata = [
  { name: '나', value: 2 },
  { name: '누나', value: 4 },
  { name: '엄마', value: 5 },
  { name: '아빠', value: 2 },
  { name: '할아버지', value: 1 },
]

const lineChartData = [
  { month: '1월', value: 0 },
  { month: '2월', value: 3 },
  { month: '3월', value: 2 },
  { month: '4월', value: 3 },
  { month: '5월', value: 4 },
  { month: '6월', value: 3 },
  { month: '7월', value: 3 },
  { month: '8월', value: 1 },
  { month: '9월', value: 4 },
  { month: '10월', value: 5 },
  { month: '11월', value: 4 },
  { month: '12월', value: 3 },
]

export default function WalkAnalysisModal() {
  const { popModal } = useModalStore()
  const lineChartRef = useRef<SVGSVGElement | null>(null)
  const barChartRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (lineChartRef.current) createLineChart(lineChartRef.current, lineChartData)
    if (barChartRef.current) createBarChart(barChartRef.current, barChartDummydata)
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
                <strong>20:00:00</strong>
              </div>
              <div>
                <p>산책 기록</p>
                <strong>120회</strong>
              </div>
              <div>
                <p>산책 거리</p>
                <strong>1200km</strong>
              </div>
            </div>
          </S.Statistics>
          <S.Statistics>
            <h3>이번달 통계</h3>
            <div>
              <div>
                <p>산책 시간</p>
                <strong>20:00:00</strong>
              </div>
              <div>
                <p>산책 기록</p>
                <strong>120회</strong>
              </div>
              <div>
                <p>산책 거리</p>
                <strong>1200km</strong>
              </div>
            </div>
          </S.Statistics>
        </S.StatisticsArea>
      </S.WalkAnalysisModal>
    </>
  )
}
