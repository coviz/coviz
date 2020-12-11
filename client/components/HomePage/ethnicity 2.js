import React, {useEffect, useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEthnicities} from '../../store/ethnicity'
import {drawChart, initChart} from '../chartd3/BasicD3'

export const EthnicityChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.ethnicities.usData)
  const isLoading = useSelector(state => state.ethnicities.isLoading)

  useEffect(() => {
    dispatch(fetchEthnicities())
  }, [])
  useEffect(() => {
    initChart(400, 600)
  }, [])

  console.log(data)
  return (
    <div>
      <h2>Covid vs Race & Ethnicity</h2>
      {isLoading ? drawChart(400, 600, data) : <div />}
      <div id="chart" />
    </div>
  )
}
