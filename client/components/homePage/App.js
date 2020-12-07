import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StateMap} from './StateMap'
import {fetchAllDateDataThunk} from '../../store/usDataByDate'
import useTimer from './useTimer'
import {group} from 'd3'
import Trend from './Trend'

export const App = () => {
  const capitals = useSelector(state => state.usDataByDate.usDailyData)
  const isLoading = useSelector(state => state.usDataByDate.isLoading)
  const dispatch = useDispatch()
  const casesByDate = [
    {Date: '2020-03-12', Confirmed: 1668},
    {Date: '2020-03-13', Confirmed: 2224},
    {Date: '2020-03-14', Confirmed: 2898},
    {Date: '2020-03-15', Confirmed: 3600},
    {Date: '2020-03-16', Confirmed: 4507},
    {Date: '2020-03-17', Confirmed: 5905},
    {Date: '2020-03-18', Confirmed: 8345},
    {Date: '2020-03-19', Confirmed: 12413},
    {Date: '2020-03-20', Confirmed: 17996},
    {Date: '2020-03-21', Confirmed: 24532},
    {Date: '2020-03-22', Confirmed: 33061},
    {Date: '2020-03-23', Confirmed: 43499},
    {Date: '2020-03-24', Confirmed: 54168},
    {Date: '2020-03-25', Confirmed: 68775},
    {Date: '2020-03-26', Confirmed: 85615},
    {Date: '2020-03-27', Confirmed: 102913},
    {Date: '2020-03-28', Confirmed: 123618}
  ]
  // create the timer
  const timer = useTimer({
    startTime: new Date('2020-02-26'),
    endTime: new Date('2020-11-23'),
    step: 1000 * 60 * 60,
    frequency: 100
  })

  const timerDate = timer.time.toLocaleDateString()

  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(fetchAllDateDataThunk())
  }, [])

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
      <Trend
        data={casesByDate.map(row => ({...row, Date: new Date(row.Date)}))}
        {...timer}
      />
      <div>
        {!timer.isPlaying ? (
          <button type="button" className="play-button" onClick={timer.play}>
            Play
          </button>
        ) : (
          <button type="button" className="play-button" onClick={timer.stop}>
            Stop
          </button>
        )}
      </div>
      <div>{isLoading ? <StateMap data={data} /> : <div />}</div>
    </div>
  )
}
