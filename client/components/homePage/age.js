import React, {useEffect, useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAges} from '../../store/age'
import {initAgeChart, drawAgeChart} from '../chartd3/Lollipop'

export const AgeChart = props => {
  const dispatch = useDispatch()
  
  const data = useSelector(state => state.ages.usData)
  const isLoading = useSelector(state => state.ages.isLoading)

  useEffect(() => {
    dispatch(fetchAges())
  }, [])
  useEffect(() => {
    initAgeChart(5000, 5000)
  }, [])

  console.log('data: ', data)
  return (
    <div>
      <h2>Covid vs. Age Groups</h2>
      {isLoading ? drawAgeChart(350, 300, data) : <div />}
      <div id="ageChart" />
    </div>
  )
}
