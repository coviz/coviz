import * as d3 from 'd3'

// set the dimensions and margins of the graph
export function initUnempChart(height, width) {
  d3
    .select('#unempChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
  // .style('border', '1px solid white')
}

export function drawUnempChart(height, width, data) {
  const svg = d3.select('#unempChart svg')
  // Color palette
  const color = d3
    .scaleOrdinal()
    .domain(['2008', '2009', '2010', '2011', '2017', '2018', '2019', '2020'])
    .range(d3.schemeTableau10)
  // .range(["#213631","#252a50","#233657", "#492934", "#63242d","#4b4138", "#220033"]);

  // Size scale
  const size = d3
    .scaleLinear()
    .domain([0, 90])
    .range([7, 40]) // circle will be between 7 and 55 px wi

  // create a tooltip
  const Tooltip = d3
    .select('#unempChart')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltipsie')
    .style('background-color', '#ced4da')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('margin', '0px')

  const mouseover = function(d) {
    Tooltip.style('opacity', 1)
  }
  const mousemove = function(d) {
    const dataBub = d.srcElement.__data__

    Tooltip.html(
      '<u>' +
        `Total Unemployed: ${dataBub.unemployed.toLocaleString()}` +
        '</u>' +
        '<br>' +
        `In ${dataBub.month.toUpperCase()} ${dataBub.year}`
    )
      // manipulate d.value to be % per pop
      .style('left', d.pageX + 'px')
      .style('top', d.pageY + 'px')
  }
  const mouseleave = function(d) {
    Tooltip.style('opacity', 0)
  }

  const node = svg
    .append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', function(d) {
      return size(d.unemployed / 600000)
    })
    .attr('cx', width / 2.2)
    .attr('cy', height / 2.2)
    .style('fill', function(d) {
      return color(d.year)
    })
    .style('fill-opacity', 0.8)
    .attr('stroke', 'black')
    .style('stroke-width', 1)
    .on('mouseover', mouseover) // What to do when hovered
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)

  const simulation = d3
    .forceSimulation()
    .force(
      'center',
      d3
        .forceCenter()
        .x(width / 2.2)
        .y(height / 2.2)
    ) // Attraction to the center of the svg area
    .force('charge', d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
    .force(
      'collide',
      d3
        .forceCollide()
        .strength(0.2)
        .radius(function(d) {
          return size(d.unemployed / 700000) + 3
        })
        .iterations(1)
    ) // Force that avoids circle overlapping
  simulation.nodes(data).on('tick', function(d) {
    node
      .attr('cx', function(d) {
        return d.x
      })
      .attr('cy', function(d) {
        return d.y
      })
  })

  //creates legend
  const legend = svg
    .append('g')
    .attr('class', 'legend')
    .attr('width', 140)
    .attr('height', 200)
    .selectAll('g')
    .data(
      color
        .domain()
        .slice()
        .reverse()
    )
    .enter()
    .append('g')
    .attr('transform', function(d, i) {
      return 'translate(0,' + i * 20 + ')'
    })

  legend
    .append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', color)

  legend
    .append('text')
    .data(
      color
        .domain()
        .slice()
        .reverse()
    )
    .attr('x', 24)
    .attr('y', 9)
    .attr('dy', '.35em')
    .text(function(d) {
      return d
    })
    .attr('fill', '#F7D9C4')
}
