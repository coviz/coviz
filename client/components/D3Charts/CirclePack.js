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
  let color = d3
    .scaleOrdinal()
    .domain([
      'Caucasian',
      'AfricanAmerican',
      'NativeAmerican',
      'AsianAmerican',
      'PacificIslander',
      'latinoAmerican',
      'Other'
    ])
    .range(d3.schemeSet2)
  // .range(["#213631","#252a50","#233657", "#492934", "#63242d","#4b4138", "#220033"]);

  // Size scale
  let size = d3
    .scaleLinear()
    .domain([0, 1])
    .range([7, 55]) // circle will be between 7 and 55 px wi

  // create a tooltip
  let Tooltip = d3
    .select('#ethnChart')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltipz')
    .style('background-color', '#ced4da')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('margin', '0px')

  let mouseover = function(d) {
    Tooltip.style('opacity', 1)
  }
  let mousemove = function(d) {
    const dataBub = d.srcElement.__data__

    Tooltip.html(
      '<u>' +
        ` ${dataBub.ethnicity} in ${dataBub.state} ` +
        '</u>' +
        '<br>' +
        `${(dataBub.deaths / dataBub.pop * 100).toFixed(2)}` +
        ' deaths by population (%)' +
        '<br>' +
        ` Death Count: ${dataBub.deaths}`
    )
      // manipulate d.value to be % per pop
      .style('left', d3.pointer(this)[0] + 20 + 'px')
      .style('top', d3.pointer(this)[1] + 'px')
  }
  let mouseleave = function(d) {
    Tooltip.style('opacity', 0)
  }

  let node = svg
    .append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', function(d) {
      return size(d.deaths / d.pop * 100)
    })
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .style('fill', function(d) {
      return color(d.ethnicity)
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

  let simulation = d3
    .forceSimulation()
    .force(
      'center',
      d3
        .forceCenter()
        .x(width / 2)
        .y(height / 2)
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
  let legend = d3
    .select('body')
    .append('svg')
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
    .attr('stroke', 'white')

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
