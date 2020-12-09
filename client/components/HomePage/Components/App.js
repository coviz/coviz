import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StateMap} from './StateMap'
import {fetchAllDateDataThunk} from '../../../store/usDataByDate'
import useTimer from '../../HomePage/Assets/useTimer'
import {group} from 'd3'
import Trend from './Trend'

export const App = () => {
  const capitals = useSelector(state => state.usDataByDate.usDailyData)
  const isLoading = useSelector(state => state.usDataByDate.isLoading)
  const dispatch = useDispatch()

  // create the timer
  const timer = useTimer({
    startTime: new Date('2020-02-26'),
    endTime: new Date('2020-11-23'),
    step: 1000 * 60 * 60,
    frequency: 100
  })

  const timerDate = timer.time.toLocaleDateString()

  const [data, setData] = useState([])
  const resetFunc = () => {
    timer.updateTime(new Date('2020-02-26'))
  }
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

      if (isLoading) {
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
      <h2>{timerDate}</h2>
      <Trend {...timer} />
      <div>
        {timerDate === '11/22/2020' ? (
          <button type="button" className="play-button" onClick={timer.reset}>
            {' '}
            Reset{' '}
          </button>
        ) : !timer.isPlaying ? (
          <button type="button" className="play-button" onClick={timer.play}>
            Play
          </button>
        ) : (
          <button type="button" className="play-button" onClick={timer.stop}>
            Stop
          </button>
        )}
      </div>
      <div>
        <button
          type="button"
          className="play-button"
          onClick={() => {
            resetFunc()
          }}
        >
          Restart
        </button>
      </div>
      <div>
        {isLoading ? (
          <StateMap data={data} isPlaying={timer.isPlaying} />
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
