import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUnemployment} from '../../../store/unemployment'
import {initUnempChart, drawUnempChart} from '../../D3Charts/UnempCirclePack'
import {drawGenderUnempChart} from '../../D3Charts/BarPlot'

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

  console.log('this is data from redux', data)

  return (
    <div>
      <h2>Covid v. Unemployment</h2>
      {isLoading ? drawUnempChart(500, 600, data) : <div />}

      <div>
        <h4>Unemployment Chart Covid v. Great Recession</h4>
        <div id="unempChart" />
      </div>
      <div>
        <h4>Unemployment by Gender</h4>
        {isLoading ? drawGenderUnempChart(data, 'men') : <div />}
        {/* <button onClick="update('men')">Men Unemployment</button>
        <button onClick="update('women')">Women Unemployment</button> */}
        <div id="genderUnempChart" />
      </div>
    </div>
  )
}
