import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StateMap} from './StateMap'
import {fetchSingleDateDataThunk} from '../../store/usDataByDate'
import useTimer from './useTimer'

export const App = () => {
  const capitals = useSelector(state => state.usDataByDate.usDailyData)
  const isLoading = useSelector(state => state.usDataByDate.isLoading)
  const dispatch = useDispatch()

  // create the timer
  const timer = useTimer({
    startTime: new Date('2020-05-22'),
    endTime: new Date('2020-11-23'),
    step: 1000 * 60 * 60,
    frequency: 24
  })

  const timerDate = timer.time.toLocaleDateString()
  const [data, setData] = useState([])

  useEffect(
    () => {
      console.log(timerDate)
      dispatch(fetchSingleDateDataThunk(timerDate))
      console.log('capitals after thunk', capitals)
      if (isLoading) {
        setData(capitals)
      }
    },
    [timerDate]
  )

  console.log('capitals after setData', capitals)
  console.log('capitals after setData dataaaa', data)
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
