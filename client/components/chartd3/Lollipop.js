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
    var margin = {top: 10, right: 30, bottom: 90, left: 120}

    // X axis
    var x = d3
        .scaleBand()
        .range([ 0, width +250])
        .domain(data.map(function(d) { return d.ageGroup; }))
        .padding(2);
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
        .style("fill", "#80ceed")
        .attr("stroke", "#5a90a6")

    //  x axis labels
    svg.append("text")
        .attr("class", "x label")
        // .style("font-size", "18px")
        // .attr("color", "white")
        .attr("text-anchor", "end")
        .attr("x", width - 100)
        .attr("y", height + 150)
        .text("Age Groups")
        .attr("fill", "white")
        .style("font-size", "25px")
        .style("font-weight", "bold")
        

    // y axis labels
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        // .attr("x", width )
        .attr("y", 5)
        // .attr("dx", "2em")
        .attr("dy", "0.80em")
        .attr("x", -210)
        .attr("transform", "rotate(-90)")
        .text("Death Totals")
        .style("font-size", "25px")
        .attr("fill", "white")
        .style("font-weight", "bold")

    // // Data Values Above

    var div = d3.select("body").append("div")
       .attr("class", "tooltip")
       .style("opacity", 0);

    var path = svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 10)
        .attr("cx", function (d) {
            return x(d.ageGroup);
        })
        .attr("cy", function (d) {
            return y(d.deathTotals);
        })
        .attr("stroke", "#5a90a6")
        .attr("stroke-width", 1.5)
        .attr("fill", "#80ceed")
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('100')
                .attr("r", 15);
            div.transition()
                .duration(100)
                .style("opacity", 1);
    // switch out .event's to new version stuff to show data value
    //  ^^ ask group
            // div.html(d.deathTotals)
            //     .style("left", ((d3.pointer)[0] + 10) + "px")
            //     .style("top", ((d3.pointer)[1] - 15) + "px")
            //     console.log(d3.pointer);
                // .style("left", (d3.event.pageX + 10) + "px")
                // .style("top", (d3.event.pageY - 15) + "px");
       })
       .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('200')
                .attr("r", 10);
            div.transition()
                .duration('200')
                .style("opacity", 0);
       });
    
    

    

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
