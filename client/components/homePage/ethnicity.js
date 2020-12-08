import React, {useEffect, useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEthnicities} from '../../store/ethnicity'
import {initEthnChart, drawEthnChart} from '../chartd3/CirclePack'

export const EthnicityChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.ethnicities.usData)
  const isLoading = useSelector(state => state.ethnicities.isLoading)

  useEffect(() => {
    dispatch(fetchEthnicities())
  }, [])
  useEffect(() => {
    initEthnChart(600, 600)
  }, [])

  console.log(data)
  return (
    <div>
      <h2>Covid v. Ethnicity</h2>
      {isLoading ? drawEthnChart(600, 600, data) : <div />}
      <div id="ethnChart" />
    </div>
  )
}
