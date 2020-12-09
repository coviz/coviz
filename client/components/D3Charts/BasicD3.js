import * as d3 from 'd3'

export function drawChart(height, width, data) {
  const svg = d3.select('#chart svg')

  let selection = svg.selectAll('rect').data(data)
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height - 100])

  selection
    .transition()
    .duration(300)
    .attr('height', d => yScale(d))
    .attr('y', d => height - yScale(d))

  selection
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 100)
    .attr('y', d => height)
    .attr('width', 80)
    .attr('height', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(300)
    .attr('height', d => yScale(d))
    .attr('y', d => height - yScale(d))

  selection
    .exit()
    .transition()
    .duration(300)
    .attr('y', d => height)
    .attr('height', 0)
    .remove()

  svg
    .append('text')
    .attr('class', 'y label')
    .attr('text-anchor', 'end')
    .attr('y', 6)
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .text('life expectancy (years)')

  svg
    .append('text')
    .attr('class', 'x label')
    .attr('text-anchor', 'end')
    .attr('x', width)
    .attr('y', height - 6)
    .text('Happiness Index')
}
export function initChart(height, width) {
  d3
    .select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black')
}
