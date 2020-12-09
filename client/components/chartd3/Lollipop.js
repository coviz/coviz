import * as d3 from 'd3'

// var margin = {top: 10, right: 30, bottom: 90, left: 40},
// width = 460 - margin.left - margin.right,
// height = 500 - margin.top - margin.bottom;

export function initAgeChart(height, width) {
    var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

  d3
    .select('#ageChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
}

export function drawAgeChart(height, width, data) {
    const svg = d3.select('#ageChart svg')

    // X axis
    var x = d3
        .scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.ageGroup; }))
        .padding(1);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3
        .scaleLinear()
        .domain([0, 13000])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function(d) { return x(d.ageGroup); })
        .attr("x2", function(d) { return x(d.ageGroup); })
        .attr("y1", function(d) { return y(d.deathTotals); })
        .attr("y2", y(0))
        .attr("stroke", "grey")

    // Circles
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ageGroup); })
        .attr("cy", function(d) { return y(d.deathTotals); })
        .attr("r", "4")
        .style("fill", "#69b3a2")
        .attr("stroke", "black")
    


}
