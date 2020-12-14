import * as d3 from 'd3'

export function initEnviroChart(height, width) {
  // console.log('init')
  var margin = {top: 30, right: 30, bottom: 30, left: 30}
  width = width - margin.left - margin.right
  height = height - margin.top - margin.bottom

  // append the svg object to the body of the page
  d3
    .select('#enviroChart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
}

export function drawEnviroChart(height, width, data) {
  console.log('draw')
  const svg = d3.select('#enviroChart svg')
  let margin = {top: 30, right: 30, bottom: 30, left: 120}
  width = width - margin.left - margin.right
  height = height - margin.top - margin.bottom

  const minX = d3.min(data, function(d) {
    return +d.date
  })
  console.log('x min:', minX)
  const maxX = d3.max(data, function(d) {
    return +d.date
  })
  console.log('x max:', maxX)
  // Max value observed:
  const minY = d3.min(data, function(d) {
    return +d.value
  })
  console.log('y min:', minY)
  const maxY = d3.max(data, function(d) {
    return +d.value
  })
  console.log('y max:', maxY)

  let xScale = d3
    .scaleLinear()
    .domain([minX, maxX])
    .range([margin.left, width + 250])

  // var y = d3.scaleLinear()
  // .domain([0, maxY+40])
  // .range([ height, 0 ]);

  var x = d3
    .scaleBand()
    .range([margin.left, width + 270])
    // .domain(
    //   data.map(d => {
    //     return d.date
    //   })
    // )
    .domain(
      data
        // .filter(function(d, index) {
        //   return index % 12 === 0
        // })
        .map((d, index) => {
          return index % 12 === 0 ? d.date : d.date
        })
    )
    // .ticks(minX, maxX, 47)
    .padding(2)
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('color', 'white')
    .call(d3.axisBottom(xScale))
    // .tickValue([197301, 200001, 202001])
    // .call(d3.ticks(minX, maxX, 47))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-90)')
    .style('text-anchor', 'end')
    // .ticks(minX, maxX, 47)
    // .style('font-size', '18px')
    //var ticks = d3.ticks(10, 20, 5);
    //svg.append('g').call(ticks)
    .style('font-size', '14px')

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([200, maxY + 40])
    .range([height, 0])
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .style('font-size', '18px')
    .attr('color', 'white')
    .call(d3.axisLeft(y))

  // Set the gradient
  svg
    .append('linearGradient')
    .attr('id', 'line-gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0)
    .attr('y1', y(minY))
    .attr('x2', 0)
    .attr('y2', y(maxY))
    .selectAll('stop')
    .data([{offset: '0%', color: 'blue'}, {offset: '100%', color: 'red'}])
    .enter()
    .append('stop')
    .attr('offset', function(d) {
      return d.offset
    })
    .attr('stop-color', function(d) {
      return d.color
    })

  // Add the line
  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'url(#line-gradient)')
    .attr('stroke-width', 2)
    .attr(
      'd',
      d3
        .line()
        .x(function(d) {
          return x(d.date)
        })
        .y(function(d) {
          return y(d.value)
        })
    )

  //  x axis labels
  svg
    .append('text')
    .attr('class', 'x label')
    // .style("font-size", "18px")
    // .attr("color", "white")
    .attr('text-anchor', 'end')
    .attr('x', width - 100)
    .attr('y', height + 100)
    .text('Time')
    .attr('fill', 'white')
    .style('font-size', '20px')
    .style('font-weight', 'bold')

  // y axis labels
  svg
    .append('text')
    .attr('class', 'y label')
    .attr('text-anchor', 'end')
    // .attr("x", width )
    .attr('y', 35)
    // .attr("dx", "2em")
    .attr('dy', '0.80em')
    .attr('x', -170)
    .attr('transform', 'rotate(-90)')
    .text('Carbon Emissions (Million Metric Tons)')
    .style('font-size', '20px')
    .attr('fill', 'white')
    .style('font-weight', 'bold')
}
