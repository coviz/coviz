import * as d3 from 'd3'

const margin = {top: 10, right: 30, bottom: 20, left: 30},
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom

export function initStacked() {
  d3
    .select('#genderUnempChart')
    .append('svg')
    .attr('width', width + margin.left + margin.right + 70)
    .attr('height', height + margin.top + margin.bottom + 70)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
}

export function drawGenderUnempChart(data) {
  if (data.length > 0) {
    // set the dimensions and margins of the graph

    // append the svg object to the body of the page
    const svg = d3.select('#genderUnempChart svg')

    //   // List of subgroups = header of the csv files = soil condition here
    //   let subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const years = d3.map(data, function(d) {
      return d.year
    })

    // Add X axis
    const x = d3
      .scaleBand()
      .domain(years)
      .range([0, width])
      .padding([0.2])
    svg
      .append('g')
      .attr('transform', 'translate(70,' + height + ')')
      .attr('fill', '#F7D9C4')
      .attr('color', '#F7D9C4')
      .call(d3.axisBottom(x).tickSizeOuter(0))
    //.attr('color', '#fff')

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function(d) {
          return Math.round(+d.total) + 2000000
        })
      ])
      .range([height, 0])
    svg
      .append('g')
      .attr('transform', 'translate(' + 70 + ')')
      .attr('fill', '#F7D9C4')
      .attr('color', '#F7D9C4')
      .call(d3.axisLeft(y))
    //.attr('color', '#fff')

    // color palette = one color per subgroup
    const color = d3
      .scaleOrdinal()
      .domain(['Men', 'Women'])
      .range(['#0CF574', '#F7D9C4'])

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(['Men', 'Women'])(data)

    // ----------------
    // Create a tooltip
    // ----------------
    const tooltip = d3
      .select('#genderUnempChart')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', '#ced4da')
      // .style('border', 'solid')
      .style('color', 'black')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px')

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(d) {
      tooltip.style('opacity', 1)
    }
    const mousemove = function(d) {
      const databub = d.srcElement.__data__.data
      const subgroupName = d3.select(this.parentNode).datum().key
      const subgroupValue = databub[subgroupName]

      tooltip
        .html(
          `<b> Max Unemployment for <u>${subgroupName}</u> in ${
            databub.year
          } </b> ` +
            '<br>' +
            'Total:' +
            subgroupValue.toLocaleString()
        )
        .style('left', d.pageX + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style('top', d.pageY - 28 + 'px')
    }
    const mouseleave = function(d) {
      tooltip.style('opacity', 0)
    }

    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', function(d) {
        return color(d.key)
      })
      .selectAll('rect')
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) {
        return d
      })
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return x(d.data.year) + 70
      })
      .attr('y', function(d) {
        return y(d[1])
      })
      .attr('height', function(d) {
        return y(d[0]) - y(d[1])
      })
      .attr('width', x.bandwidth())
      .attr('stroke', 'grey')
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)

    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('width', 140)
      .attr('height', 200)
      .selectAll('g')
      .data(['Women', 'Men'])
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return 'translate(80,' + i * 20 + ')'
      })

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color)

    legend
      .append('text')
      .data(['Women', 'Men'])
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .text(function(d) {
        return d
      })
      .attr('fill', '#F7D9C4')
  }
}
