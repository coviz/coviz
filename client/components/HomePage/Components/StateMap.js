import React, {useRef, useEffect, useState} from 'react'
import {
  geoAlbersUsa,
  geoPath,
  select,
  scaleSqrt,
  easeLinear,
  max,
  mouse
} from 'd3'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import usData from '../Assets/usData.json'

export const StateMap = data => {
  const [mode, setMode] = useState(false)

  const svgRef = useRef()
  const maxCases = max(data.data.map(d => d.positive))
  let radiusScale = scaleSqrt()

  useEffect(
    () => {
      const projection = geoAlbersUsa()
        .scale(1300)
        .translate([975 / 2, 610 / 2])

      const svg = select(svgRef.current)
      const pathGenerator = geoPath().projection(projection)

      // define the tooltip
      let currentPosition
      var tooltip = d3Tip()
        .attr('class', 'map-tip')
        // if the mouse position is greater than 650 (~ Kentucky/Missouri), offset tooltip to the left instead of the right
        .offset(function() {
          if (currentPosition[0] > 650) {
            return [-20, -120]
          } else {
            return [20, 120]
          }
        })
        // input the title, and include the div
        .html("<p>COVID-19 cases over time in</p><div id='tipDiv'></div>")

      svg.call(tooltip)

      // setGeographies(usData.features)
      const statePathData = svg.selectAll('.state-path').data(usData.features)
      statePathData
        // Enter new data
        .enter()
        // Append a path for each state feature
        .append('path')
        // Add class for reference
        .attr('class', 'state-path')
        // Run data through pathGenerator
        .attr('d', pathGenerator)
        // Style
        .style('fill', '#384F56')
        .style('stroke', '#080B0C')
        .style('stroke-width', 2)

      const circleData = svg
        .selectAll('.circle')
        .data(data.data, d => d.statecode)
      circleData
        // Enter new data
        .enter()
        // Append a circle for each county data point
        .append('circle')
        // Add class for reference
        .attr('class', 'circle')
        // style

        //.style('fill', '#E91E')
        .style('fill', '#80ed99')
        .style('fill-opacity', 0.7)
        // Update x-position
        .attr('cx', d => projection([d.longitude, d.latitude])[0])
        // Update y-position
        .attr('cy', d => projection([d.longitude, d.latitude])[1])
        // Merge incoming new data
        .merge(circleData)
        // Transition the next update
        .transition()
        .duration(10)
        .ease(easeLinear)
      if (mode) {
        circleData.attr('r', d =>
          radiusScale.domain([0, 1, d.population / 10]).range([0, 2, 75])(
            d.positive
          )
        )
      } else {
        circleData.attr('r', d =>
          radiusScale.domain([0, 1, maxCases]).range([0, 2, 75])(d.positive)
        )
      }

      // Exit data points no longer in data and remove
      circleData.exit().remove()

      // Tooltip
      circleData
        .on('mouseover', function(d) {
          console.log(d)
          // define and store the mouse position. this is used to define tooltip offset, seen above.
          currentPosition = d3.mouse(this)

          // define current state
          let currentState = 'WA'

          // show the tooltip
          tooltip.show()

          var tipSVG = select('#tipDiv')
            .append('svg')
            .attr('width', 220)
            .attr('height', 55)

          tipSVG
            .append('text')
            .text('deaths')
            .attr('x', 140)
            .attr('y', 10)

          tipSVG
            .append('text')
            .text('per 100,000')
            .attr('x', 140)
            .attr('y', 24)

          tipSVG
            .append('text')
            .text(currentState)
            .attr('x', 0)
            .attr('y', 15)
            .style('font-size', 18)
            .style('font-weight', 400)
        })
        .on('mouseout', tooltip.hide)
    },
    [svgRef, data, mode]
  )

  return (
    <div>
      <div>
        <select
          onChange={() => {
            setMode(!mode)
          }}
        >
          <option value="maxcases"> new cases/max cases</option>
          <option value="pop"> new cases/state population</option>
        </select>
      </div>
      <svg
        id="mainMap"
        ref={svgRef}
        width={975}
        height={610}
        viewBox="0 0 975 610"
      />
    </div>
  )
}
