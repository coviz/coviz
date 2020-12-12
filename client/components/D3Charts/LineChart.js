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

  var x = d3
    .scaleBand()
    .range([margin.left, width + 250])
    .domain(
      data.map(function(d) {
        return d.date
      })
    )
    .padding(2)
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('color', 'white')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-90)')
    .style('text-anchor', 'end')
    // .style('font-size', '18px')

  // var x = d3.scaleTime()
  //   .domain(d3.extent(data, function(d) { return d.date; }))
  //   .range([ margin.left, width + margin.left ]);
  // svg.append("g")
  //   .attr("transform", "translate(0," + height + ")")
  //   .style('font-size', '18px')
  //   .attr('color', 'white')
  //   .call(d3.axisBottom(x));

  // Max value observed:
  const max = d3.max(data, function(d) { return +d.value; })
  console.log(max)

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, max+40])
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
    .attr("y2", y(max))
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
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.value) })
      )



  // var parseTime = d3.timeParse("%b %d, %Y");
  // var dates = [];
  // for (let obj of data) {
  //   dates.push(parseTime(obj.date));
  // }
  // console.log('dates', dates)
  // // const newData = data.map(dataBit => {
  // //   return {...dataBit, date: }
  // // })
  // var domain = d3.extent(dates);
  // console.log('domain', domain)
  // var xScale = d3.scaleTime()
  //   .domain(domain)
  //   .range([25, 555]);
  // var xAxis = d3.axisBottom(xScale);
  // svg.append("g")
  //   .attr("transform", "translate(0,60)")
  //   .style('font-size', '18px')
  //   .attr('color', 'white')
  //   .call(xAxis);

  
}
