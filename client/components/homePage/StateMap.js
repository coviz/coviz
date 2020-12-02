import React, {useState, useEffect} from 'react'
import {geoAlbersUsa, geoPath} from 'd3-geo'
import usData from './usData.json'
import {useSelector, useDispatch} from 'react-redux'
import {fetchSingleDateDataThunk} from '../../store/usDataByDate'

const projection = geoAlbersUsa()
  .scale(1300)
  .translate([975 / 2, 610 / 2])

export const StateMap = () => {
  const [geographies, setGeographies] = useState([])
  const capitals = useSelector(state => state.usDataByDate)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleDateDataThunk(20201123))
    setGeographies(usData.features)
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
        {capitals.map(state => (
          <circle
            key={state.statecode}
            cx={projection([state.longitude, state.latitude])[0]}
            cy={projection([state.longitude, state.latitude])[1]}
            r={state.positive / state.population * 300}
            fill="#E91E"
            className="marker"
          />
        ))}
      </g>
    </svg>
  )
}
