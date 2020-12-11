import React, {useRef, useEffect} from 'react'
import * as d3 from 'd3'
import us from '/Users/jinyoung/Downloads/counties-albers-10m.json'
import * as topojson from 'topojson-client'

export const BehindBarsMap = (realData, isLoading) => {
  // const data = [
  //   {
  //     id: '13213',
  //     position: [705.4725466699992, 382.2575283680614],
  //     title: 'Murray',
  //     value: 39358,
  //   },
  //   {
  //     id: '13215',
  //     position: [709.1944189937444, 434.3044422981688],
  //     title: 'Muscogee',
  //     value: 200303,
  //   },
  //   {
  //     id: '13217',
  //     position: [725.5090290153495, 408.26421139531874],
  //     title: 'Newton',
  //     value: 103901,
  //   },
  // ]
  const data = [
    {
      position: [705.4725466699992, 382.2575283680614],
      state: 'Alabama',
      value: 10
    }
  ]

  // console.log('inside behind bars map', realData, isLoading)
  const path = d3.geoPath()
  const length = d3.scaleLinear([0, d3.max(data, d => d.value)], [0, 200])
  // const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]))
  const format = d3.format(',.0f')
  const spike = (val, width = 7) => `M${-width / 2},0L0,${-val}L${width / 2},0`

  const svgRef = useRef()
  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg
      .append('path')
      .datum(topojson.feature(us, us.objects.nation))
      .attr('fill', '#e0e0e0')
      .attr('d', path)

    svg
      .append('path')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-linejoin', 'round')
      .attr('d', path)

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
      .data(
        data.filter(d => d.position).sort(
          (a, b) =>
            //just puting them in order??
            d3.ascending(a.position[1], b.position[1]) ||
            d3.ascending(a.position[0], b.position[0])
        )
      )
      .join('path')
      .attr('transform', d => `translate(${d.position})`)
      .attr('d', d => spike(length(d.value)))
      .append('title')
      .text(
        d => `${d.title}
    ${format(d.value)}`
      )
  }, [])
  return (
    <div>
      <h1>Spike Map</h1>
      <svg ref={svgRef} width={975} height={610} viewBox="0, 0, 975, 610" />
    </div>
  )
}
