import * as d3 from 'd3'

export function initAgeChart(height, width) {
  var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom

  d3
    .select('#ageChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
}

export function drawAgeChart(height, width, data) {
  const svg = d3.select('#ageChart svg')
  const margin = {top: 10, right: 30, bottom: 90, left: 120}

  const x = d3
    .scaleBand()
    .range([0, width + 250])
    .domain(
      data.map(function(d) {
        return d.ageGroup
      })
    )
    .padding(2)
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('fill', '#F7D9C4')
    .attr('color', '#F7D9C4')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end')
    .style('font-size', '18px')

  const y = d3
    .scaleLinear()
    .domain([0, 81000])
    .range([height, 0])
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .style('font-size', '18px')
    .attr('fill', '#F7D9C4')
    .attr('color', '#F7D9C4')
    .call(d3.axisLeft(y))
  svg
    .selectAll('myline')
    .data(data)
    .enter()
    .append('line')
    .attr('x1', function(d) {
      return x(d.ageGroup)
    })
    .attr('x2', function(d) {
      return x(d.ageGroup)
    })
    .attr('y1', function(d) {
      return y(d.deathTotals)
    })
    .attr('y2', y(0))
    .attr('stroke', '#F7D9C4')

  svg
    .selectAll('mycircle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return x(d.ageGroup)
    })
    .attr('cy', function(d) {
      return y(d.deathTotals)
    })
    .attr('r', '10')
    .style('fill', '#4CC9F0')
    .attr('stroke', '#3da0bf')

  svg
    .append('text')
    .attr('class', 'x label')
    .attr('text-anchor', 'end')
    .attr('x', width - 100)
    .attr('y', height + 150)
    .text('Age Groups')
    .attr('fill', '#F7D9C4')
    .style('font-size', '25px')
    .style('font-weight', 'bold')

  svg
    .append('text')
    .attr('class', 'y label')
    .attr('text-anchor', 'end')
    .attr('y', 5)
    .attr('dy', '0.80em')
    .attr('x', -210)
    .attr('transform', 'rotate(-90)')
    .text('Death Totals')
    .style('font-size', '25px')
    .attr('fill', '#F7D9C4')
    .style('font-weight', 'bold')

  const div = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltipLolli')
    .style('opacity', 0)

  const path = svg
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cx', function(d) {
      return x(d.ageGroup)
    })
    .attr('cy', function(d) {
      return y(d.deathTotals)
    })
    .attr('stroke', '#5daec7')
    .attr('stroke-width', 2.5)
    .attr('fill', '#80d7f2')
    .on('mouseover', function(d, i) {
      d3
        .select(this)
        .transition()
        .duration('100')
        .attr('r', 15)
      div
        .transition()
        .duration(100)
        .style('opacity', 1)
      div
        .html(d.srcElement.__data__.deathTotals)
        .style('left', d.pageX + 10 + 'px')
        .style('top', d.pageY - 15 + 'px')
        .style('font-size', '25px')
    })
    .on('mouseout', function(d, i) {
      d3
        .select(this)
        .transition()
        .duration('200')
        .attr('r', 10)
      div
        .transition()
        .duration('200')
        .style('opacity', 0)
    })
}
