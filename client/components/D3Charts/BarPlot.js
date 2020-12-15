import * as d3 from 'd3'

let margin = {top: 10, right: 10, bottom: 70, left: 30},
  width = 425 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom

export function init() {
  d3
    .select('#notInLabor')
    .append('svg')
    .attr('width', width + margin.left + margin.right + 70)
    .attr('height', height + margin.top + margin.bottom + 40)
    .append('g')
    .attr(
      'transform',
      'translate(' + margin.left + 400 + ',' + margin.top + ')'
    )
}

export function drawGenderLaborChart(data) {
  if (data.length > 0) {
    // append the svg object to the body of the page
    let svg = d3.select('#notInLabor svg')

    // List of subgroups = header of the csv files = soil condition here
    let subgroups = ['notInLaborMen', 'notInLaborWomen']

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    let months = d3.map(data, function(d) {
      return d.month
    })

    // Add X axis
    let x = d3
      .scaleBand()
      .domain(months)
      .range([0, width])
      .padding([0.2])
    svg
      .append('g')
      .attr('transform', 'translate(70,' + height + ')')
      .attr('fill', '#F7D9C4')
      .attr('color', '#F7D9C4')
      .call(d3.axisBottom(x).tickSize(0))

    // Add Y axis
    let y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function(d) {
          return Math.round(d.notInLaborWomen + 3000000)
        })
      ])
      .range([height, 0])
    svg
      .append('g')
      .attr('transform', 'translate(' + 70 + ')')
      .attr('fill', '#F7D9C4')
      .attr('color', '#F7D9C4')
      .call(d3.axisLeft(y))

    // Another scale for subgroup position?
    let xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05])

    // color palette = one color per subgroup
    let color = d3
      .scaleOrdinal()
      .domain(['Men', 'Women'])
      .range(['#F7D9C4', '#F25F5C'])

    // Show the bars
    svg
      .append('g')
      .selectAll('g')

      // Enter in data = loop group per group
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function(d) {
        return 'translate(' + x(d.month) + ',0)'
      })
      .selectAll('rect')
      .data(function(d) {
        return subgroups.map(function(key) {
          return {key: key, value: d[key]}
        })
      })
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return xSubgroup(d.key) + 70
      })
      .attr('y', function(d) {
        return y(d.value)
      })
      .attr('width', xSubgroup.bandwidth())
      .attr('height', function(d) {
        return height - y(d.value)
      })
      .attr('fill', function(d) {
        return color(d.key)
      })

    let legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('width', 140)
      .attr('height', 200)
      .selectAll('g')
      .data(['Women', 'Men'])
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return 'translate(80,' + i * 20 + ')'
      })

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color)

    legend
      .append('text')
      .data(['Women', 'Men'])
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .text(function(d) {
        return d
      })
      .attr('fill', '#F7D9C4')
  }
}
