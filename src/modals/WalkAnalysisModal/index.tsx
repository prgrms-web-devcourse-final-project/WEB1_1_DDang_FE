import { useRef, useEffect } from 'react'
import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import Prev from '~assets/prev.svg'
import { createBarChart } from './createChart'

const barChartDummydata = [
  { name: '나', value: 2 },
  { name: '누나', value: 4 },
  { name: '엄마', value: 5 },
  { name: '아빠', value: 2 },
  { name: '할아버지', value: 1 },
]

export default function WalkAnalysisModal() {
  const { popModal } = useModalStore()
  const lineChartRef = useRef<SVGSVGElement | null>(null)
  const barChartRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (barChartRef.current) {
      createBarChart(barChartRef.current, barChartDummydata)
    }
  }, [])

  return (
    <>
      <S.Header>
        <S.PrevBtn src={Prev} alt='뒤로 가기' onClick={popModal} />
        <S.Title>산책 분석</S.Title>
      </S.Header>
      <S.WalkAnalysisModal>
        <S.BarChartWrapper>
          <S.BarChartTitle>올해 월 별 산책기록</S.BarChartTitle>
          <svg ref={lineChartRef} width='100%' height='100%'></svg>
        </S.BarChartWrapper>
        <S.BarChartWrapper>
          <S.BarChartTitle>올해 가족별 산책 횟수</S.BarChartTitle>
          <svg ref={barChartRef} width='100%' height='100%'></svg>
        </S.BarChartWrapper>
      </S.WalkAnalysisModal>
    </>
  )
}
