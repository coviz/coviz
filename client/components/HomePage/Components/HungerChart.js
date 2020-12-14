import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchHungerDataThunk} from '../../../store/hunger'
import {drawHungerChart} from '../../D3Charts/GroupedBarChart'

export const HungerChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.hunger.hungerData)
  const isLoading = useSelector(state => state.hunger.isLoading)

  useEffect(() => {
    dispatch(fetchHungerDataThunk())
  }, [])

  return (
    <div>
      <h2>Covid v. Hunger</h2>
      {isLoading ? drawHungerChart(data) : <div />}
      <div id="hungerChart" />
    </div>
  )
}
