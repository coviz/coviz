import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchHungerData} from '../../../store/hunger'
import {initHungerChart, drawHungerChart} from '../../D3Charts/GroupedBarChart'

export const HungerChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.hunger.hungerData)
  const isLoading = useSelector(state => state.hunger.isLoading)

  useEffect(() => {
    dispatch(fetchHungerData())
  }, [])

  useEffect(() => {
    initHungerChart(1000, 1200)
  }, [])

  return (
    <div>
      <h2>Covid v. Hunger</h2>
      {isLoading ? drawHungerChart() : <div />}
      <div id="hungerChart" />
    </div>
  )
}
