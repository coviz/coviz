import React, {useRef, useEffect} from 'react'
import {geoAlbersUsa, geoPath, select, scaleSqrt, easeLinear, max} from 'd3'
import usData from './usData.json'

export const StateMap = data => {
  // const [geographies, setGeographies] = useState([])

  const svgRef = useRef()

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
        .style('stroke', '#fff')
        .style('stroke-width', 2)
      const maxCases = max(data.data.map(d => d.positive))

      const radiusScale = scaleSqrt()
        .domain([0, 1, maxCases])
        .range([0, 2, 75])

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
        .style('fill', '#E6532E')
        .style('fill-opacity', 0.3)
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
        .attr('r', d => radiusScale(d.positive))
      // Exit data points no longer in data and remove
      circleData.exit().remove()
    },
    [svgRef, data]
  )

  return (
    <div>
      <svg ref={svgRef} width={975} height={610} viewBox="0 0 975 610" />
    </div>
  )
}
