import * as d3 from 'd3'

export function drawGenderUnempChart(data, selected) {
  console.log('this is barplot data', data)
  let margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  // append the svg object to the body of the page
  let svg = d3
    .select('genderUnempChart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .style('border', '1px solid white')

  // Initialize the X axis
  let x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.2)
  let xAxis = svg.append('g').attr('transform', 'translate(0,' + height + ')')

  // Initialize the Y axis
  let y = d3.scaleLinear().range([height, 0])
  let yAxis = svg.append('g').attr('class', 'myYaxis')

  // X axis
  x.domain(
    data.map(function(d) {
      return d.year
    })
  )
  xAxis
    .transition()
    .duration(1000)
    .call(d3.axisBottom(x))

  // Add Y axis
  y.domain([
    0,
    d3.max(data, function(d) {
      return d[selected]
    })
  ])
  yAxis
    .transition()
    .duration(1000)
    .call(d3.axisLeft(y))

  // letiable u: map data to existing bars
  let u = svg.selectAll('rect').data(data)

  // update bars
  u
    .enter()
    .append('rect')
    .merge(u)
    .transition()
    .duration(1000)
    .attr('x', function(d) {
      return x(d.year)
    })
    .attr('y', function(d) {
      return y(+d[selected])
    })
    .attr('width', x.bandwidth())
    .attr('height', function(d) {
      return height - y(+d[selected])
    })
    .attr('fill', '#69b3a2')
}
// Initialize plot
drawGenderUnempChart([0], 'men')
