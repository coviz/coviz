import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUnemployment} from '../../../store/unemployment'
import {initUnempChart, drawUnempChart} from '../../D3Charts/UnempCirclePack'

export const UnemploymentChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.unemployment.unemploymentData)
  const isLoading = useSelector(state => state.unemployment.isLoading)

  useEffect(() => {
    dispatch(fetchUnemployment())
  }, [])
  useEffect(() => {
    initUnempChart(500, 600)
  }, [])
  console.log(data)

  return (
    <div>
      <h2>Covid v. Unemployment</h2>
      {isLoading ? drawUnempChart(500, 600, data) : <div />}
      <div id="unempChart" />
    </div>
  )
}
