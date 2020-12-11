import * as d3 from 'd3'

export function initEnviroChart(height, width) {
  console.log('init')
  var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = width - margin.left - margin.right,
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
  var margin = {top: 30, right: 30, bottom: 30, left: 120}
  width = width - margin.left - margin.right,
  height = height - margin.top - margin.bottom

  // When reading the csv, I must format variables:
  // DataParse(d){
  //   return { date : d3.timeParse("%Y%m")(d.date), value : d.value }
  // }

  // Now I can use this dataset:
  // const min = d3.min(data, function(d) { return +d.date; })
  // const max = d3.max(data, function(d) { return +d.date; })

  // console.log('dates', min, max)
  // Add X axis --> it is a date format
  var x = d3
    .scaleTime()
    //explre what scaletime is
    .domain(d3.extent(data, function(d) { return +d.date; }))
    // .domain([min,max])
    .range([ margin.left+5, width+margin.left+10]);
    console.log('kfheifgu')
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr('color', 'white')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end')
    .style('font-size', '18px')

  // Max value observed:
  const valMax = d3.max(data, function(d) { return +d.value; })
  console.log('valMax', valMax)

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, valMax+100])
    .range([ height, 0 ]);
  svg.append("g")
    .attr('transform', `translate(${margin.left},0)`)
    .style('font-size', '18px')
    .attr('color', 'white')
    .call(d3.axisLeft(y));

  // Set the gradient
  svg.append("linearGradient")
    .attr("id", "line-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", y(0))
    .attr("x2", 0)
    .attr("y2", y(valMax))
    .selectAll("stop")
      .data([
        {offset: "0%", color: "blue"},
        {offset: "100%", color: "red"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "url(#line-gradient)" )
    .attr("stroke-width", 1)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.value) })
    )
  
  
}
