import * as d3 from 'd3'

export function drawGenderUnempChart(data, selected) {
  // console.log('this is on the barplot', data)
  if (data.length > 0) {
    // set the dimensions and margins of the graph
    let margin = {top: 30, right: 30, bottom: 70, left: 90},
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom

    d3
      .select('#genderUnempChart')
      .selectAll('svg')
      .remove()

    // append the svg object to the body of the page
    let svg = d3
      .select('#genderUnempChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // Initialize the X axis
    let x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.2)
    let xAxis = svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('stroke', '#F7D9C4')
      .attr('color', '#F7D9C4')

    // Initialize the Y axis
    let y = d3.scaleLinear().range([height, 0])
    let yAxis = svg
      .append('g')
      .attr('class', 'myYaxis')
      .attr('stroke', '#F7D9C4')
      .attr('color', '#F7D9C4')

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
        return Math.round(+d[selected]) + 2000000
      })
    ])
    yAxis
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y))

    // letiable u: map data to existing bars
    let u = svg.selectAll('rect').data(data)

    // update bars
    let color = '#4CC9F0'
    let other = '#0CF574'

    if (selected === 'avgMen') {
      color = other
    }
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
        return y(Math.round(d[selected]))
      })
      .attr('width', x.bandwidth())
      .attr('height', function(d) {
        return height - y(Math.round(d[selected]))
      })
      .attr('fill', color)
  }
  // // Initialize plot
  // update('let1')
}
// Initialize plot
drawGenderUnempChart([0], 'avgMen')
