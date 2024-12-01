import * as d3 from 'd3'

export function createBarChart(svgElement: SVGSVGElement, data: { name: string; value: number }[]) {
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
