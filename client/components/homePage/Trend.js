import React, {useEffect, useRef} from 'react'
import {scaleTime, axisBottom, select} from 'd3'

export default ({time, startTime, endTime, updateTime}) => {
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
      <g transform="translate(5, 5)" />
      <g ref={xAxisRef} transform="translate(5, 5)" />
    </svg>
  )
}
