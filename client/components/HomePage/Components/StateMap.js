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

      // Create the tooltip
      var div = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

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
      if (!data.isPlaying) {
        circleData
          // .data(data.data, d => d.statecode)
          .on('mouseover', function(d) {
            const toolData = d.srcElement.__data__
            // change the date format form yyyymmdd to mm/dd/yyyy
            const dateString = toolData.date.toString()
            const year = dateString.substring(0, 4)
            const month = dateString.substring(4, 6)
            const day = dateString.substring(6, 8)
            const date = new Date(year, month - 1, day)
            const newDateString = date.toLocaleDateString()

            // add commas to numerical values for display
            function numberWithCommas(x) {
              return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }

            div
              .transition()
              .duration(200)
              .style('opacity', 0.9)
            div
              .html(
                '<b><u>' +
                  ` ${toolData.state}` +
                  '</u></b>' +
                  '<br>' +
                  `${numberWithCommas(
                    toolData.positive
                  )} cases on ${newDateString}`
              )
              .style('left', d.pageX + 'px')
              .style('top', d.pageY - 28 + 'px')
          })

          // fade out tooltip on mouse out
          .on('mouseout', function(d) {
            div
              .transition()
              .duration(500)
              .style('opacity', 0)
          })
      }
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
