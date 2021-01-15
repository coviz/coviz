import * as d3 from 'd3'

// set the dimensions and margins of the graph
export function initEthnChart(height, width) {
  d3
    .select('#ethnChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
}

export function drawEthnChart(height, width, data) {
  const svg = d3.select('#ethnChart svg')
  // Color palette
  const color = d3
    .scaleOrdinal()
    .domain([
      'White American',
      'Black or African American',
      ' American Indian or Alaska Native',
      ' Asian American',
      'Native Hawaiian or Other Pacific Islander',
      'Hispanic or Latino',
      'Multi-racial and Other'
    ])
    .range(d3.schemeSet2)
  // .range(["#213631","#252a50","#233657", "#492934", "#63242d","#4b4138", "#220033"]);

  // Size scale
  const size = d3
    .scaleLinear()
    .domain([0, 1])
    .range([7, 55]) // circle will be between 7 and 55 px wi

  // create a tooltip
  const Tooltip = d3
    .select('#ethnChart')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', '#ced4da')
    // .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('margin', '0px')

  const mouseover = function(d) {
    Tooltip.style('opacity', 1)
  }
  const mousemove = function(d) {
    const dataBub = d.srcElement.__data__

    let ethnicity = dataBub.ethn

    Tooltip.html(
      '<b><u>' +
        ` ${ethnicity} in ${dataBub.state} ` +
        '</u></b>' +
        '<br>' +
        `${(dataBub.deaths / dataBub.pop * 100).toFixed(2)}` +
        ' deaths by population (%)' +
        '<br>' +
        ` Death Count: ${dataBub.deaths}`
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
      return size(d.deaths / d.pop * 100)
    })
    .attr('cx', width / 2.2)
    .attr('cy', height / 2.2)
    .style('fill', function(d) {
      return color(d.ethn)
    })
    .style('fill-opacity', 0.8)
    .attr('stroke', 'black')
    .style('stroke-width', 1)
    .on('mouseover', mouseover) // What to do when hovered
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .call(
      d3
        .drag() // call specific function when circle is dragged
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    )

  const simulation = d3
    .forceSimulation()
    .force(
      'center',
      d3
        .forceCenter()
        .x(width / 2.2)
        .y(height / 1.9)
    ) // Attraction to the center of the svg area
    .force('charge', d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
    .force(
      'collide',
      d3
        .forceCollide()
        .strength(0.2)
        .radius(function(d) {
          return size(d.deaths / d.pop * 100) + 3
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
      return 'translate(0,' + i * 17 + ')'
    })

  legend
    .append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .attr('x', 0)
    .style('fill', color)

  legend
    .append('text')
    .data(
      color
        .domain()
        .slice()
        .reverse()
    )
    .attr('x', 19)
    .attr('y', 10)
    .attr('dy', '.20em')
    .text(function(d) {
      return d
    })
    .attr('fill', '#F7D9C4')

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.03).restart()
    d3
      .select(this)
      .raise()
      .attr('stroke', 'black')
  }

  function dragged(event, d) {
    d3
      .select(this)
      .attr('cx', (d.x = event.x))
      .attr('cy', (d.y = event.y))
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0.03)
    d3.select(this)
  }
}
