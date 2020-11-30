import React, {useState, useEffect} from 'react'
import {geoAlbersUsa, geoPath} from 'd3-geo'
import usData from './usData.json'
import states from './capitals.json'

const projection = geoAlbersUsa()
  .scale(1300)
  .translate([975 / 2, 610 / 2])
console.log(projection([-86.279118, 32.361538]))

export const USMap = () => {
  const [geographies, setGeographies] = useState([])
  const [capitals, setCapitals] = useState([])

  useEffect(() => {
    console.log(usData)

    setGeographies(usData.features)
    setCapitals(states.capitals)
  }, [])

  return (
    <svg width={975} height={610} viewBox="0 0 975 610">
      <g className="states">
        {geographies.map((d, i) => (
          <path
            key={`path-${i}`}
            d={geoPath().projection(projection)(d)}
            className="states"
            fill="rgba(38,50,56)"
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
      </g>
      <g className="markers">
        {capitals.map((state, index) => (
          <circle
            key={index}
            cx={projection([state.long, state.lat])[0]}
            cy={projection([state.long, state.lat])[1]}
            r={state.pop / 1000000}
            fill="#E91E"
            className="marker"
          />
        ))}
      </g>
    </svg>
  )
}
