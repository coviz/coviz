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

import usData from './HomePage/Assets/usData.json'

export const Temp = realData => {
  // const data = [
  //   {
  //     id: 1,
  //     long: -87.33312321,
  //     lat: 31.99483708,
  //     state: 'Alabama',
  //     confirmedResidents: 10,
  //   },
  //   {
  //     id: 2,
  //     long: -117.8588801,
  //     lat: 35.1532512,
  //     state: 'California',
  //     confirmedResidents: 2,
  //   },
  // ]
  const data = realData.realData
  console.log('realData.realData', data)
  // console.log('LOOK HERE', data[0].long, typeof data[0].long)
  const svgRef = useRef()
  const length = d3.scaleLinear(
    [0, d3.max(data, d => d.confirmedResidents)],
    [0, 200]
  )
  // const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]))
  const format = d3.format(',.0f')
  const spike = (val, width = 7) => `M${-width / 2},0L0,${-val}L${width / 2},0`

  useEffect(
    () => {
      console.log('data inside useEffect', data)
      let projection = geoAlbersUsa()
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

      svg
        .append('g')
        .attr('fill', 'red')
        .attr('fill-opacity', 0.3)
        .attr('stroke', 'red')
        .selectAll('path')
        .data(data, d => d.id)
        .join('path')
        .attr('transform', d => `translate(${projection([d.long, d.lat])})`)
        .attr('d', d => spike(length(d.confirmedResidents)))
    },
    [svgRef, data]
  )

  return (
    <div>
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
