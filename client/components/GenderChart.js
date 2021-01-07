import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchGenderData} from '../store/gender'
import {initGenderChart, drawGenderChart} from './D3Charts/CircularBarplot'

export const GenderChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.genders.genderData)
  const isLoading = useSelector(state => state.genders.isLoading)

  useEffect(() => {
    dispatch(fetchGenderData())
  }, [])
  useEffect(() => {
    initGenderChart(1000, 1200)
  }, [])

  const test = data.map(elem => {
    if (elem.state) {
      elem.state = elem.state.slice(0, 2).toUpperCase()
      elem.total = +elem.females + +elem.males
      elem.females = +elem.females
      elem.males = +elem.males
    }
    return elem
  })

  return (
    <div>
      <h2 id="genderTitle">Covid v. Gender</h2>
      <div id="genderChartPage">
        <h1 className="genderFact">
          {' '}
          Men are more likely to die from COVID-19,
          <br /> which scientists currently hypothesize to be related to immune
          system response. <sup className="smallsup">4</sup>
        </h1>
        {isLoading ? drawGenderChart(test) : <div />}
        <div id="genderChartCont">
          <div id="genderChart" />
        </div>
      </div>
    </div>
  )
}
