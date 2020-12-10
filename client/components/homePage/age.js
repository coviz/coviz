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
    initAgeChart(1000, 1000)
  }, [])

  console.log('data: ', data)
  return (
    <div>
      <h2 style={{color: "white"}}>Covid v. Age Groups</h2>
      {isLoading ? drawAgeChart(650, 900, data) : <div />}
      <div style={{margin: 50, border: "2px solid red"}}id="ageChart" />
      <p>HELLLLLOOOOO</p>
    </div>
  )
}
