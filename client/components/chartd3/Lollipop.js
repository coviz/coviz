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
    var margin = {top: 10, right: 30, bottom: 90, left: 80}

    // X axis
    var x = d3
        .scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.ageGroup; }))
        .padding(1);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        // .attr("transform", `translate(0,${height - margin.top})`)
        .attr("color", "white")
        // .attr("transform", `translate(${margin.bottom},0)`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        // .attr("color", "white")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        // .style("text", "white");
        .style("font-size", "18px")
        
        // .attr("class", "xAxis")

    // Add Y axis
    var y = d3
        .scaleLinear()
        .domain([0, 81000])
        .range([ height, 0])
        //.padding(1);
    svg.append("g")
        // .attr("class", "y axis")
        // .attr("transform", "translate(0," + width + ")")
        // attr("transform", "translate(" + width + ", 0)")
        .attr("transform", `translate(${margin.left},0)`)
        .style("font-size", "18px")
        .attr("color", "white")
        .call(d3.axisLeft(y))
        // .selectAll("text")

    // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function(d) { return x(d.ageGroup); })
        .attr("x2", function(d) { return x(d.ageGroup); })
        .attr("y1", function(d) { return y((d.deathTotals)); })
        .attr("y2", y(0))
        .attr("stroke", "#e3e3e3")
        // .attr("stroke", "2px")

    // Circles
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ageGroup); })
        .attr("cy", function(d) { return y((d.deathTotals)); })
        .attr("r", "10")
        .style("fill", "#458EAD")
        .attr("stroke", "#2E5E73")

    // // Data Values Above
    // svg.selectAll("myValues")
    //     console.log('in myvals')
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("d", function(d) { return y((d.deathTotals)); })
    //     .attr("transform", `translate(0, 10)`) //-10?
    //     .attr("fill", "white")
    //     .style("text-anchor", "middle")

    


}
