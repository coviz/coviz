import React, {useRef, useEffect, useState} from 'react'
import {geoAlbersUsa, geoPath, select, scaleSqrt, easeLinear, max} from 'd3'
import usData from './usData.json'

export const StateMap = data => {
  // console.log('DATA BEFORE USEEFFECT', data)
  // const [geographies, setGeographies] = useState([])
  // const [currentValue, setCurrentValue] = useState('maxcases')
  const svgRef = useRef()
  // const maxCases = max(data.data.map((d) => d.positive))
  // let denominator = maxCases
  let radiusScale = scaleSqrt()

  // const myFunc = (event) => {
  //   console.log('inside myfunc,', event.target.value)
  //   denominator = event.target.value === 'pop' ? data.data.population : maxCases
  //   console.log('data.data.population', data.data.population)
  // }
  useEffect(
    () => {
      const projection = geoAlbersUsa()
        .scale(1300)
        .translate([975 / 2, 610 / 2])

      const svg = select(svgRef.current)
      const pathGenerator = geoPath().projection(projection)

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
        .style('fill', 'rgba(38,50,56)')
        .style('stroke', '#011627')
        .style('stroke-width', 2)
      // console.log('DENOMINATOR', denominator)

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
        .style('fill', '#E91E')
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
        // Update the radius to the new cases value
        .attr('r', d =>
          radiusScale.domain([0, 1, d.population / 10]).range([0, 2, 75])(
            d.positive
          )
        )
      // Exit data points no longer in data and remove
      circleData.exit().remove()
    },
    [svgRef, data]
  )

  return (
    <div>
      <div>
        <select
          onChange={() => {
            myFunc(event)
          }}
        >
          <option value="maxcases">max cases</option>
          <option value="pop">pop</option>
        </select>
      </div>
      <svg ref={svgRef} width={975} height={610} viewBox="0 0 975 610" />
    </div>
  )
}
