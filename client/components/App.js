import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StateMap} from './StateMap'
import {fetchAllDateDataThunk, fetchAllCurentThunk} from '../store/usDataByDate'
import useTimer from './Assets/useTimer'
import {group} from 'd3'
import Trend from './Trend'
import {Current} from './Current'
export const App = () => {
  const capitals = useSelector(state => state.usDataByDate.usDailyData)
  const currentData = useSelector(state => state.usDataByDate.currentData)
  const isLoading = useSelector(state => state.usDataByDate.isLoading)
  const dispatch = useDispatch()

  // create the timer
  const timer = useTimer({
    startTime: new Date('2020-02-28'),
    endTime: new Date('2020-12-12'),
    step: 1000 * 60 * 60 * 72,
    frequency: 3
  })

  const timerDate = timer.time.toLocaleDateString()

  const [data, setData] = useState([])
  const [current, setCurrent] = useState([])

  useEffect(() => {
    dispatch(fetchAllDateDataThunk())
    dispatch(fetchAllCurentThunk())
  }, [])

  useEffect(
    () => {
      // reformat date to match database model values
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

      if (!currentData.isLoading) {
        setCurrent(currentData.data)
      }
    },
    [timerDate, currentData.isLoading]
  )

  return (
    <div id="main">
      <div id="map">
        <div className="aboveTimeline">
          <div id="aboveTitle">
            <h4>Click Timeline to Jump to Specific Date</h4>
          </div>
          <div id="mapTimer">
            <div id="pip">
              <h3>Showing Data As Of:</h3>
            </div>
            <div id="pop">
              <h2 id="time">{timerDate}</h2>
            </div>
          </div>
        </div>
        <Trend {...timer} />
        <div id="test">
          <div>
            {timerDate === '12/11/2020' ||
            timerDate === '12/12/2020' ||
            timerDate === '12/13/2020' ? (
              <button
                type="button"
                className="play-button"
                onClick={timer.reset}
              >
                {' '}
                Reset{' '}
              </button>
            ) : !timer.isPlaying ? (
              <button
                type="button"
                className="play-button"
                onClick={timer.play}
              >
                Start
              </button>
            ) : (
              <button
                type="button"
                className="play-button"
                onClick={timer.stop}
              >
                Stop
              </button>
            )}
          </div>
        </div>
        <div>
          <div>
            {isLoading ? (
              <StateMap data={data} isPlaying={timer.isPlaying} />
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
      <div>{current.length > 0 ? <Current data={current} /> : <div />}</div>
    </div>
  )
}
