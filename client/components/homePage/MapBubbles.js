import React, {useRef} from 'react'
import {geoAlbersUsa, easeLinear, select, scaleSqrt, max} from 'd3'

export const makeBubbles = data => {
  const maxCases = max(data.map(d => d.positive))

  const radiusScale = scaleSqrt()
    .domain([0, 1, maxCases])
    .range([0, 2, 75])
  const projection = geoAlbersUsa()
    .scale(1300)
    .translate([975 / 2, 610 / 2])
  const svgRef = useRef()
  const svg = select(svgRef.current)
  const circleData = svg.selectAll('.circle').data(data, d => d.statecode)
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
    .duration(1000)
    .ease(easeLinear)
    // Update the radius to the new cases value
    .attr('r', d => radiusScale(d.positive))
  // Exit data points no longer in data and remove
  circleData.exit().remove()
}
