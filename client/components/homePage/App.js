import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StateMap} from './StateMap'
import {fetchAllDateDataThunk} from '../../store/usDataByDate'
import useTimer from './useTimer'
import {group} from 'd3'

export const App = () => {
  const capitals = useSelector(state => state.usDataByDate.usDailyData)
  const isLoading = useSelector(state => state.usDataByDate.isLoading)
  const dispatch = useDispatch()

  // create the timer
  const timer = useTimer({
    startTime: new Date('2020-03-01'),
    endTime: new Date('2020-11-23'),
    step: 1000 * 60 * 60,
    frequency: 100
  })

  const timerDate = timer.time.toLocaleDateString()

  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(fetchAllDateDataThunk())
  }, [])

  // can we add a bit of documentation here to clarify what is going on with this useEffect? Specifically with the temp arrays.
  useEffect(
    () => {
      const array = timerDate.split('/')
      const year = array.pop()
      array.unshift(year)
      if (array[1].length <= 1) {
        let temp = array[1]
        array[1] = `0${temp}`
      }
      if (array[2].length <= 1) {
        let temp = array[2]
        array[2] = `0${temp}`
      }
      const newDate = array.join('')
      // console.log(timerDate)
      // console.log('capitals after thunk', capitals)
      if (isLoading) {
        // setData(capitals)
        const nestedDailyState = Array.from(
          group(capitals, d => d.date),
          ([key, value]) => ({key, value})
        )
        const searchedDate = nestedDailyState.filter(elem => {
          return elem.key === +newDate
        })
        setData(searchedDate[0].value)
      }
    },
    [timerDate]
  )

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
