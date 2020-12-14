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
        .attr('class', 'tooltipjails')
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

      const legend = svg
        .append('g')
        .attr('fill', '#777')
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .selectAll('g')
        .data(
          length
            .ticks(4)
            .slice(1)
            .reverse()
        )
        .join('g')
        .attr('transform', (d, i) => `translate(${975 - (i + 1) * 18},590)`)

      legend
        .append('path')
        .attr('fill', 'red')
        .attr('fill-opacity', 0.3)
        .attr('stroke', 'red')
        .attr('d', d => spike(length(d)))

      legend
        .append('text')
        .attr('dy', '1.3em')
        .text(length.tickFormat(4, 's'))

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
        .on('mouseover', function(d) {
          const toolData = d.srcElement.__data__
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
                `facility name: ${toolData.name}` +
                '<br>' +
                `total resident cases: ${toolData.confirmedResidents}`
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
    },
    [svgRef, data]
  )

  return (
    <div className="mapdiv">
      <h1 className="jailFact">
        On average, the COVID-19 mortality rate within prisons is twice as large
        as that of the general population, after adjusting for sex, age, and
        race/ethnicity of those incarcerated.
      </h1>
      <div className="closure">
        <svg
          id="jailMainMap"
          ref={svgRef}
          width={975}
          height={610}
          viewBox="0 0 975 610"
        />
      </div>
      <div className="closure">
        <p>
          * This map is not a complete representation of all cases in U.S. jails
          and prisions, due to missing data from certain states and counties.
        </p>

        {/* <li>
              In the USA, more than 40 of the 50 largest clustered
              outbreaks in the country have occurred in jails and prisons.

            </li>
            <li>
              Compared with the general population, the number of COVID-19 cases is 5·5 times higher among people who are incarcerated.
            </li>
            <li>
              Transmission risks in prisons and jails are further exacerbated by
              confined conditions, overcrowding, high occupant turnover, and a
              scarcity of resources for infection control.
            </li> */}
      </div>
      <h1 className="jailFact">
        Incarcerated individuals are four times more likely to become infected
        than people in the general population.
      </h1>
    </div>
  )
}
