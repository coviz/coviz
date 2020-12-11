import React, {useEffect, useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAges} from '../../../store/age'
import {initAgeChart, drawAgeChart} from '../../D3Charts/Lollipop'

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

  console.log('age data: ', data)
  return (
    <div>
      <h1 style={{color: 'white'}}>Covid v. Age Groups</h1>
      {isLoading ? drawAgeChart(650, 600, data) : <div />}
      <div className="chartNinfo">
        <div style={{margin: 50}} id="ageChart" />
        <div>
          <b>The Effect of COVID-19 on Different Age Groups</b>
          <br />
          <ul className="ageFacts">
            <li>
              As clearly as it is displayed in the visual, the risk of dying
              from Coronavirus increases greatly with age.
            </li>
            <li>
              "COVID-19 is not just hazardous for elderly people, it is
              extremely dangerous for people in their mid-fifties, sixties and
              seventies"
            </li>
            <li>
              The death totals for the 85 and older age group are almost double
              for that of the 50 through 64 year age group.
            </li>
            <li>
              "Children, under the age of 18, to date, account for less than one
              percent of reported COVID-19 deaths"
            </li>
            <li>
              "The risk of dying from coronavirus is also linked to underlying
              health conditions, the capacity of health-care systems, and
              whether the virus has spread among people living in elderly-care
              facilities."
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
