import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import Prev from '~assets/prev.svg'

const barChartDummydata = [
  { name: '나', value: 2 },
  { name: '누나', value: 4 },
  { name: '엄마', value: 10 },
  { name: '아빠', value: 0 },
  { name: '할아버지', value: 1 },
]

export default function WalkAnalysisModal() {
  const { popModal } = useModalStore()
  const svgRef = useRef<SVGSVGElement | null>(null)

  const calculateBarWidth = (dataLength: number) => {
    return Math.max((5 - dataLength) * 16, 16)
  }
  const barWidth = calculateBarWidth(barChartDummydata.length)
  const maxValue = Math.max(...barChartDummydata.map(item => item.value)).toString()

  const createBarChart = () => {
    const svg = d3.select(svgRef.current)
    const width = svgRef.current?.clientWidth || 400
    const height = 237
    const margin = { top: 24, right: 0, bottom: 14, left: 25 + maxValue.length * 4 }

    svg.selectAll('*').remove()

    const xScale = d3
      .scaleBand()
      .domain(barChartDummydata.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(barChartDummydata, d => d.value) as number])
      .nice()
      .range([height - margin.bottom, margin.top])

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickFormat(d => `${d}회`)
          .tickSize(0)
          .tickPadding(7)
      )
      .selectAll('text')
      .style('font-size', '11px')
      .style('font-weight', 'bold')
      .style('font-family', 'SUIT, sans-serif')

    svg.select('.domain').remove()

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0).tickPadding(12))
      .style('font-size', '11px')
      .style('font-weight', 'bold')
      .style('font-family', 'SUIT, sans-serif')

    svg.select('.domain').attr('stroke', '#F1F1F5')

    yScale.ticks(5).forEach(tickValue => {
      svg
        .append('line')
        .attr('x1', margin.left)
        .attr('y1', yScale(tickValue))
        .attr('x2', width - margin.right)
        .attr('y2', yScale(tickValue))
        .attr('stroke', '#F1F1F5')
        .attr('stroke-width', 1)
    })

    svg
      .selectAll('.bar')
      .data(barChartDummydata)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => (xScale(d.name) as number) + (xScale.bandwidth() - barWidth) / 2)
      .attr('y', height - margin.bottom)
      .attr('width', barWidth)
      .attr('height', 0)
      .attr('fill', (_, i) => (i === 0 ? '#783D16' : '#ECB99A'))
      .transition()
      .duration(1000)
      .attr('y', d => yScale(d.value))
      .attr('height', d => height - margin.bottom - yScale(d.value))
  }

  useEffect(() => {
    createBarChart()
  }, [])

  return (
    <>
      <S.Header>
        <S.PrevBtn src={Prev} alt='뒤로 가기' onClick={popModal} />
        <S.Title>산책 분석</S.Title>
      </S.Header>
      <S.WalkAnalysisModal>
        <S.BarChartWrapper>
          <S.BarChartTitle>올해 가족별 산책 횟수</S.BarChartTitle>
          <S.BarChart ref={svgRef} width='100%' height='100%'></S.BarChart>
        </S.BarChartWrapper>
      </S.WalkAnalysisModal>
    </>
  )
}
