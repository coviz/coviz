import * as d3 from 'd3'

export function drawHungerChart(data) {
  // set the dimensions and margins of the graph
  const margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = d3
    .select('#hungerChart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  // List of years
  const groups = data.map(x => x.year)

  // List of subgroups = header of the csv files = soil condition here
  const subgroups = ['Overall', 'White', 'Black', 'Hispanic', 'Other']

  // Add X axis
  const x = d3
    .scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickSize(0))

  // X axis labels
  svg
    .append('text')
    .attr('transform', 'translate(' + width / 2 + ' ,' + (height + 35) + ')')
    .style('text-anchor', 'middle')
    .text('Year')
    .attr('fill', '#F7D9C4')

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, 40])
    .range([height, 0])
  svg.append('g').call(d3.axisLeft(y))

  // Y axis label
  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Percent of Households Experiencing Food Insecurity')
    .attr('fill', '#F7D9C4')

  // Another scale for subgroup position?
  const xSubgroup = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(['#0CF574', '#EDF0DA', '#F25F5C', '#4CC9F0', '#F7D9C4'])

  // Show the bars
  svg
    .append('g')
    .selectAll('g')
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      return 'translate(' + x(d.year) + ',0)'
    })
    //.attr("transform", function(d) { return `translate(${x(d.year)},0)`; })
    .selectAll('rect')
    .data(function(d) {
      return subgroups.map(function(key) {
        return {key: key, value: d[key]}
      })
    })
    .enter()
    .append('rect')
    .attr('x', function(d) {
      return xSubgroup(d.key)
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

  // Legend
  let legend = svg
    .append('g')
    .selectAll('g')
    .data(subgroups)
    .enter()
    .append('g')
    .attr('transform', function(d, i) {
      return 'translate(20,' + (i - 1) * 20 + ')'
    })
    .attr('fill', '#F7D9C4')

  legend
    .append('rect')
    .attr('x', 40)
    .attr('y', 10)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', color)

  legend
    .append('text')
    .attr('x', 70)
    .attr('y', 20)
    .attr('dy', '0.25em')
    .text(function(d) {
      return d
    })
}
