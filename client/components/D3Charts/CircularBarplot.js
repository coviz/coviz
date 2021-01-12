// set the dimensions and margins of the graph
import * as d3 from 'd3'

export function initGenderChart(height, width) {
  d3
    .select('#genderChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
  // .style('background-color', '#fff')
}
export function drawGenderChart(data) {
  const svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height'),
    innerRadius = 250,
    outerRadius = Math.min(width, height) * 0.45,
    g = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height * 0.5 + ')')
  // .attr('transform', 'translate(' + width / 1.6 + ',' + height * 0.5 + ')')

  const x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)

  const y = d3.scaleRadial().range([innerRadius, outerRadius])

  const z = d3.scaleOrdinal().range(['#fbff12', '#41ead4'])
  x.domain(
    data.map(function(d) {
      return d.state
    })
  )

  y.domain([
    0,
    d3.max(data, function(d) {
      return d.total
    })
  ])
  z.domain(['males', 'females'])

  g
    .append('g')
    .selectAll('g')
    .data(d3.stack().keys(['males', 'females'])(data))
    .enter()
    .append('g')
    .attr('fill', function(d) {
      return z(d.key)
    })
    .selectAll('path')
    .data(function(d) {
      return d
    })
    .enter()
    .append('path')
    .attr(
      'd',
      d3
        .arc()
        .innerRadius(function(d) {
          return y(d[0])
        })
        .outerRadius(function(d) {
          return y(d[1])
        })
        .startAngle(function(d) {
          return x(d.data.state)
        })
        .endAngle(function(d) {
          return x(d.data.state) + x.bandwidth()
        })
        .padAngle(0.01)
        .padRadius(innerRadius)
    )

  const label = g
    .append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('text-anchor', 'middle')
    .attr('transform', function(d) {
      return (
        'rotate(' +
        ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) +
        ')translate(' +
        innerRadius +
        ',0)'
      )
    })

  label
    .append('line')
    .attr('x2', -5)
    .attr('fill', '#F7D9C4')

  label
    .append('text')
    .attr('transform', function(d) {
      return (x(d.state) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) <
        Math.PI
        ? 'rotate(90)translate(0,16)'
        : 'rotate(-90)translate(0,-9)'
    })
    .text(function(d) {
      return d.state
    })
    .attr('fill', '#F7D9C4')

  const yAxis = g.append('g').attr('text-anchor', 'end')

  const yTick = yAxis
    .selectAll('g')
    .data(y.ticks(10).slice(1))
    .enter()
    .append('g')

  yTick
    .append('circle')
    .attr('fill', 'none')
    .attr('stroke', '#F7D9C4')
    .attr('stroke-opacity', 0.5)
    .attr('r', y)

  yTick
    .append('text')
    .attr('x', -6)
    .attr('y', function(d) {
      return -y(d)
    })
    .attr('dy', '0.35em')
    .attr('fill', '#F7D9C4')
    .attr('stroke', '#F7D9C4f')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .text(y.tickFormat(10, 's'))

  yTick
    .append('text')
    .attr('x', -6)
    .attr('y', function(d) {
      return -y(d)
    })
    .attr('dy', '0.35em')
    .text(y.tickFormat(10, 's'))
    .attr('fill', '#F7D9C4')

  yAxis
    .append('text')
    .attr('x', -6)
    .attr('y', function(d) {
      return -y(y.ticks(10).pop())
    })
    .attr('dy', '-1em')
    // .attr('dx', '2em')
    .text('Population')
    .attr('fill', '#F7D9C4')

  const legend = g
    .append('g')
    .selectAll('g')
    .data(['Females', 'Males'].reverse())
    .enter()
    .append('g')
    .attr('transform', function(d, i) {
      return 'translate(-40,' + (i - (3 - 1) / 2) * 20 + ')'
    })
    .attr('fill', '#F7D9C4')

  legend
    .append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', z)

  legend
    .append('text')
    .attr('x', 24)
    .attr('y', 9)
    .attr('dy', '0.35em')
    .text(function(d) {
      return d
    })
}
