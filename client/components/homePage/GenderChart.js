import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchGenderData} from '../../store/gender'
import {initGenderChart, drawGenderChart} from '../chartd3/CircularBarplot'

export const GenderChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.genders.genderData)
  const isLoading = useSelector(state => state.genders.isLoading)

  useEffect(() => {
    dispatch(fetchGenderData())
  }, [])
  useEffect(() => {
    initGenderChart(960, 960)
  }, [])

  const test = data.map(elem => {
    //console.log(elem)
    if (elem.state) {
      elem.state = elem.state.slice(0, 2).toUpperCase()
      elem.total = +elem.females + +elem.males
      elem.females = +elem.females
      elem.males = +elem.males
    }
    return elem
  })
  console.log(test)
  return (
    <div>
      <h2>Covid v. Gender</h2>
      {isLoading ? drawGenderChart(test) : <div />}
      <div id="genderChart" />
    </div>
  )
}
