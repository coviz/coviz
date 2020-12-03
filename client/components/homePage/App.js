import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StateMap} from './StateMap'
import {fetchSingleDateDataThunk} from '../../store/usDataByDate'

export const App = () => {
  const capitals = useSelector(state => state.usDataByDate.usDailyData)
  console.log('capitals', capitals)
  const isLoading = useSelector(state => state.usDataByDate.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleDateDataThunk(20201123))
  }, [])

  return <div>{isLoading ? <StateMap data={capitals} /> : <div />}</div>
}
