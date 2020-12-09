// set the dimensions and margins of the graph
import * as d3 from 'd3'

export function initGenderChart(height, width) {
  d3
    .select('#genderChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black')
}
export function drawGenderChart(data) {
  var svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height'),
    innerRadius = 180,
    outerRadius = Math.min(width, height) * 0.77,
    g = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height * 0.78 + ')')

  var x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)

  var y = d3.scaleRadial().range([innerRadius, outerRadius])

  var z = d3
    .scaleOrdinal()
    .range([
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00'
    ])

  // d3.csv(dataStuff, function(d, i, columns) {
  //   for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  //   d.total = t;
  //   return d;
  // }, function(error, data) {
  //   if (error) throw error;

  // weave(data, function(a, b) { return b[data.columns[6]] -  a[data.columns[6]]; });
  x.domain(
    data.map(function(d) {
      return d.state
    })
  )
  y.domain([
    0,
    d3.max(data, function(d) {
      return d.total
    })
  ])
  z.domain(['males', 'females'])

  g
    .append('g')
    .selectAll('g')
    .data(d3.stack().keys(['males', 'females'])(data))
    .enter()
    .append('g')
    .attr('fill', function(d) {
      return z(d.key)
    })
    .selectAll('path')
    .data(function(d) {
      return d
    })
    .enter()
    .append('path')
    .attr(
      'd',
      d3
        .arc()
        .innerRadius(function(d) {
          return y(d[0])
        })
        .outerRadius(function(d) {
          return y(d[1])
        })
        .startAngle(function(d) {
          return x(d.data.state)
        })
        .endAngle(function(d) {
          return x(d.data.state) + x.bandwidth()
        })
        .padAngle(0.01)
        .padRadius(innerRadius)
    )

  var label = g
    .append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('text-anchor', 'middle')
    .attr('transform', function(d) {
      return (
        'rotate(' +
        ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) +
        ')translate(' +
        innerRadius +
        ',0)'
      )
    })

  label
    .append('line')
    .attr('x2', -5)
    .attr('stroke', '#000')

  label
    .append('text')
    .attr('transform', function(d) {
      return (x(d.state) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) <
        Math.PI
        ? 'rotate(90)translate(0,16)'
        : 'rotate(-90)translate(0,-9)'
    })
    .text(function(d) {
      return d.state
    })

  var yAxis = g.append('g').attr('text-anchor', 'end')

  var yTick = yAxis
    .selectAll('g')
    .data(y.ticks(10).slice(1))
    .enter()
    .append('g')

  yTick
    .append('circle')
    .attr('fill', 'none')
    .attr('stroke', '#000')
    .attr('stroke-opacity', 0.5)
    .attr('r', y)

  yTick
    .append('text')
    .attr('x', -6)
    .attr('y', function(d) {
      return -y(d)
    })
    .attr('dy', '0.35em')
    .attr('fill', 'none')
    .attr('stroke', '#fff')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .text(y.tickFormat(10, 's'))

  yTick
    .append('text')
    .attr('x', -6)
    .attr('y', function(d) {
      return -y(d)
    })
    .attr('dy', '0.35em')
    .text(y.tickFormat(10, 's'))

  yAxis
    .append('text')
    .attr('x', -6)
    .attr('y', function(d) {
      return -y(y.ticks(10).pop())
    })
    .attr('dy', '-1em')
    .text('Population')

  var legend = g
    .append('g')
    .selectAll('g')
    .data(['males', 'females'].reverse())
    .enter()
    .append('g')
    .attr('transform', function(d, i) {
      return 'translate(-40,' + (i - (3 - 1) / 2) * 20 + ')'
    })

  legend
    .append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', z)

  legend
    .append('text')
    .attr('x', 24)
    .attr('y', 9)
    .attr('dy', '0.35em')
    .text(function(d) {
      return d
    })
}

// function weave(array, compare) {
//   var i = -1, j, n = array.sort(compare).length, weave = new Array(n);
//   while (++i < n) weave[i] = array[(j = i << 1) >= n ? (n - i << 1) - 1 : j];
//   while (--n >= 0) array[n] = weave[n];
// }

// export function drawGenderChart(data) {
//   const width = 975
//   const height = 975
//   const innerRadius = 180
//   const outerRadius =Math.min(width, height) / 2

//   const z = d3
//     .scaleOrdinal()
//     .domain(['male', 'female'])
//     .range(['#98abc5', '#8a89a6'])

//   const x = d3
//     .scaleBand()
//     .domain(data.map((d) => d.state))
//     .range([0, 2 * Math.PI])
//     .align(0)

//   const y = d3
//     .scaleRadial()
//     .domain([0, d3.max(data, (d) => d.total)])
//     .range([innerRadius, outerRadius])

//   const arc = d3
//     .arc()
//     .innerRadius((d) =>  y(d[0]))
//     .outerRadius((d) => y(d[1]))
//     .startAngle((d) => {
//       return x(d.data.state)})
//     .endAngle((d) => x(d.data.state) + x.bandwidth())
//     .padAngle(0.01)
//     .padRadius(innerRadius)

//   const yAxis = (g) =>
//     g
//       .attr('text-anchor', 'middle')
//       .call((g) =>
//         g
//           .append('text')
//           .attr('y', (d) => -y(y.ticks(5).pop()))
//           .attr('dy', '-1em')
//           .text('Population')
//       )
//       .call((g) =>
//         g
//           .selectAll('g')
//           .data(y.ticks(5).slice(1))
//           .join('g')
//           .attr('fill', 'none')
//           .call((g) =>
//             g
//               .append('circle')
//               .attr('stroke', '#000')
//               .attr('stroke-opacity', 0.5)
//               .attr('r', y)
//           )
//           .call((g) =>
//             g
//               .append('text')
//               .attr('y', (d) => -y(d))
//               .attr('dy', '0.35em')
//               .attr('stroke', '#fff')
//               .attr('stroke-width', 5)
//               .text(y.tickFormat(5, 's'))
//               .clone(true)
//               .attr('fill', '#000')
//               .attr('stroke', 'none')
//           )
//       )
//   const xAxis = (g) =>
//     g.attr('text-anchor', 'middle').call((g) =>
//       g
//         .selectAll('g')
//         .data(data)
//         .join('g')
//         .attr(
//           'transform',
//           (d) => `
//         rotate(${((x(d.state) + x.bandwidth() / 2) * 180) / Math.PI - 90})
//         translate(${innerRadius},0)
//       `
//         )
//         .call((g) => g.append('line').attr('x2', -5).attr('stroke', '#000'))
//         .call((g) =>
//           g
//             .append('text')
//             .attr('transform', (d) =>
//               (x(d.state) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) <
//               Math.PI
//                 ? 'rotate(90)translate(0,16)'
//                 : 'rotate(-90)translate(0,-9)'
//             )
//             .text((d) => d.state)
//         )
//     )

//   const legend = g => g.append("g")
//   .selectAll("g")
//   .data(['male', 'female'].reverse())
//   .join("g")
//     .attr("transform", (d, i) => `translate(-40,${(i - (2 - 1) / 2) * 20})`)
//     .call(g => g.append("rect")
//         .attr("width", 18)
//         .attr("height", 18)
//         .attr("fill", z))
//     .call(g => g.append("text")
//         .attr("x", 24)
//         .attr("y", 9)
//         .attr("dy", "0.35em")
//         .text(d => d))

//   const svg = d3
//     .select('#genderChart')
//     .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
//     .style('width', '100%')
//     .style('height', 'auto')
//     .style('font', '10px sans-serif')

//   svg
//     .append('g')
//     .attr("transform", "translate(" + width / 2 + "," + height * 0.78 + ")")
//     .selectAll('g')
//     .data(d3.stack().keys(['male', 'female'])(data))
//     .enter().append("g")
//     .attr('fill', (d) => { return z(d.key)})
//     .selectAll('path')
//     .data((d) => d)
//     .enter().append("path")
//     .attr("d", arc)

//   svg.append('g').call(xAxis)

//   svg.append('g').call(yAxis)

//   svg.append('g').call(legend)

//   // return svg.node()
//   //return svg
// }

// export function drawGenderChart(data){

// let margin = {top: 100, right: 0, bottom: 0, left: 0},
//   width = 460 - margin.left - margin.right,
//   height = 460 - margin.top - margin.bottom,
//   innerRadius = 90,
//   outerRadius = Math.min(width, height) / 2 // the outerRadius goes from the middle of the SVG area to the border

//   let svg = d3
//     .select('#genderChart')
//     .append('svg')
//     .attr('width', width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)
//     .append('g')
//     .attr(
//       'transform',
//       'translate(' +
//         (width / 2 + margin.left) +
//         ',' +
//         (height / 2 + margin.top) +
//         ')'
//     )

//     // X scale: common for 2 data series
//     let x = d3
//       .scaleBand()
//       .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
//       .align(0) // This does nothing
//       .domain(
//         data.map(function (d) {
//           return d.state
//         })
//       ) // The domain of the X axis is the list of states.

//     // Y scale outer letiable
//     let y = d3
//       .scaleRadial()
//       .range([innerRadius, outerRadius]) // Domain will be define later.
//       .domain([0, 13000]) // Domain of Y is from 0 to the max seen in the data

//     // Second barplot Scales
//     let ybis = d3
//       .scaleRadial()
//       .range([innerRadius, 5]) // Domain will be defined later.
//       .domain([0, 13000])

//     // Add the bars
//     svg
//       .append('g')
//       .selectAll('path')
//       .data(data)
//       .enter()
//       .append('path')
//       .attr('fill', '#69b3a2')
//       .attr('class', 'yo')
//       .attr(
//         'd',
//         d3
//           .arc() // imagine your doing a part of a donut plot
//           .innerRadius(innerRadius)
//           .outerRadius(function (d) {
//             return y(d[d.males + d.females])
//           })
//           .startAngle(function (d) {
//             return x(d.state)
//           })
//           .endAngle(function (d) {
//             return x(d.state) + x.bandwidth()
//           })
//           .padAngle(0.01)
//           .padRadius(innerRadius)
//       )

//     // Add the labels
//     svg
//       .append('g')
//       .selectAll('g')
//       .data(data)
//       .enter()
//       .append('g')
//       .attr('text-anchor', function (d) {
//         return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
//           Math.PI
//           ? 'end'
//           : 'start'
//       })
//       .attr('transform', function (d) {
//         return (
//           'rotate(' +
//           (((x(d.state) + x.bandwidth() / 2) * 180) / Math.PI - 90) +
//           ')' +
//           'translate(' +
//           (y(d['Value']) + 10) +
//           ',0)'
//         )
//       })
//       .append('text')
//       .text(function (d) {
//         return d.state
//       })
//       .attr('transform', function (d) {
//         return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
//           Math.PI
//           ? 'rotate(180)'
//           : 'rotate(0)'
//       })
//       .style('font-size', '11px')
//       .attr('alignment-baseline', 'middle')

//     // Add the second series
//     svg
//       .append('g')
//       .selectAll('path')
//       .data(data)
//       .enter()
//       .append('path')
//       .attr('fill', 'red')
//       .attr(
//         'd',
//         d3
//           .arc() // imagine your doing a part of a donut plot
//           .innerRadius(function (d) {
//             return ybis(0)
//           })
//           .outerRadius(function (d) {
//             return ybis(d[d.males + d.females])
//           })
//           .startAngle(function (d) {
//             return x(d.state)
//           })
//           .endAngle(function (d) {
//             console.log('ddddd', d)
//             return x(d.state) + x.bandwidth()
//           })
//           .padAngle(0.01)
//           .padRadius(innerRadius)
//       )
// }
