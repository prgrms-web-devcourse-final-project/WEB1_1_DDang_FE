import * as d3 from 'd3'
import { positionLabelMap } from '~utils/positionLabelMap'

export function createBarChart(
  svgElement: SVGSVGElement,
  data: { name: string; familyPosition: string; value: number }[]
) {
  const svg = d3.select(svgElement)
  const width = svgElement.clientWidth || 400
  const height = 237
  const maxValue = Math.max(...data.map(item => item.value)).toString()
  const margin = { top: 24, right: 0, bottom: 14, left: 25 + maxValue.length * 4 }

  svg.selectAll('*').remove()

  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value) as number])
    .nice()
    .range([height - margin.bottom, margin.top])

  const tickValues = Array.from(new Set(yScale.ticks(5).map(Math.round)))

  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(
      d3
        .axisLeft(yScale)
        .tickValues(tickValues)
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
    .call(d3.axisBottom(xScale).tickSize(0).tickPadding(15))
    .style('font-size', '11px')
    .style('font-weight', 'bold')
    .style('font-family', 'SUIT, sans-serif')
    .selectAll('.tick text')
    .each(function (d) {
      const text = d3.select(this)
      const name = d as string
      const position = data.find(item => item.name === d)?.familyPosition || ''

      text.text('')
      if (typeof name === 'string') {
        const truncatedName = name.length > 4 ? name.slice(0, 4) + '...' : name
        text.append('tspan').attr('x', 0).attr('dy', '0em').text(truncatedName)
      }
      text
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '12px')
        .text(`(${positionLabelMap[position as keyof typeof positionLabelMap]})`)
        .style('font-size', '9px')
    })

  svg.select('.domain').attr('stroke', '#F1F1F5')

  yScale.ticks(tickValues.length).forEach(tickValue => {
    svg
      .append('line')
      .attr('x1', margin.left)
      .attr('y1', yScale(tickValue))
      .attr('x2', width - margin.right)
      .attr('y2', yScale(tickValue))
      .attr('stroke', '#F1F1F5')
      .attr('stroke-width', 1)
  })

  const calculateBarWidth = (dataLength: number) => Math.max((5 - dataLength) * 16, 16)

  const barWidth = calculateBarWidth(data.length)

  svg
    .selectAll('.bar')
    .data(data)
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

export function createLineChart(svgElement: SVGSVGElement, data: { month: string; value: number }[]) {
  const svg = d3.select(svgElement)
  const width = svgElement.clientWidth || 400
  const height = svgElement.clientHeight || 237
  const maxValue = Math.max(...data.map(item => item.value)).toString()
  const margin = { top: 24, right: 12, bottom: 60, left: 21 + maxValue.length * 5 }

  svg.selectAll('*').remove()

  const xScale = d3
    .scalePoint()
    .domain(data.map(d => d.month))
    .range([margin.left, width - margin.right])

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value) as number])
    .nice()
    .range([height - margin.bottom, margin.top])

  const tickValues = Array.from(new Set(yScale.ticks(5).map(Math.round)))

  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(
      d3
        .axisLeft(yScale)
        .tickValues(tickValues)
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
    .selectAll('text')
    .style('font-size', '11px')
    .style('font-weight', 'bold')
    .style('font-family', 'SUIT, sans-serif')

  svg.select('.domain').attr('stroke', '#F1F1F5')

  yScale.ticks(tickValues.length).forEach(tickValue => {
    svg
      .append('line')
      .attr('x1', margin.left)
      .attr('y1', yScale(tickValue))
      .attr('x2', width - margin.right)
      .attr('y2', yScale(tickValue))
      .attr('stroke', '#F1F1F5')
      .attr('stroke-width', 1)
  })

  const line = d3
    .line<{ month: string; value: number }>()
    .x(d => xScale(d.month) as number)
    .y(d => yScale(d.value))

  const path = svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#ECB99A')
    .attr('stroke-width', 2)
    .attr('d', line)

  const totalLength = path.node()?.getTotalLength() || 0

  path
    .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
    .attr('stroke-dashoffset', totalLength)
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr('stroke-dashoffset', 0)

  svg
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('opacity', 0)
    .attr('cx', d => xScale(d.month) as number)
    .attr('cy', d => yScale(d.value))
    .attr('r', 4)
    .attr('fill', '#783D16')
    .transition()
    .duration(1000)
    .delay((_, i) => (i / data.length) * 800)
    .attr('opacity', 1)
}
