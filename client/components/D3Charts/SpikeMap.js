import React, {useRef, useEffect} from 'react'
import {geoAlbersUsa, geoPath, select} from 'd3'
import * as d3 from 'd3'

import usData from '../HomePage/Assets/usData.json'

export const SpikeMap = realData => {
  const data = realData.realData

  const svgRef = useRef()
  const length = d3.scaleLinear(
    [0, d3.max(data, d => d.confirmedResidents)],
    [0, 200]
  )

  const format = d3.format(',.0f')
  const spike = (val, width = 7) => `M${-width / 2},0L0,${-val}L${width / 2},0`

  useEffect(
    () => {
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
      <div>
        <p>
          * This map is not a complete representation of all cases in U.S. jails
          and prisions, due to missing data from certain states and counties.
        </p>
        <div className="factsCont">
          <div className="prisonfacts">
            <h4>
              <u>Unemployment Insights:</u>
            </h4>
            <li>
              Jails and prisons have been severely affected by the COVID-19
              pandemic. In the USA, more than 40 of the 50 largest clustered
              outbreaks in the country have occurred in jails and prisons.
              <sup>1</sup>
            </li>
            <li>
              Compared with the general population, the number of COVID-19 cases
              is 5·5 times higher among people who are incarcerated.<sup>2</sup>
            </li>
            <li>
              Transmission risks in prisons and jails are further exacerbated by
              confined conditions, overcrowding, high occupant turnover, and a
              scarcity of resources for infection control.<sup>3</sup>
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}
