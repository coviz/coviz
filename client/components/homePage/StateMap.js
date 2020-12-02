import React, {useState, useEffect} from 'react'
import {geoAlbersUsa, geoPath} from 'd3-geo'
import usData from './usData.json'
// import states from './capitals.json'
import {useSelector, useDispatch} from 'react-redux'
import {fetchSingleDateDataThunk} from '../../store/usDataByDate'

const projection = geoAlbersUsa()
  .scale(1300)
  .translate([975 / 2, 610 / 2])

export const StateMap = () => {
  const [geographies, setGeographies] = useState([])
  // const [capitals, setCapitals] = useState([])

  // console.log('not inside useEffect usDataByDate', usDataByDate)
  const capitals = useSelector(state => state.usDataByDate)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleDateDataThunk(20201123))
    setGeographies(usData.features)
    // setCapitals(usDataByDate)
    // console.log('inside useEffect: usDataByDate', usDataByDate)
    // console.log('inside useEffect: capitals', capitals)
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
            r={state.population / 1000000}
            fill="#E91E"
            className="marker"
          />
        ))}
      </g>
    </svg>
  )
}
