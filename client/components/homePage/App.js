import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StateMap} from './StateMap'
import {fetchAllDateDataThunk} from '../../store/usDataByDate'
import useTimer from './useTimer'
import {nest} from 'd3'


export const App = () => {
  const capitals = useSelector(state => state.usDataByDate.usDailyData)
  const isLoading = useSelector(state => state.usDataByDate.isLoading)
  const dispatch = useDispatch()

  // create the timer
  const timer = useTimer({
    startTime: new Date('2020-03-01'),
    endTime: new Date('2020-11-23'),
    step: 1000 * 60 * 60,
    frequency: 77
  })

  const timerDate = timer.time.toLocaleDateString()
  const [data, setData] = useState([])

  const nestedDailyState = nest()
    .key(d => d.date)
    .entries(capitals)
    .reduce(
      (acc, row) => ({
        ...acc,
        [new Date(row.key).toLocaleDateString()]: row.values.map(value => {
          const { Date, ...valueRemainder } = value
          console.log('valueRemainderrrrrrrrr', valueRemainder)
          return valueRemainder
        }),
      }),
      {}
  )

  useEffect(
    () => {
      // console.log(timerDate)
      dispatch(fetchAllDateDataThunk())
      // console.log('capitals after thunk', capitals)
      if (isLoading) {
        // setData(capitals)
        setData(nestedDailyState[timerDate])
      }
    },
    [timerDate]
  )

  // console.log('capitals after setData', capitals)
  console.log('dataaaa after setData', data)
  return (
    <div>
      <h1>{timerDate}</h1>
      <div>
        {!timer.isPlaying ? (
          <button onClick={timer.play}>Play</button>
        ) : (
          <button onClick={timer.stop}>Stop</button>
        )}
      </div>
      <div>{isLoading ? <StateMap data={data} /> : <div />}</div>
    </div>
  )
}
