import React, {useRef, useEffect, useState} from 'react'
import {geoAlbersUsa, geoPath, select, scaleSqrt, easeLinear, max} from 'd3'
import usData from '../Assets/usData.json'

export const StateMap = data => {
  const [mode, setMode] = useState('maxcases')

  const svgRef = useRef()
  const maxCases = max(data.data.map(d => d.positiveCumulative))
  const maxDeaths = max(data.data.map(d => d.deathCumulative))

  let radiusScale = scaleSqrt()

  useEffect(
    () => {
      const projection = geoAlbersUsa()
        .scale(1300)
        .translate([975 / 2, 610 / 2])

      const svg = select(svgRef.current)
      const pathGenerator = geoPath().projection(projection)

      // Create the tooltip
      var div = select('body')
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
        .style('fill', '#4CC9F0')
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
      if (mode === 'pop') {
        circleData.style('fill', '#F25F5C').style('fill-opacity', 0.7)
        circleData.attr('r', d =>
          radiusScale.domain([0, 1, d.population / 5]).range([0, 2, 75])(
            d.positiveCumulative
          )
        )
      } else if (mode === 'maxcases') {
        circleData.style('fill', '#0CF574').style('fill-opacity', 0.7)
        circleData.attr('r', d =>
          radiusScale.domain([0, 1, maxCases * 2]).range([0, 2, 75])(
            d.positiveCumulative
          )
        )
      } else if (mode === 'deaths') {
        circleData.style('fill', '#4CC9F0').style('fill-opacity', 0.7)
        circleData.attr(
          'r',
          d =>
            radiusScale.domain([0, 1, d.population / 180]).range([0, 2, 75])(
              d.deathCumulative
            )
          //.style('fill', '#E91E')
        )
      } else if (mode === 'maxdeaths') {
        circleData.style('fill', '#F7D9C4').style('fill-opacity', 0.7)
        circleData.attr('r', d =>
          radiusScale.domain([0, 1, maxDeaths * 2]).range([0, 2, 75])(
            d.deathCumulative
          )
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
                    toolData.positiveCumulative
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
          onChange={e => {
            setMode(e.target.value)
          }}
        >
          <option value="maxcases"> new cases/max cases</option>
          <option value="pop"> new cases/state population</option>
          <option value="deaths"> deaths/state population</option>
          <option value="maxdeaths"> deaths/max deaths</option>
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
