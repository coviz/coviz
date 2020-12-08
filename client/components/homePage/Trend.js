import React, {useEffect, useState, useRef} from 'react'
import {
  scaleTime,
  drag,
  event,
  scaleLinear,
  extent,
  line,
  area,
  curveBasis,
  axisBottom,
  axisLeft,
  select
} from 'd3'

export default ({data, time, startTime, endTime, updateTime}) => {
  /** Trend dimensions */
  const width = 950
  const height = 25

  /** Axes and plot dimensions */
  const yAxisWidth = 0
  const xAxisHeight = 15
  const plotWidth = width - yAxisWidth
  const plotHeight = height - xAxisHeight

  /** XScale spans timer's startTime and endTime across the plot width */
  const xScale = scaleTime()
    .domain([startTime, endTime])
    .range([0, plotWidth])

  /** Ref to xAxis */
  const xAxisRef = useRef()

  useEffect(
    () => {
      /** Get xAxis */
      const xAxisGroup = select(xAxisRef.current)

      /** Create axis */
      const xAxis = axisBottom()
        .scale(xScale)
        .tickSize(0)

      /** Attach axis to group */
      xAxisGroup.call(xAxis)
    },
    [xAxisRef]
  )

  /** Update time when click on svg */
  const svgRef = useRef()

  const handlePlotClick = evt => {
    /** Get the svg's left position on the page */
    const {left} = svgRef.current.getBoundingClientRect()
    /** Get the relative click position by subtracting the svg's left position and yAxisWidth from the click
     * position */
    const clickX = evt.clientX - left - yAxisWidth
    /** Pass the relative click position through the xScale invert function to get the appropriate date */
    updateTime(xScale.invert(clickX >= 0 ? clickX : 0))
  }

  return (
    <svg ref={svgRef} width={width} height={height} onClick={handlePlotClick}>
      <g transform={`translate(${yAxisWidth}, 0)`} />
      <g ref={xAxisRef} transform={`translate(${yAxisWidth}, ${plotHeight})`} />
    </svg>
  )
}
// const svgRef = useRef()

// var margin = {top: 50, right: 50, bottom: 0, left: 50},
//   width = 960 - margin.left - margin.right,
//   height = 100 - margin.top - margin.bottom

// var svg = select(svgRef.current)
//   .append('svg')
//   .attr('width', width + margin.left + margin.right)
//   .attr('height', height + margin.top + margin.bottom)

// var moving = false
// var currentValue = 0
// var targetValue = width

// var playButton = select('#play-button')

// var x = scaleTime()
//   .domain([startTime, endTime])
//   .range([0, targetValue])
//   .clamp(true)

// var slider = svg
//   .append('g')
//   .attr('class', 'slider')
//   .attr('transform', 'translate(' + margin.left + ',' + height / 5 + ')')

// slider
//   .append('line')
//   .attr('class', 'track')
//   .attr('x1', x.range()[0])
//   .attr('x2', x.range()[1])
//   .select(function() {
//     return this.parentNode.appendChild(this.cloneNode(true))
//   })
//   .attr('class', 'track-inset')
//   .select(function() {
//     return this.parentNode.appendChild(this.cloneNode(true))
//   })
//   .attr('class', 'track-overlay')
//   .call(
//     drag()
//       .on('start.interrupt', function() {
//         slider.interrupt()
//       })
//       .on('start drag', function() {
//         currentValue = event.x
//         update(x.invert(currentValue))
//       })
//   )

// slider
//   .insert('g', '.track-overlay')
//   .attr('class', 'ticks')
//   .attr('transform', 'translate(0,' + 18 + ')')
//   .selectAll('text')
//   .data(x.ticks(10))
//   .enter()
//   .append('text')
//   .attr('x', x)
//   .attr('y', 10)
//   .attr('text-anchor', 'middle')

// var handle = slider
//   .insert('circle', '.track-overlay')
//   .attr('class', 'handle')
//   .attr('r', 9)

// var label = slider
//   .append('text')
//   .attr('class', 'label')
//   .attr('text-anchor', 'middle')
//   .text(startTime)
//   .attr('transform', 'translate(0,' + -25 + ')')

// playButton.on('click', function() {
//   var button = d3.select(this)
//   if (button.text() == 'Pause') {
//     moving = false
//     clearInterval(timer)
//     // timer = 0;
//     button.text('Play')
//   } else {
//     moving = true
//     timer = setInterval(step, 100)
//     button.text('Pause')
//   }
//   console.log('Slider moving: ' + moving)
// })

// function step() {
//   update(x.invert(currentValue))
//   currentValue = currentValue + targetValue / 151
//   if (currentValue > targetValue) {
//     moving = false
//     currentValue = 0
//     clearInterval(timer)
//     // timer = 0;
//     playButton.text('Play')
//     console.log('Slider moving: ' + moving)
//   }
// }

// const handlePlotClick = (evt, h) => {
//   /** Get the svg's left position on the page */
//   const {left} = svgRef.current.getBoundingClientRect()
//   /** Get the relative click position by subtracting the svg's left position and yAxisWidth from the click
//    * position */
//   const clickX = evt.clientX - left
//   /** Pass the relative click position through the xScale invert function to get the appropriate date */
//   updateTime(x.invert(clickX >= 0 ? clickX : 0))

//   handle.attr('cx', x(h))
//   label.attr('x', x(h)).text(h)
// }

// //add an onclick?
// return (
//   <svg ref={svgRef} width={width} height={height} onClick={handlePlotClick} />
// )
// }
