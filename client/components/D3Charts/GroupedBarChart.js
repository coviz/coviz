import * as d3 from 'd3'

export function drawHungerChart(data) {
  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 20, left: 50},
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

  // List of subgroups = header of the csv files = soil condition here
  const subgroups = ['Overall', 'White', 'Black', 'Hispanic', 'Other']

  // Add X axis
  const x = d3
    .scaleBand()
    .domain([
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020
    ])
    .range([0, width])
    .padding([0.2])
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickSize(0))

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, 40])
    .range([height, 0])
  svg.append('g').call(d3.axisLeft(y))

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
    .range(['#F25F5C', '#4CC9F0', '#EDF0DA', '#0CF574', '#F7D9C4'])

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
}
